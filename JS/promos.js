/* =====================================================================
   PROMOS.JS — Muestra las promociones del día, leyendo desde Firebase
   ---------------------------------------------------------------------
   • Cada promoción tiene SUS PROPIOS días (los eliges en el panel).
   • En el menú se muestran TODAS las promociones que estén ACTIVAS
     y cuyos días incluyan el día de HOY.
   • Si Firebase no responde, usa la lista de respaldo de más abajo,
     así la página nunca queda rota.

   CAMBIO CLAVE: antes esto se leía UNA sola vez con getDocs() al
   cargar la página — por eso un cambio en el admin (nueva promo,
   editar precio, activar/desactivar) no aparecía hasta recargar.
   Ahora usa onSnapshot(), igual que cocina.js: en cuanto guardas algo
   en el panel de promociones, se refleja aquí solo, sin recargar.
   ===================================================================== */

import { db, COLECCION } from './firebase-config.js';
import { collection, onSnapshot }
    from 'https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js';

/* Respaldo: solo se usa si Firebase aún no está configurado o falla.
   Cada promoción lleva sus días (0=Dom, 1=Lun … 6=Sáb). */
const RESPALDO = [
    { nombre: "Combo Mega Quesadilla", descripcion: "1/2 Sopa de tortilla + Mega Quesadilla + Bebida.", precio: "$5.50", activa: true, dias: [2, 3, 4, 5] },
    { nombre: "Combo Mini Torta",      descripcion: "1/2 Sopa de tortilla + Mini Torta + Bebida.",      precio: "$5.50", activa: true, dias: [2, 3, 4, 5] }
];

/* ── Nombres de los días ───────────────────────────────────────────── */
const ORDEN_SEM = [1, 2, 3, 4, 5, 6, 0];   // Lun → Dom
const NOMBRE = { 0: 'domingo', 1: 'lunes', 2: 'martes', 3: 'miércoles', 4: 'jueves', 5: 'viernes', 6: 'sábado' };

/* Convierte [2,3,4,5] en un texto legible: "martes a viernes", "sábado", etc. */
function textoDias(dias) {
    if (!Array.isArray(dias) || dias.length === 0 || dias.length >= 7) return 'todos los días';
    const arr = [...dias].sort((a, b) => ORDEN_SEM.indexOf(a) - ORDEN_SEM.indexOf(b));
    const idx = arr.map(d => ORDEN_SEM.indexOf(d));
    const contiguo = idx.every((v, i) => i === 0 || v === idx[i - 1] + 1);
    if (contiguo && arr.length >= 3) return `${NOMBRE[arr[0]]} a ${NOMBRE[arr[arr.length - 1]]}`;
    if (arr.length === 1) return NOMBRE[arr[0]];
    return arr.slice(0, -1).map(d => NOMBRE[d]).join(', ') + ' y ' + NOMBRE[arr[arr.length - 1]];
}

/* ¿Esta promoción se muestra hoy? Activa + el día de hoy está en su lista. */
function seMuestraHoy(p, hoy) {
    if (p.activa !== true) return false;
    const dias = (Array.isArray(p.dias) && p.dias.length) ? p.dias : [0, 1, 2, 3, 4, 5, 6];
    return dias.includes(hoy);
}

function esc(s = '') {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/* Carnes de los combos: en TODOS los combos solo se ofrecen estas tres
   (igual en "Pedir en línea" de la web: web-react/src/paginas/pedido/carrito.ts). */
export const CARNES_COMBO = ['Pollo', 'Pollo pastor', 'Suadero'];

const precioNumero = (txt) => {
    const n = parseFloat(String(txt ?? '').replace(/[^0-9.]/g, ''));
    return Number.isFinite(n) ? n : 0;
};
/* La promo de tacos sueltos (ej. "Tacos a $0.99") no lleva carne: son tacos mixtos */
const esTacosSueltos = (p) => /taco/i.test(p.nombre || '') && precioNumero(p.precio) > 0 && precioNumero(p.precio) < 1;

function tarjeta(p, i, agregable) {
    const conCarne = agregable && !esTacosSueltos(p);
    const acciones = agregable ? `
            <div class="combo-acciones">
                ${conCarne ? `
                <label class="combo-carne-lbl">Carne
                    <select class="combo-carne" data-combo="${i}">
                        ${CARNES_COMBO.map(c => `<option>${esc(c)}</option>`).join('')}
                    </select>
                </label>` : ''}
                <button type="button" class="btn-agregar-comanda combo-agregar" data-combo="${i}">Agregar a la orden</button>
            </div>` : '';
    return `
        <section class="combo-week" aria-label="Promoción">
            <span class="combo-badge"><span class="dot"></span> Combo de la semana</span>
            <p class="combo-vigencia">Disponible: ${esc(textoDias(p.dias))}</p>
            <div class="combo-grid">
                <div>
                    <h2 class="combo-name">${esc(p.nombre)}</h2>
                    <p class="combo-desc">${esc(p.descripcion || '')}</p>
                </div>
                <div class="combo-price">
                    <small>Precio</small>
                    <span>${esc(p.precio || '')}</span>
                </div>
            </div>${acciones}
        </section>`;
}

document.addEventListener('DOMContentLoaded', () => {
    const wrap = document.getElementById('combosActivos');
    if (!wrap) return;   // esta página no tiene zona de promociones
    /* Solo una vez, aunque DOMContentLoaded se dispare de nuevo (sesion-personal.js lo dispara a mano) */
    if (wrap.dataset.iniciado === 'si') return;
    wrap.dataset.iniciado = 'si';

    let ultimasPromos = RESPALDO;
    let delDia = [];
    /* En el mesero (data-agregar="si") cada combo trae carne + botón para la orden */
    const agregable = wrap.dataset.agregar === 'si';

    function pintar() {
        const hoy = new Date().getDay();   // 0 = domingo … 6 = sábado
        /* Si el mesero está eligiendo carne, no se repinta debajo de su dedo */
        if (agregable && wrap.contains(document.activeElement) && document.activeElement.tagName === 'SELECT') return;
        delDia = ultimasPromos.filter(p => seMuestraHoy(p, hoy));

        if (delDia.length === 0) {
            wrap.innerHTML = '';
            wrap.classList.remove('has-combos');   // sin promos hoy → no ocupa espacio
            return;
        }
        wrap.innerHTML = delDia.map((p, i) => tarjeta(p, i, agregable)).join('');
        wrap.classList.add('has-combos');
    }

    /* "Agregar a la orden": avisa a mesero.js con un evento (cada archivo sigue por su lado) */
    if (agregable) {
        wrap.addEventListener('click', e => {
            const btn = e.target.closest('.combo-agregar');
            if (!btn) return;
            const i = Number(btn.dataset.combo);
            const p = delDia[i];
            if (!p) return;
            const sel = wrap.querySelector(`.combo-carne[data-combo="${i}"]`);
            const carne = sel && CARNES_COMBO.includes(sel.value) ? sel.value : '';
            document.dispatchEvent(new CustomEvent('hornilla:agregar-combo', {
                detail: { platillo: carne ? `${p.nombre} — de ${carne}` : p.nombre, precio: precioNumero(p.precio), cantidad: 1 }
            }));
        });
    }

    onSnapshot(collection(db, COLECCION), snap => {
        /* Sin orderBy: una promoción sin campo "orden" quedaría
           invisible si Firestore ordenara en el servidor. */
        ultimasPromos = snap.docs.map(d => d.data()).sort((a, b) => (a.orden ?? Infinity) - (b.orden ?? Infinity));
        pintar();
    }, err => {
        console.warn('[promos] No se pudo escuchar Firebase, uso respaldo:', err);
        ultimasPromos = RESPALDO;
        pintar();
    });

    /* Repinta cada 5 min por si la pantalla queda abierta y cruza la
       medianoche — así "hoy" se recalcula sin depender de un nuevo
       cambio en el admin. */
    setInterval(pintar, 5 * 60 * 1000);
});