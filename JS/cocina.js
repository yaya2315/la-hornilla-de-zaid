/* =====================================================================
   COCINA.JS — Pantalla de cocina en tiempo real (La Hornilla de Zaid)
   ---------------------------------------------------------------------
   • Tablero de 3 columnas (Pendiente / Preparando / Listo) que escucha
     Firestore con onSnapshot — nunca hay que recargar la pantalla.
   • Al llegar un ticket nuevo: suena una campanilla y el ticket entra
     con un pulso de brasa (el mismo lenguaje visual del "fueguito"
     de tu pantalla de carga).
   • "Entregado" saca el ticket del tablero pero el pedido sigue en
     Firestore para el historial del día.
   ===================================================================== */

import { db, COLECCION_PEDIDOS } from './firebase-config.js';
import { enableIndexedDbPersistence } from 'https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js';
import { escucharPedidosActivos, escucharHistorialHoy, cambiarEstado, money } from './pedidos.js';

try { enableIndexedDbPersistence(db); } catch { /* ya activa en otra pestaña, o navegador sin soporte */ }

const COLUMNAS = {
    pendiente:  { titulo: 'Pendiente',      siguiente: 'preparando', accion: 'Comenzar preparación' },
    preparando: { titulo: 'En preparación', siguiente: 'listo',      accion: 'Marcar listo' },
    listo:      { titulo: 'Listo',          siguiente: 'entregado',  accion: 'Entregar' }
};

let pedidosActivos = [];
const idsRecienLlegados = new Set();

/* ===== SONIDO — campanilla sintetizada, sin archivo de audio ======== */
let audioCtx = null;
function habilitarAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    document.removeEventListener('click', habilitarAudio);
    document.removeEventListener('touchstart', habilitarAudio);
}
document.addEventListener('click', habilitarAudio, { once: true });
document.addEventListener('touchstart', habilitarAudio, { once: true });

function sonarCampanilla() {
    try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const ahora = audioCtx.currentTime;
        [880, 1318.5].forEach((freq, i) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.0001, ahora + i * 0.14);
            gain.gain.exponentialRampToValueAtTime(0.22, ahora + i * 0.14 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, ahora + i * 0.14 + 0.45);
            osc.connect(gain).connect(audioCtx.destination);
            osc.start(ahora + i * 0.14);
            osc.stop(ahora + i * 0.14 + 0.5);
        });
    } catch (err) { console.warn('[cocina] No se pudo reproducir la alerta:', err); }
}

/* ===== UTILIDADES ==================================================== */
function esc(s = '') {
    return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}
function formatoHora(ts) {
    if (!ts?.toDate) return '--:--';
    return ts.toDate().toLocaleTimeString('es-SV', { hour: '2-digit', minute: '2-digit' });
}
function minutosDesde(ts) {
    if (!ts?.toDate) return 0;
    return Math.max(0, Math.round((Date.now() - ts.toDate().getTime()) / 60000));
}

/* ===== RENDER DEL TABLERO ============================================ */
function renderTicket(p) {
    const col = COLUMNAS[p.estado];
    const mins = minutosDesde(p.creadoEn);
    const urgente = p.estado === 'pendiente' && mins >= 8;
    return `
    <article class="ticket estado-${p.estado} ${idsRecienLlegados.has(p.id) ? 'is-nuevo' : ''} ${urgente ? 'es-urgente' : ''}" data-id="${p.id}">
        <header class="ticket-head">
            <span class="ticket-mesa">Mesa ${esc(p.mesa)}</span>
            <span class="ticket-tiempo" data-id="${p.id}">${formatoHora(p.creadoEn)} · hace <b>${mins}</b> min</span>
        </header>
        <ul class="ticket-items">
            ${(p.items || []).map(it => `
                <li>
                    <span class="ticket-item-cant">${it.cantidad}×</span>
                    <span class="ticket-item-nombre">${esc(it.platillo)}</span>
                    ${it.notas ? `<span class="ticket-item-notas">${esc(it.notas)}</span>` : ''}
                </li>`).join('')}
        </ul>
        <footer class="ticket-foot">
            <button type="button" class="btn-cancelar" data-id="${p.id}" aria-label="Cancelar pedido">Cancelar</button>
            <button type="button" class="btn-avanzar" data-id="${p.id}" data-siguiente="${col.siguiente}">${col.accion} →</button>
        </footer>
    </article>`;
}

function renderTablero() {
    Object.keys(COLUMNAS).forEach(estado => {
        const wrap = document.getElementById(`col-${estado}`);
        const contador = document.getElementById(`contador-${estado}`);
        if (!wrap) return;
        const estadoLista = pedidosActivos.filter(p => p.estado === estado);
        contador.textContent = estadoLista.length;
        wrap.innerHTML = estadoLista.length
            ? estadoLista.map(renderTicket).join('')
            : `<p class="col-vacia">Sin pedidos</p>`;
    });

    document.querySelectorAll('.btn-avanzar').forEach(btn => {
        btn.addEventListener('click', () => cambiarEstado(btn.dataset.id, btn.dataset.siguiente));
    });
    document.querySelectorAll('.btn-cancelar').forEach(btn => {
        btn.addEventListener('click', () => {
            if (confirm('¿Cancelar este pedido? Esta acción no se puede deshacer.')) {
                cambiarEstado(btn.dataset.id, 'cancelado');
            }
        });
    });

    idsRecienLlegados.forEach(id => {
        setTimeout(() => {
            idsRecienLlegados.delete(id);
            document.querySelector(`.ticket[data-id="${id}"]`)?.classList.remove('is-nuevo');
        }, 3200);
    });
}

/* Actualiza solo el texto de "hace N min" cada 30s, sin repintar todo
   el tablero (así no se pierde ninguna animación en curso). */
setInterval(() => {
    document.querySelectorAll('.ticket-tiempo').forEach(el => {
        const p = pedidosActivos.find(x => x.id === el.dataset.id);
        if (p) el.innerHTML = `${formatoHora(p.creadoEn)} · hace <b>${minutosDesde(p.creadoEn)}</b> min`;
    });
}, 30000);

/* ===== HISTORIAL DEL DÍA ============================================= */
function renderHistorial(pedidosHoy) {
    const cont = document.getElementById('historialContenido');
    if (!cont) return;
    const entregados = pedidosHoy.filter(p => p.estado === 'entregado');
    const cancelados = pedidosHoy.filter(p => p.estado === 'cancelado');
    const ingresos = entregados.reduce((a, p) => a + (Number(p.total) || 0), 0);

    const porMesa = {};
    pedidosHoy.forEach(p => { porMesa[p.mesa] = (porMesa[p.mesa] || 0) + 1; });
    const mesas = Object.keys(porMesa).sort((a, b) => a - b);

    cont.innerHTML = `
        <div class="historial-resumen">
            <div><span class="historial-num">${pedidosHoy.length}</span><span class="historial-lbl">Pedidos hoy</span></div>
            <div><span class="historial-num">${entregados.length}</span><span class="historial-lbl">Entregados</span></div>
            <div><span class="historial-num">${cancelados.length}</span><span class="historial-lbl">Cancelados</span></div>
            <div><span class="historial-num">${money(ingresos)}</span><span class="historial-lbl">Vendido hoy</span></div>
        </div>
        <h3 class="historial-sub">Pedidos por mesa</h3>
        <div class="historial-mesas">
            ${mesas.length ? mesas.map(m => `
                <div class="historial-mesa-row"><span>Mesa ${esc(m)}</span><span>${porMesa[m]} pedido(s)</span></div>
            `).join('') : '<p class="col-vacia">Aún no hay pedidos hoy</p>'}
        </div>`;
}

/* ===== MODO KIOSCO / PANTALLA COMPLETA =============================== */
function actualizarBotonFullscreen() {
    const btn = document.getElementById('btnFullscreen');
    if (!btn) return;
    btn.textContent = document.fullscreenElement ? 'Salir de pantalla completa' : 'Pantalla completa';
}
document.getElementById('btnFullscreen')?.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen().catch(() => {});
});
document.addEventListener('fullscreenchange', actualizarBotonFullscreen);

/* ===== PANEL DE HISTORIAL — abrir/cerrar ============================= */
document.getElementById('btnHistorial')?.addEventListener('click', () => {
    document.getElementById('historialDrawer')?.classList.add('is-abierto');
    document.getElementById('historialBackdrop')?.classList.add('is-abierto');
});
function cerrarHistorial() {
    document.getElementById('historialDrawer')?.classList.remove('is-abierto');
    document.getElementById('historialBackdrop')?.classList.remove('is-abierto');
}
document.getElementById('btnCerrarHistorial')?.addEventListener('click', cerrarHistorial);
document.getElementById('historialBackdrop')?.addEventListener('click', cerrarHistorial);

/* ===== INICIALIZACIÓN ================================================ */
escucharPedidosActivos((pedidos, idsNuevos) => {
    pedidosActivos = pedidos;
    if (idsNuevos.length) {
        idsNuevos.forEach(id => idsRecienLlegados.add(id));
        sonarCampanilla();
    }
    renderTablero();
});

escucharHistorialHoy(renderHistorial);