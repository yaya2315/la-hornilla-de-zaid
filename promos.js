/* =====================================================================
   PROMOS.JS — Muestra el "Combo de la semana" leyendo desde Firebase
   ---------------------------------------------------------------------
   • Lee las promociones marcadas como ACTIVAS en el panel.
   • Si hay varias activas, rota una distinta cada semana (igual que antes).
   • Si Firebase no responde, usa la lista de respaldo de más abajo,
     así la página NUNCA se queda sin combo.
   ===================================================================== */

import { db, COLECCION } from './firebase-config.js';
import { collection, query, where, orderBy, getDocs }
    from 'https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js';

/* ── AJUSTE RÁPIDO ──────────────────────────────────────────────────
   Si quieres que el combo se vea TODOS los días, pon esto en false. */
const SOLO_DE_MARTES_A_VIERNES = true;

/* ── Respaldo: se usa solo si Firebase aún no está configurado o falla.
   Puedes dejarlo tal cual; el panel reemplaza estos valores en línea. */
const RESPALDO = [
    { nombre: "Combo Mega Quesadilla", descripcion: "1/2 Sopa de tortilla + Mega Quesadilla + Bebida.", precio: "$5.50" },
    { nombre: "Combo Mini Torta",      descripcion: "1/2 Sopa de tortilla + Mini Torta + Bebida.",      precio: "$5.50" },
    { nombre: "Combo Nachos",          descripcion: "1/2 Sopa de tortilla + 1/2 Orden de Nachos + Bebida.", precio: "$5.00" },
    { nombre: "Combo Tacos",           descripcion: "1/2 Sopa de tortilla + 2 Tacos + Bebida.",          precio: "$5.00" }
];

/* Número de semana ISO — para rotar el combo automáticamente */
function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const day = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - day);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

async function cargarActivas() {
    try {
        const q = query(
            collection(db, COLECCION),
            where('activa', '==', true),
            orderBy('orden', 'asc')
        );
        const snap = await getDocs(q);
        const lista = snap.docs.map(d => d.data());
        return lista.length ? lista : null;   // null → no hay activas
    } catch (err) {
        console.warn('[promos] No se pudo leer Firebase, uso respaldo:', err);
        return RESPALDO;                       // respaldo ante cualquier fallo
    }
}

function pintar(combo) {
    const box = document.getElementById('comboSemana');
    if (!box) return;

    const n = box.querySelector('[data-combo="nombre"]');
    const d = box.querySelector('[data-combo="descripcion"]');
    const p = box.querySelector('[data-combo="precio"]');
    if (n) n.textContent = combo.nombre;
    if (d) d.textContent = combo.descripcion;
    if (p) p.textContent = combo.precio;

    box.style.display = '';   // visible (respeta el display de tu CSS)
}

function ocultar() {
    const box = document.getElementById('comboSemana');
    if (box) box.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', async () => {
    const box = document.getElementById('comboSemana');
    if (!box) return;   // esta página no tiene combo

    const dia = new Date().getDay();          // 0 = domingo … 6 = sábado
    const enTemporada = !SOLO_DE_MARTES_A_VIERNES || (dia >= 2 && dia <= 5);

    if (!enTemporada) { ocultar(); return; }

    const activas = await cargarActivas();
    if (!activas) { ocultar(); return; }      // ninguna promo activa → ocultar

    const idx = getWeekNumber(new Date()) % activas.length;
    pintar(activas[idx]);
});