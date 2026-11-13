/* =====================================================================
   ADMIN-CONEXION.JS — mantiene el panel conectado a Firebase.
   ---------------------------------------------------------------------
   El panel instalado como app se queda abierto en segundo plano durante
   horas. En ese rato el canal en tiempo real de Firestore se "duerme":
   lo que haces se guarda en el celular pero no sale a la web, y lo que
   cambia en la compu no llega a la app. Aquí se arregla así:

   • Reconexión inmediata al volver a la app (si estuvo oculta más de
     unos segundos) y al recuperar internet.
   • Un indicador "En línea / Sin conexión" para saber si lo que haces
     ya está saliendo. Tocarlo reintenta la conexión cuando está caída.
   • Botón "Actualizar" (solo en celular): la app no tiene la barra del
     navegador para recargar, y así se trae la versión más nueva.

   No se reconecta con cada toque ni cada X minutos a propósito: cortar
   la red en medio de un sello o un canje haría fallar esa operación.
   ===================================================================== */

import { db, COLECCION_CONFIG } from './firebase-config.js';
import {
    doc, onSnapshot, enableNetwork, disableNetwork
} from 'https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js';

const chip = document.getElementById('estadoConexion');
const btnActualizar = document.getElementById('btnActualizar');
const OCULTA_MIN_MS = 15000;   // menos que esto (un vistazo a WhatsApp) no vale la pena reconectar

const PULSO_MAX_MS = 8000;      // cuánto se espera la respuesta del servidor tras reconectar

let servidorOk = false;        // ¿el último dato llegó del servidor y no del caché?
let pulsoRoto = false;         // el "pulso" falló por otra razón (p. ej. reglas): no se puede afirmar nada
let ocupada = false;           // cortando y reabriendo la red
let esperando = 0;             // temporizador: red reabierta, falta que el servidor conteste
let ocultaDesde = 0;
let otraVez = false;           // llegó otra señal mientras se reconectaba: se repite al terminar
const pausa = ms => new Promise(r => setTimeout(r, ms));

/* Sellos y canjes son transacciones (JS/admin-tarjeta.js lleva la cuenta en
   window.hornillaOperaciones). Cortar la red a media transacción la haría
   fallar, así que se espera a que terminen (máximo 20 s). Devuelve false si
   pasado ese tiempo sigue habiendo una en curso: entonces NO se toca la red. */
async function esperarOperaciones() {
    for (let i = 0; i < 40 && (window.hornillaOperaciones || 0) > 0; i++) await pausa(500);
    return !((window.hornillaOperaciones || 0) > 0);
}

/* Reabre la red con varios intentos. Devuelve si quedó abierta. */
async function abrirRed() {
    for (let i = 0; i < 5; i++) {
        try { await enableNetwork(db); return true; }
        catch (err) { console.warn('[admin] No se pudo reabrir la red, reintento:', err); await pausa(1000); }
    }
    return false;
}

const enLinea = () => servidorOk && navigator.onLine;

function pintar() {
    if (!chip) return;
    /* Si el pulso no sirve y el dispositivo dice tener internet, mejor no mostrar nada que mentir */
    if (pulsoRoto && navigator.onLine && !ocupada) { chip.classList.add('hidden'); return; }
    const ok = enLinea();
    const conectando = ocupada || (!!esperando && !ok);
    chip.classList.remove('hidden');
    chip.classList.toggle('ok', ok && !conectando);
    chip.classList.toggle('mal', !ok && !conectando);
    chip.textContent = conectando ? 'Conectando…' : ok ? 'En línea' : 'Sin conexión';
    chip.setAttribute('aria-label', 'Estado de conexión con Firebase: ' + chip.textContent);
    /* "En línea" = la última respuesta vino del servidor. Si el canal se cae, Firestore
       avisa solo (fromCache) a los pocos segundos; no es una medición al milisegundo. */
    chip.title = ok
        ? 'Conectado con Firebase (según la última respuesta del servidor).'
        : 'Lo que hagas se guarda en este dispositivo y se envía solo al volver la conexión. Toca para reintentar.';
}

async function reconectar() {
    if (ocupada) { otraVez = true; return; }
    ocupada = true;
    /* Desde aquí ninguna transacción nueva arranca hasta que la red esté reabierta
       (JS/admin-tarjeta.js espera esta promesa antes de empezar un sello o canje). */
    let liberar;
    window.hornillaReconexion = new Promise(r => { liberar = r; });
    clearTimeout(esperando); esperando = 0;
    pintar();
    try {
        /* Hay un sello o canje que no termina: se deja la red como está y se reintenta luego */
        if (!await esperarOperaciones()) { otraVez = true; return; }
        try { await disableNetwork(db); }
        catch (err) { console.warn('[admin] No se pudo cortar la red para reconectar:', err); }
        /* Pase lo que pase arriba, la red SIEMPRE se vuelve a abrir (hasta 5 intentos).
           Si aun así no abre, se avisa y se reintenta sola más abajo. */
        if (!await abrirRed()) { servidorOk = false; otraVez = true; }
        /* La red ya está abierta, pero falta que el servidor conteste: se avisa con el pulso */
        esperando = setTimeout(() => {
            esperando = 0;
            pintar();
            /* Si mientras tanto llegó otra señal y el servidor sigue sin contestar, un intento más */
            if (otraVez) { otraVez = false; if (!enLinea() && navigator.onLine) reconectar(); }
        }, PULSO_MAX_MS);
    } finally {
        ocupada = false;
        window.hornillaReconexion = null;
        liberar();
        pintar();
        /* Reconexión cancelada o red sin abrir: se vuelve a intentar en unos segundos */
        if (otraVez && !esperando) setTimeout(() => { if (otraVez) { otraVez = false; if (!enLinea() || !navigator.onLine) reconectar(); } }, PULSO_MAX_MS);
    }
}

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') { ocultaDesde = Date.now(); return; }
    if (ocultaDesde && Date.now() - ocultaDesde >= OCULTA_MIN_MS) reconectar();
    ocultaDesde = 0;
});
window.addEventListener('pageshow', e => { if (e.persisted) reconectar(); });
window.addEventListener('online', reconectar);
window.addEventListener('offline', pintar);

/* config/fidelidad lo puede leer cualquiera, así que sirve de "pulso": si el
   dato viene del caché es que no hay canal con el servidor. */
function escucharPulso() {
    onSnapshot(doc(db, COLECCION_CONFIG, 'fidelidad'), { includeMetadataChanges: true },
        snap => {
            pulsoRoto = false;
            servidorOk = !snap.metadata.fromCache;
            if (servidorOk) { clearTimeout(esperando); esperando = 0; otraVez = false; }
            pintar();
        },
        err => {
            /* Firestore cierra el listener cuando da error: se vuelve a abrir en 30 s */
            console.warn('[admin] Pulso de conexión:', err);
            pulsoRoto = true; servidorOk = false; pintar();
            setTimeout(escucharPulso, 30000);
        });
}
escucharPulso();

/* Tocar el indicador reintenta SOLO si está sin conexión: estando en línea no
   se corta la red, porque interrumpiría un sello o un canje en curso. */
chip?.addEventListener('click', () => { if (!ocupada && !esperando && !enLinea()) reconectar(); });

/* Recargar: en la app instalada no hay barra del navegador */
const esCelular = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
const esApp = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
if (btnActualizar && (esCelular || esApp)) {
    btnActualizar.classList.remove('hidden');
    btnActualizar.addEventListener('click', () => location.reload());
}
