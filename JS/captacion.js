/* =====================================================================
   CAPTACION.JS — Opiniones reales + Club La Hornilla (index.html)
   ---------------------------------------------------------------------
   OPINIONES
   • Cualquier persona puede enviar una reseña; llega como 'pendiente'.
   • En la web solo se muestran las 'aprobada' (se aprueban en el admin,
     pestaña "Clientes"). Regla de oro: se aprueban TODAS las reseñas
     reales, aunque sean negativas — solo se rechaza spam, insultos o
     datos personales de otros. Nada de reseñas inventadas.
   • GOOGLE_RESENAS_URL: pega aquí el enlace "Pedir reseñas" de tu Perfil
     de Empresa en Google para mostrar el botón "Reseñar en Google".

   CLUB
   • Guarda nombre + WhatsApp solo con el consentimiento marcado.
   • El cupón de bienvenida se configura en el admin (config/club). Si
     no hay cupón activo, el club igual funciona (avisos y promos).
   • Al terminar, la persona nos escribe por WhatsApp: así el primer
     mensaje lo inicia ella (buena práctica en WhatsApp Business).
   ===================================================================== */

import { db, COLECCION_RESENAS, COLECCION_CLUB, COLECCION_CONFIG } from './firebase-config.js';
import {
    collection, doc, getDocs, getDoc, setDoc, addDoc, query, where, serverTimestamp
} from 'https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js';

const GOOGLE_RESENAS_URL = '';   // ej. 'https://g.page/r/XXXXXXXX/review'
const WHATSAPP_NUM = '50370991660';
const POR_PAGINA = 6;

const $ = id => document.getElementById(id);
const track = (n, p) => { try { window.hornillaTrack?.(n, p); } catch { /* sin medición */ } };
function esc(s = '') { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
function leerLS(k) { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch { return null; } }
function guardarLS(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* modo privado */ } }

function estrellasHTML(n) {
    const v = Math.max(0, Math.min(5, Math.round(n)));
    return `<span class="estrellas" role="img" aria-label="${v} de 5 estrellas">${'★'.repeat(v)}<span class="off">${'★'.repeat(5 - v)}</span></span>`;
}
function fechaCorta(ts) {
    const d = ts?.toDate ? ts.toDate() : null;
    return d ? d.toLocaleDateString('es-SV', { month: 'long', year: 'numeric' }) : '';
}

/* ======================= OPINIONES ======================= */
let resenas = [];
let mostradas = 0;

function tarjetaResena(r) {
    return `
        <article class="resena">
            <div class="resena-top">
                <span class="resena-nombre">${esc(r.nombre)}</span>
                <span class="resena-fecha">${esc(fechaCorta(r.creado))}</span>
            </div>
            ${estrellasHTML(r.estrellas)}
            <p class="resena-texto">${esc(r.comentario)}</p>
            ${r.respuesta ? `<div class="resena-respuesta"><b>Respuesta de La Hornilla</b>${esc(r.respuesta)}</div>` : ''}
        </article>`;
}

function pintarResenas() {
    const lista = $('resenasLista');
    if (!resenas.length) {
        lista.innerHTML = `
            <div class="resenas-vacio">
                <strong>Todavía no hay opiniones publicadas</strong>
                ¿Ya nos visitaste? Sé de los primeros en contarnos cómo te fue.
            </div>`;
        $('btnMasResenas').classList.add('hidden');
        return;
    }
    mostradas = Math.min(resenas.length, Math.max(mostradas, POR_PAGINA));
    lista.innerHTML = resenas.slice(0, mostradas).map(tarjetaResena).join('');
    $('btnMasResenas').classList.toggle('hidden', mostradas >= resenas.length);

    /* Promedio real, calculado de las reseñas publicadas (no se inventa) */
    const prom = resenas.reduce((s, r) => s + (Number(r.estrellas) || 0), 0) / resenas.length;
    const res = $('resenasResumen');
    res.innerHTML = `<strong>${prom.toFixed(1)}</strong>${estrellasHTML(prom)}<span>${resenas.length} ${resenas.length === 1 ? 'opinión' : 'opiniones'}</span>`;
    res.classList.remove('hidden');
}

async function cargarResenas() {
    try {
        /* El where() es obligatorio: las reglas de Firestore solo dejan
           leer reseñas aprobadas. Se ordena aquí para no requerir índice. */
        const snap = await getDocs(query(collection(db, COLECCION_RESENAS), where('estado', '==', 'aprobada')));
        resenas = snap.docs.map(d => ({ id: d.id, ...d.data() }))
            .sort((a, b) => (b.creado?.toMillis?.() || 0) - (a.creado?.toMillis?.() || 0));
    } catch (err) {
        console.warn('[captacion] No se pudieron leer las reseñas:', err);
        resenas = [];
    }
    pintarResenas();
}

function iniciarFormResena() {
    const form = $('formResena');
    const btnAbrir = $('btnAbrirResena');
    const msg = $('resMsg');
    const labels = [...form.querySelectorAll('.estrellas-fila label')];
    const radios = [...form.querySelectorAll('input[name="estrellas"]')];

    btnAbrir.addEventListener('click', () => {
        const abrir = form.classList.contains('hidden');
        form.classList.toggle('hidden', !abrir);
        btnAbrir.setAttribute('aria-expanded', String(abrir));
        if (abrir) radios[0].focus();
    });

    if (GOOGLE_RESENAS_URL) {
        const g = $('btnResenaGoogle');
        g.href = GOOGLE_RESENAS_URL;
        g.classList.remove('hidden');
    }

    /* Pinta las estrellas hasta la elegida (o la que está bajo el cursor) */
    const pintar = n => labels.forEach((l, i) => l.classList.toggle('on', i < n));
    const elegida = () => Number(radios.find(r => r.checked)?.value || 0);
    radios.forEach(r => r.addEventListener('change', () => pintar(elegida())));
    labels.forEach((l, i) => {
        l.addEventListener('mouseenter', () => pintar(i + 1));
        l.addEventListener('mouseleave', () => pintar(elegida()));
    });

    const comentario = $('resComentario');
    comentario.addEventListener('input', () => { $('resContador').textContent = `${comentario.value.length} / 500`; });

    form.addEventListener('submit', async e => {
        e.preventDefault();
        msg.className = 'cap-msg';
        const nombre = $('resNombre').value.trim();
        const texto = comentario.value.trim();
        const estrellas = elegida();
        const acepto = $('resAcepto').checked;
        [$('resNombre'), comentario].forEach(el => el.removeAttribute('aria-invalid'));

        if ($('resWeb').value) return;   // bot
        let error = '';
        if (!estrellas) error = 'Elige de 1 a 5 estrellas.';
        else if (nombre.length < 2) { error = 'Escribe tu nombre o un apodo.'; $('resNombre').setAttribute('aria-invalid', 'true'); }
        else if (texto.length < 10) { error = 'Cuéntanos un poco más (mínimo 10 letras).'; comentario.setAttribute('aria-invalid', 'true'); }
        else if (!acepto) error = 'Necesitamos tu permiso para publicar la reseña.';
        const previa = leerLS('hornilla_resena');
        if (!error && previa && Date.now() - previa < 24 * 3600 * 1000) error = 'Ya recibimos una reseña tuya hoy. ¡Gracias!';
        if (error) { msg.textContent = error; msg.classList.add('error'); return; }

        const btn = $('btnEnviarResena');
        btn.disabled = true;
        msg.textContent = 'Enviando…';
        try {
            await addDoc(collection(db, COLECCION_RESENAS), {
                nombre, estrellas, comentario: texto,
                estado: 'pendiente', aceptoPublicar: true, creado: serverTimestamp()
            });
            guardarLS('hornilla_resena', Date.now());
            form.reset(); pintar(0); $('resContador').textContent = '0 / 500';
            msg.textContent = '¡Gracias! Tu reseña se publicará después de una revisión rápida.';
            msg.classList.add('ok');
            track('resena_enviada', { estrellas });
        } catch (err) {
            console.error(err);
            msg.textContent = 'No se pudo enviar. Revisa tu conexión e intenta de nuevo.';
            msg.classList.add('error');
        } finally {
            btn.disabled = false;
        }
    });

    $('btnMasResenas').addEventListener('click', () => {
        mostradas += POR_PAGINA;
        pintarResenas();
    });
}

/* ========================= CLUB ========================= */
let cupon = null;   // { codigo, beneficio, condiciones } si está activo
let mostrarExitoDiferido = null;

async function cargarCupon() {
    try {
        const d = await getDoc(doc(db, COLECCION_CONFIG, 'club'));
        const c = d.exists() ? d.data() : null;
        if (c && c.activo && c.codigo && c.beneficio) cupon = c;
    } catch (err) {
        console.warn('[captacion] Sin configuración del club:', err);
    }
    if (cupon) {
        const b = $('clubBeneficio');
        b.textContent = `🎁 Al unirte: ${cupon.beneficio}`;
        b.classList.remove('hidden');
    }
}

function normalizarTel(v) {
    let d = String(v).replace(/\D/g, '');
    if (d.length === 11 && d.startsWith('503')) d = d.slice(3);
    return d;
}

function mostrarExito(nombre, telefono, yaEstaba, enfocar = true) {
    $('formClub').classList.add('hidden');
    const exito = $('clubExito');
    $('clubExitoTitulo').textContent = yaEstaba ? '¡Ya estabas en el club!' : '¡Ya eres parte del club!';
    $('clubExitoTexto').textContent = cupon
        ? 'Escríbenos por WhatsApp con tu código para usar tu beneficio y guardar nuestro número.'
        : 'Escríbenos por WhatsApp para guardar nuestro número y recibir las promos.';
    if (cupon) {
        const c = $('clubCupon');
        c.innerHTML = `<small>Tu código</small><strong>${esc(cupon.codigo)}</strong><span>${esc(cupon.beneficio)}</span>${cupon.condiciones ? `<span>${esc(cupon.condiciones)}</span>` : ''}`;
        c.classList.remove('hidden');
    }
    const texto = cupon
        ? `¡Hola! Me uní al Club La Hornilla. Soy ${nombre}. Quiero usar mi cupón ${cupon.codigo}.`
        : `¡Hola! Me uní al Club La Hornilla. Soy ${nombre}. Quiero recibir las promos por aquí.`;
    $('btnClubWhatsapp').href = `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(texto)}`;
    exito.classList.remove('hidden');
    if (enfocar) exito.focus();
}

function iniciarClub() {
    const form = $('formClub');
    const msg = $('clubMsg');
    const tel = $('clubTel');

    /* Formato 7000-0000 mientras escribe */
    tel.addEventListener('input', () => {
        const d = normalizarTel(tel.value).slice(0, 8);
        tel.value = d.length > 4 ? `${d.slice(0, 4)}-${d.slice(4)}` : d;
    });

    const previo = leerLS('hornilla_club');
    if (previo?.nombre) mostrarExitoDiferido = () => mostrarExito(previo.nombre, previo.telefono, true, false);

    form.addEventListener('submit', async e => {
        e.preventDefault();
        msg.className = 'cap-msg';
        [$('clubNombre'), tel].forEach(el => el.removeAttribute('aria-invalid'));
        if ($('clubWeb').value) return;   // bot

        const nombre = $('clubNombre').value.trim();
        const numero = normalizarTel(tel.value);
        let error = '';
        if (nombre.length < 2) { error = 'Escribe tu nombre.'; $('clubNombre').setAttribute('aria-invalid', 'true'); }
        else if (!/^[67]\d{7}$/.test(numero)) { error = 'Escribe un número de WhatsApp de 8 dígitos (empieza con 6 o 7).'; tel.setAttribute('aria-invalid', 'true'); }
        else if (!$('clubAcepto').checked) error = 'Marca la casilla para aceptar recibir promociones.';
        if (error) { msg.textContent = error; msg.classList.add('error'); return; }

        const btn = $('btnUnirme');
        btn.disabled = true;
        msg.textContent = 'Guardando…';
        const telefono = '503' + numero;
        let yaEstaba = false;
        try {
            /* El id es el número: si ya existe, las reglas rechazan la
               escritura (no se permite actualizar) → ya estaba inscrito. */
            await setDoc(doc(db, COLECCION_CLUB, telefono), {
                nombre, telefono, consentimiento: true,
                textoConsentimiento: 'Acepto recibir promociones de La Hornilla de Zaid por WhatsApp y la política de privacidad. Soy mayor de 18 años.',
                origen: (new URLSearchParams(location.search).get('utm_source') || 'web').slice(0, 40),
                creado: serverTimestamp()
            });
            track('club_registro', { tiene_cupon: !!cupon });
        } catch (err) {
            if (err?.code === 'permission-denied') yaEstaba = true;
            else {
                console.error(err);
                msg.textContent = 'No se pudo guardar. Revisa tu conexión e intenta de nuevo.';
                msg.classList.add('error');
                btn.disabled = false;
                return;
            }
        }
        guardarLS('hornilla_club', { nombre, telefono });
        msg.textContent = '';
        btn.disabled = false;
        mostrarExito(nombre, telefono, yaEstaba);
    });
}
/* ======================== ARRANQUE ======================== */
document.addEventListener('DOMContentLoaded', async () => {
    if (!$('opiniones')) return;
    iniciarFormResena();
    iniciarClub();
    await Promise.all([cargarResenas(), cargarCupon()]);
    /* Si esta persona ya se unió desde este navegador, se le muestra su
       tarjeta (con el cupón, si hay) en vez del formulario. */
    if (mostrarExitoDiferido) mostrarExitoDiferido();
});
