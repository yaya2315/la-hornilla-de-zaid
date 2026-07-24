/* =====================================================================
   EXTRAS.JS — Extras del menú mexicano (aguacate, queso fundido, etc.)
   Antes vivían escritos a mano en menu.html; ahora se editan desde el
   admin y este módulo los trae de Firebase. Si falla, usa el respaldo.
   ===================================================================== */

import { db, COLECCION_EXTRAS } from './firebase-config.js';
import { collection, getDocs }
    from 'https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js';

export const RESPALDO_EXTRAS = [
    { nombre: 'Aguacate', precio: '$0.75', activo: true },
    { nombre: 'Queso fundido', precio: '$1.25', activo: true },
    { nombre: 'Piña', precio: '$0.75', activo: true },
    { nombre: 'Jalapeño toreado', precio: '$0.50', activo: true }
];

export async function cargarExtras() {
    try {
        const snap = await getDocs(collection(db, COLECCION_EXTRAS));
        const items = snap.docs.map(d => ({ id: d.id, ...d.data() }))
            .filter(e => e.activo !== false)
            .sort((a, b) => (a.orden ?? Infinity) - (b.orden ?? Infinity));
        return items.length ? items : RESPALDO_EXTRAS;
    } catch (err) {
        console.warn('[extras] No se pudo leer Firebase, uso respaldo:', err);
        return RESPALDO_EXTRAS;
    }
}