/* =====================================================================
   PEDIDOS.JS — Fuente única para leer y escribir la colección "pedidos"
   ---------------------------------------------------------------------
   La usan mesero.js (tomar/editar comandas), cocina.js (escuchar en
   tiempo real y cambiar el estado del ticket) e historial.js (consulta
   de todo lo vendido). Así todas hablan con Firestore exactamente de
   la misma forma y con los mismos nombres de campo.

   NUEVO — tipo de pedido:
   Cada pedido ahora lleva un campo "tipo": 'local' | 'llevar' | 'domicilio'.
   • local:     mesa = número de mesa (1–6)
   • llevar:    mesa = nombre del cliente (se reusa el mismo campo para
                no romper nada de lo que ya lee cocina.js), cliente = igual
   • domicilio: igual que llevar, más el campo "direccion"
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

/* ── Crear un pedido nuevo ──────────────────────────────────────────
   origen = { tipo, mesa, cliente, direccion } — solo "tipo" y "mesa"
   son obligatorios; cliente/direccion aplican a llevar/domicilio. */
export async function crearPedido(origen, items) {
    const {
        tipo = 'local', mesa = '', cliente = '', direccion = '', telefono = '',
        ubicacionLat = null, ubicacionLng = null, ubicacionLink = ''
    } = origen || {};
    const ref = await addDoc(collection(db, COLECCION_PEDIDOS), {
        tipo,
        mesa: String(mesa || ''),
        cliente: cliente || '',
        direccion: direccion || '',
        telefono: telefono || '',
        ubicacionLat: ubicacionLat ?? null,
        ubicacionLng: ubicacionLng ?? null,
        ubicacionLink: ubicacionLink || '',
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
   Solo aplica a pedidos "local" (mesa numerada). "Activo" = pendiente,
   preparando o listo. Uno entregado o cancelado nunca se vuelve a
   cargar aquí; ya es historial. */
export async function buscarPedidoActivoPorMesa(mesa) {
    const snap = await getDocs(
        query(collection(db, COLECCION_PEDIDOS), where('mesa', '==', String(mesa)))
    );
    const activos = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter(p => (p.tipo || 'local') === 'local' && ESTADOS_ACTIVOS.includes(p.estado))
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

/* ── Tiempo real: TODO lo del día (para el panel de historial de cocina.html) */
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

/* ── Tiempo real: historial completo con rango de fechas opcional ──
   (para historial.html). Sin desde/hasta, trae TODO lo que exista.
   El filtro es siempre sobre "creadoEn", así no hace falta un índice
   compuesto nuevo (rango + orderBy sobre el MISMO campo no lo pide). */
export function escucharHistorial(callback, { desde, hasta } = {}) {
    const partes = [collection(db, COLECCION_PEDIDOS)];
    if (desde) partes.push(where('creadoEn', '>=', Timestamp.fromDate(desde)));
    if (hasta) partes.push(where('creadoEn', '<', Timestamp.fromDate(hasta)));
    partes.push(orderBy('creadoEn', 'desc'));
    const q = query(...partes);
    return onSnapshot(q, snap => {
        callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, err => console.error('[pedidos] Error escuchando historial completo:', err));
}
