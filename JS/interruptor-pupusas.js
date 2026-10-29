/* =====================================================================
   INTERRUPTOR-PUPUSAS.JS — Mostrar u ocultar el menú de pupusas
   ---------------------------------------------------------------------
   El menú de pupusas NO se borró: la página, los platillos (colección
   menuPupusas) y la pestaña "Pupusas" del admin siguen intactos.
   Solo se oculta en la web mientras esté apagado.

   ¿Cómo se activa otra vez?
     Admin → pestaña "Pupusas" → interruptor "Mostrar pupusas en la web".
   Eso guarda el documento config/pupusas { activo: true } en Firestore.
   Si ese documento no existe, las pupusas quedan OCULTAS.

   Qué controla:
     • Enlaces y botones marcados con  data-pupusas  (menú lateral,
       pie de página, botón de inicio, sección de pupusas en menu.html).
       Por CSS están ocultos hasta que <html> tiene la clase "pupusas-on".
     • pupusas.html: si está apagado, redirige a menu.html.
     • Pedir en línea (pedido.js) y la pantalla de mesero (mesero.js).

   Se lee con la API REST de Firestore (un fetch pequeño, sin cargar el
   SDK), así sirve también en páginas que no usan Firebase.
   ===================================================================== */

const PROYECTO = 'la-hornilla-de-zaid';
const API_KEY  = 'AIzaSyC6Dl3tFN7AqEnSDwd7wVmL0pmx_PN0WYg';
const URL_DOC  = `https://firestore.googleapis.com/v1/projects/${PROYECTO}/databases/(default)/documents/config/pupusas?key=${API_KEY}`;
const CLAVE_CACHE = 'hz_pupusas';

const leerCache = () => {
    try { return localStorage.getItem(CLAVE_CACHE) === '1'; } catch { return false; }
};
const guardarCache = activo => {
    try { localStorage.setItem(CLAVE_CACHE, activo ? '1' : '0'); } catch { /* sin almacenamiento */ }
};
const aplicarClase = activo => document.documentElement.classList.toggle('pupusas-on', activo);

/* Mientras llega la respuesta se usa lo último que se supo */
aplicarClase(leerCache());

let promesa = null;

/** Devuelve una promesa con true (pupusas visibles) o false (ocultas). */
export function pupusasActivas() {
    if (promesa) return promesa;
    promesa = (async () => {
        try {
            const r = await fetch(URL_DOC, { cache: 'no-store' });
            if (r.status === 404) { guardarCache(false); return false; }   // nunca se ha activado
            if (!r.ok) throw new Error('HTTP ' + r.status);
            const datos = await r.json();
            const activo = datos?.fields?.activo?.booleanValue === true;
            guardarCache(activo);
            return activo;
        } catch (err) {
            console.warn('[pupusas] No se pudo consultar el interruptor, uso el último valor conocido:', err);
            return leerCache();
        }
    })().then(activo => { aplicarClase(activo); return activo; });
    return promesa;
}

/* En pupusas.html: si está apagado, se manda al menú mexicano */
if (document.documentElement.dataset.pagina === 'pupusas') {
    pupusasActivas().then(activo => {
        if (!activo) location.replace('menu.html');
        else document.documentElement.classList.add('pupusas-lista');
    });
} else {
    pupusasActivas();
}
