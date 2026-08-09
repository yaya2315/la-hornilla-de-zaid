/* =====================================================================
   PEDIDOS.JS — Fuente única para leer y escribir la colección "pedidos"
   ---------------------------------------------------------------------
   La usan tanto mesero.js (tomar/editar comandas) como cocina.js
   (escuchar en tiempo real y cambiar el estado del ticket). Así los
   dos hablan con Firestore exactamente de la misma forma y con los
   mismos nombres de campo — el mismo criterio que ya usan bebidas.js
   y extras.js para no desincronizar nada entre pantallas.
   ===================================================================== */

import { db, COLECCION_PEDIDOS } from './firebase-config.js';
import {
    collection, addDoc, updateDoc, doc, getDocs, onSnapshot,
    query, where, orderBy, serverTimestamp, Timestamp
} from 'https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js';

export const ESTADOS_ACTIVOS = ['pendiente', 'preparando', 'listo'];

/* ── Dinero: mismos helpers que ya usa pupusas-contenido.js ───────── */
export function moneyParse(txt = '') {
    const n = parseFloat(String(txt).replace(/[^0-9.]/g, ''));
    return Number.isFinite(n) ? n : 0;
}
export function money(n) { return '$' + (Number(n) || 0).toFixed(2); }

export function calcularTotal(items = []) {
    return items.reduce((acc, it) => acc + (Number(it.precio) || 0) * (Number(it.cantidad) || 0), 0);
}

/* ── Crear un pedido nuevo ──────────────────────────────────────── */
export async function crearPedido(mesa, items) {
    const ref = await addDoc(collection(db, COLECCION_PEDIDOS), {
        mesa: String(mesa),
        estado: 'pendiente',
        items,
        total: calcularTotal(items),
        creadoEn: serverTimestamp(),
        actualizadoEn: serverTimestamp()
    });
    return ref.id;
}

/* ── Guardar cambios en los items de un pedido existente ──────────
   (el mesero agregó, quitó o modificó algo). No toca el estado. */
export async function actualizarItemsPedido(pedidoId, items) {
    return updateDoc(doc(db, COLECCION_PEDIDOS, pedidoId), {
        items,
        total: calcularTotal(items),
        actualizadoEn: serverTimestamp()
    });
}

/* ── Cambiar el estado de un pedido (lo usa cocina.html) ──────────── */
export async function cambiarEstado(pedidoId, estado) {
    return updateDoc(doc(db, COLECCION_PEDIDOS, pedidoId), {
        estado,
        actualizadoEn: serverTimestamp()
    });
}

/* ── Buscar el pedido ACTIVO más reciente de una mesa (para editar) ──
   "Activo" = pendiente, preparando o listo. Uno entregado o cancelado
   nunca se vuelve a cargar aquí; ya es historial. */
export async function buscarPedidoActivoPorMesa(mesa) {
    const snap = await getDocs(
        query(collection(db, COLECCION_PEDIDOS), where('mesa', '==', String(mesa)))
    );
    const activos = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter(p => ESTADOS_ACTIVOS.includes(p.estado))
        .sort((a, b) => (b.creadoEn?.toMillis?.() ?? 0) - (a.creadoEn?.toMillis?.() ?? 0));
    return activos[0] || null;
}

/* ── Tiempo real: pedidos activos para la pantalla de cocina ──────
   callback(pedidos, idsNuevos) — idsNuevos solo trae algo cuando de
   verdad llegó un ticket nuevo (no en la primera carga de la página),
   así cocina.js sabe cuándo sonar la alerta. */
export function escucharPedidosActivos(callback) {
    const q = query(
        collection(db, COLECCION_PEDIDOS),
        where('estado', 'in', ESTADOS_ACTIVOS),
        orderBy('creadoEn', 'asc')
    );
    let primeraCarga = true;
    return onSnapshot(q, snap => {
        const pedidos = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        const idsNuevos = primeraCarga
            ? []
            : snap.docChanges().filter(c => c.type === 'added').map(c => c.doc.id);
        primeraCarga = false;
        callback(pedidos, idsNuevos);
    }, err => console.error('[pedidos] Error escuchando pedidos activos:', err));
}

/* ── Tiempo real: TODO lo del día (para el panel de historial) ────── */
export function escucharHistorialHoy(callback) {
    const inicio = new Date();
    inicio.setHours(0, 0, 0, 0);
    const q = query(
        collection(db, COLECCION_PEDIDOS),
        where('creadoEn', '>=', Timestamp.fromDate(inicio))
    );
    return onSnapshot(q, snap => {
        callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, err => console.error('[pedidos] Error escuchando historial:', err));
}