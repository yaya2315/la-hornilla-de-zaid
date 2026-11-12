/* =====================================================================
   BEBIDAS.JS — Fuente única de las bebidas del sitio
   ---------------------------------------------------------------------
   La usa pupusas.html (pupusas-contenido.js). Lee de Firebase (colección
   editable desde el admin); si Firebase falla, se usa el respaldo de abajo.
   La web pública en React tiene su propio lector: web-react/src/lib/datos.ts.
   • grupo: 'fria' | 'caliente' — para separar bebidas frías y calientes.
   ===================================================================== */

import { db, COLECCION_BEBIDAS } from './firebase-config.js';
import { collection, getDocs }
    from 'https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js';

export const RESPALDO_BEBIDAS = [
    { nombre: 'Latas (Uva, Mirinda)', precio: '$0.90', grupo: 'fria', activo: true },
    { nombre: 'Coca Cola lata', precio: '$1.00', grupo: 'fria', activo: true },
    { nombre: 'Salutaris (Limón, Naranja, Toronja, Simple)', precio: '$0.90', grupo: 'fria', activo: true },
    { nombre: 'Té Lipton (Durazno, Frambuesa, Limón)', precio: '$0.90', grupo: 'fria', activo: true },
    { nombre: 'Botella con agua', precio: '$0.70', grupo: 'fria', activo: true },
    { nombre: 'Café negro', precio: '$0.50', grupo: 'caliente', activo: true },
    { nombre: 'Café con leche', precio: '$0.75', grupo: 'caliente', activo: true },
    { nombre: 'Café con cremora', precio: '$0.75', grupo: 'caliente', activo: true },
    { nombre: 'Chocolate', precio: '$0.50', grupo: 'caliente', activo: true },
    { nombre: 'Chocolate con leche', precio: '$0.75', grupo: 'caliente', activo: true }
];

export async function cargarBebidas() {
    try {
        /* Sin orderBy a propósito: un documento sin el campo "orden"
           (por ejemplo, agregado a mano desde la consola de Firebase)
           quedaría invisible para Firestore si ordenamos en el servidor.
           Traemos todo y ordenamos aquí, así nunca se "pierde" nada. */
        const snap = await getDocs(collection(db, COLECCION_BEBIDAS));
        const items = snap.docs.map(d => ({ id: d.id, ...d.data() }))
            .filter(b => b.activo !== false)
            .sort((a, b) => (a.orden ?? Infinity) - (b.orden ?? Infinity));
        return items.length ? items : RESPALDO_BEBIDAS;
    } catch (err) {
        console.warn('[bebidas] No se pudo leer Firebase, uso respaldo:', err);
        return RESPALDO_BEBIDAS;
    }
}