/* =====================================================================
   PROMOS.JS — Muestra las promociones del día, leyendo desde Firebase
   ---------------------------------------------------------------------
   • Cada promoción tiene SUS PROPIOS días (los eliges en el panel).
   • En el menú se muestran TODAS las promociones que estén ACTIVAS
     y cuyos días incluyan el día de HOY.
   • Si Firebase no responde, usa la lista de respaldo de más abajo,
     así la página nunca queda rota.
   ===================================================================== */

import { db, COLECCION } from './firebase-config.js';
import { collection, query, orderBy, getDocs }
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

async function cargar() {
    try {
        const q = query(collection(db, COLECCION), orderBy('orden', 'asc'));
        const snap = await getDocs(q);
        return snap.docs.map(d => d.data());
    } catch (err) {
        console.warn('[promos] No se pudo leer Firebase, uso respaldo:', err);
        return RESPALDO;
    }
}

/* ¿Esta promoción se muestra hoy? Activa + el día de hoy está en su lista. */
function seMuestraHoy(p, hoy) {
    if (p.activa !== true) return false;
    const dias = (Array.isArray(p.dias) && p.dias.length) ? p.dias : [0, 1, 2, 3, 4, 5, 6];
    return dias.includes(hoy);
}

function esc(s = '') {
    return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

function tarjeta(p) {
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
            </div>
        </section>`;
}

document.addEventListener('DOMContentLoaded', async () => {
    const wrap = document.getElementById('combosActivos');
    if (!wrap) return;   // esta página no tiene zona de promociones

    const hoy = new Date().getDay();   // 0 = domingo … 6 = sábado
    const promos = await cargar();
    const delDia = promos.filter(p => seMuestraHoy(p, hoy));

    if (delDia.length === 0) {
        wrap.innerHTML = '';
        wrap.classList.remove('has-combos');   // sin promos hoy → no ocupa espacio
        return;
    }

    wrap.innerHTML = delDia.map(tarjeta).join('');
    wrap.classList.add('has-combos');
});
