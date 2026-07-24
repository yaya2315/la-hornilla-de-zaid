/* =====================================================================
   MENU-EXTRA.JS — Rellena en menu.html todo lo que antes estaba escrito
   a mano: la caja de Extras, las Bebidas y la vista previa de pupusas
   "Con un toque mexicano". Todo sale de Firebase (editable desde el
   admin) y usa exactamente las mismas clases CSS de siempre, así que
   el diseño no cambia en absoluto.
   ===================================================================== */

import { db, COLECCION_PUPUSAS } from './firebase-config.js';
import { collection, getDocs }
    from 'https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js';
import { cargarBebidas } from './bebidas.js';
import { cargarExtras } from './extras.js';

function esc(s = '') {
    return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

/* ── Extras ──────────────────────────────────────────────────────── */
function renderExtras(extras) {
    const wrap = document.getElementById('extrasBox');
    if (!wrap) return;
    if (!extras.length) { wrap.classList.add('hidden'); return; }
    wrap.innerHTML = `
        <h3>Extras</h3>
        <div class="extras-grid">
            ${extras.map(e => `<div class="extra-row"><span>${esc(e.nombre)}</span><span class="precio">${esc(e.precio)}</span></div>`).join('')}
        </div>`;
}

/* ── Bebidas (dos bloques: generales/frías + calientes en tarjeta) ── */
function renderBebidasMenu(bebidas) {
    const generales = document.getElementById('bebidasGenerales');
    const calientesWrap = document.getElementById('bebidasCalientesWrap');
    if (!generales && !calientesWrap) return;

    const frias = bebidas.filter(b => (b.grupo || 'fria') !== 'caliente');
    const calientes = bebidas.filter(b => b.grupo === 'caliente');

    if (generales) {
        generales.innerHTML = frias.map(b =>
            `<div class="bebida-row"><span>${esc(b.nombre)}</span><span class="precio">${esc(b.precio)}</span></div>`
        ).join('');
    }
    if (calientesWrap) {
        calientesWrap.innerHTML = calientes.length ? `
            <div class="bebidas-grupo">
                <h3>Bebidas calientes</h3>
                ${calientes.map(b => `<div class="bebida-row"><span>${esc(b.nombre)}</span><span class="precio">${esc(b.precio)}</span></div>`).join('')}
            </div>` : '';
    }
}

/* ── Vista previa de "Con un toque mexicano" (datos de pupusas.html) ── */
async function renderToquePreview() {
    const wrap = document.getElementById('toqueMexicanoPreview');
    if (!wrap) return;
    try {
        /* Sin orderBy: un platillo sin campo "orden" quedaría invisible
           si Firestore lo ordenara en el servidor. Se ordena aquí. */
        const snap = await getDocs(collection(db, COLECCION_PUPUSAS));
        const items = snap.docs.map(d => d.data())
            .filter(p => p.activo !== false && p.categoria === 'Con un toque mexicano')
            .sort((a, b) => (a.orden ?? Infinity) - (b.orden ?? Infinity));

        if (!items.length) { wrap.innerHTML = ''; return; }

        wrap.innerHTML = items.map(p => {
            const v = (p.variantes && p.variantes[0]) || {};
            return `
            <div class="pupusa-row">
                <div class="pupusa-top"><h4>${esc(p.nombre)}</h4><span class="precio">${esc(v.precio || '')}</span></div>
                ${v.texto ? `<small>${esc(v.texto)}</small>` : ''}
            </div>`;
        }).join('');
    } catch (err) {
        console.warn('[menu-extra] No se pudo cargar la vista previa de pupusas:', err);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const [bebidas, extras] = await Promise.all([cargarBebidas(), cargarExtras()]);
    renderBebidasMenu(bebidas);
    renderExtras(extras);
    renderToquePreview();
});