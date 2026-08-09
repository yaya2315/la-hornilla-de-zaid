/* =====================================================================
   HISTORIAL.JS — Registro completo de compras (La Hornilla de Zaid)
   ---------------------------------------------------------------------
   • Protegido con la MISMA cuenta que usas para entrar al panel de
     promociones (../HTML/admin.html) — no hace falta crear otro
     usuario.
   • Lee la colección "pedidos" en tiempo real (onSnapshot), con un
     rango de fechas que se ajusta desde los filtros. Tipo, estado y
     búsqueda se filtran del lado del cliente sobre lo ya recibido.
   • Cada fila = un pedido: fecha, hora, mesa/cliente, platillos,
     total y estado. El resumen de arriba se recalcula solo.
   ===================================================================== */

import { auth, activarReconexionAutomatica } from './firebase-config.js';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged }
    from 'https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js';
import { escucharHistorial, money } from './pedidos.js';

const $ = id => document.getElementById(id);
const loginView = $('loginView'), histView = $('histView');

/* ===== UTILIDADES ==================================================== */
function esc(s = '') {
    return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}
function hoyISO() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function fechaDesdeISO(iso) {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d, 0, 0, 0, 0);
}
function formatoFecha(ts) {
    if (!ts?.toDate) return '—';
    return ts.toDate().toLocaleDateString('es-SV', { day: '2-digit', month: 'short', year: 'numeric' });
}
function formatoHora(ts) {
    if (!ts?.toDate) return '--:--';
    return ts.toDate().toLocaleTimeString('es-SV', { hour: '2-digit', minute: '2-digit' });
}

const ETIQUETA_TIPO = { local: 'Comer aquí', llevar: 'Para llevar', domicilio: 'Domicilio' };
const ETIQUETA_ESTADO = {
    pendiente: 'Pendiente', preparando: 'Preparando', listo: 'Listo',
    entregado: 'Entregado', cancelado: 'Cancelado'
};

function etiquetaOrigen(p) {
    if (p.tipo === 'llevar') return `🥡 Para llevar${p.cliente ? ' — ' + p.cliente : ''}`;
    if (p.tipo === 'domicilio') return `🛵 Domicilio${p.cliente ? ' — ' + p.cliente : ''}`;
    return `Mesa ${p.mesa || '—'}`;
}
function resumenItems(p) {
    return (p.items || []).map(it => `${it.cantidad}× ${it.platillo}`).join(', ') || '—';
}

/* ===== AUTENTICACIÓN ================================================= */
const erroresAuth = {
    'auth/invalid-email': 'El correo no es válido.',
    'auth/user-not-found': 'No existe una cuenta con ese correo.',
    'auth/wrong-password': 'Contraseña incorrecta.',
    'auth/invalid-credential': 'Correo o contraseña incorrectos.',
    'auth/too-many-requests': 'Demasiados intentos. Espera un momento.',
    'auth/network-request-failed': 'Sin conexión. Revisa tu internet.'
};

async function login() {
    const email = $('email').value.trim();
    const pass = $('pass').value;
    const msg = $('loginMsg');
    msg.textContent = '';
    if (!email || !pass) { msg.textContent = 'Escribe tu correo y contraseña.'; msg.className = 'form-msg error'; return; }
    $('btnLogin').disabled = true;
    try {
        await signInWithEmailAndPassword(auth, email, pass);
    } catch (err) {
        msg.textContent = erroresAuth[err.code] || 'No se pudo iniciar sesión.';
        msg.className = 'form-msg error';
    } finally {
        $('btnLogin').disabled = false;
    }
}
$('btnLogin').addEventListener('click', login);
$('pass').addEventListener('keydown', e => { if (e.key === 'Enter') login(); });
$('email').addEventListener('keydown', e => { if (e.key === 'Enter') $('pass').focus(); });
$('btnLogout').addEventListener('click', () => signOut(auth));

/* ===== ESTADO Y FILTROS ============================================== */
let pedidosRango = [];   // lo que trae Firestore para el rango de fechas actual
let desuscribir = null;

function leerFiltros() {
    return {
        desde: $('fDesde').value || hoyISO(),
        hasta: $('fHasta').value || hoyISO(),
        tipo: $('fTipo').value,
        estado: $('fEstado').value,
        busqueda: $('fBuscar').value.trim().toLowerCase()
    };
}

function suscribirRango() {
    if (desuscribir) { desuscribir(); desuscribir = null; }
    const f = leerFiltros();
    const desde = fechaDesdeISO(f.desde);
    const hasta = new Date(fechaDesdeISO(f.hasta).getTime() + 24 * 60 * 60 * 1000); // fin del día "hasta", exclusivo

    $('histEstado').classList.remove('hidden');
    $('histEstado').textContent = 'Cargando historial…';

    desuscribir = escucharHistorial(pedidos => {
        pedidosRango = pedidos;
        renderTodo();
    }, { desde, hasta });
}

function pedidosFiltrados() {
    const f = leerFiltros();
    return pedidosRango.filter(p => {
        if (f.tipo && (p.tipo || 'local') !== f.tipo) return false;
        if (f.estado && p.estado !== f.estado) return false;
        if (f.busqueda) {
            const campo = `${p.mesa || ''} ${p.cliente || ''}`.toLowerCase();
            if (!campo.includes(f.busqueda)) return false;
        }
        return true;
    });
}

/* ===== RENDER ========================================================= */
function renderResumen(lista) {
    const entregados = lista.filter(p => p.estado === 'entregado');
    const cancelados = lista.filter(p => p.estado === 'cancelado');
    const vendido = entregados.reduce((a, p) => a + (Number(p.total) || 0), 0);
    const promedio = entregados.length ? vendido / entregados.length : 0;

    $('histResumen').innerHTML = `
        <div><span class="hist-num">${lista.length}</span><span class="hist-lbl">Pedidos</span></div>
        <div><span class="hist-num">${entregados.length}</span><span class="hist-lbl">Entregados</span></div>
        <div><span class="hist-num">${cancelados.length}</span><span class="hist-lbl">Cancelados</span></div>
        <div><span class="hist-num">${money(vendido)}</span><span class="hist-lbl">Vendido</span></div>
        <div><span class="hist-num">${money(promedio)}</span><span class="hist-lbl">Ticket promedio</span></div>`;
}

function renderTabla(lista) {
    const body = $('histTablaBody');
    const vacio = $('histVacio');
    const estado = $('histEstado');
    estado.classList.add('hidden');

    if (!lista.length) {
        body.innerHTML = '';
        vacio.classList.remove('hidden');
        return;
    }
    vacio.classList.add('hidden');

    body.innerHTML = lista.map(p => `
        <tr>
            <td data-th="Fecha">${formatoFecha(p.creadoEn)}</td>
            <td data-th="Hora">${formatoHora(p.creadoEn)}</td>
            <td data-th="Origen">${esc(etiquetaOrigen(p))}${p.tipo === 'domicilio' && p.direccion ? `<br><span class="hist-direccion">📍 ${esc(p.direccion)}</span>` : ''}</td>
            <td data-th="Platillos" class="hist-items" title="${esc(resumenItems(p))}">${esc(resumenItems(p))}</td>
            <td data-th="Total" class="hist-total">${money(p.total)}</td>
            <td data-th="Estado"><span class="hist-badge hist-badge--${p.estado}">${ETIQUETA_ESTADO[p.estado] || p.estado}</span></td>
        </tr>`).join('');
}

function renderTodo() {
    const lista = pedidosFiltrados();
    renderResumen(lista);
    renderTabla(lista);
}

/* ===== EXPORTAR CSV =================================================== */
function exportarCSV() {
    const lista = pedidosFiltrados();
    if (!lista.length) return;

    const filas = [['Fecha', 'Hora', 'Origen', 'Tipo', 'Platillos', 'Total', 'Estado']];
    lista.forEach(p => {
        filas.push([
            formatoFecha(p.creadoEn),
            formatoHora(p.creadoEn),
            p.tipo === 'local' ? `Mesa ${p.mesa || ''}` : (p.cliente || p.mesa || ''),
            ETIQUETA_TIPO[p.tipo] || 'Comer aquí',
            resumenItems(p),
            (Number(p.total) || 0).toFixed(2),
            ETIQUETA_ESTADO[p.estado] || p.estado
        ]);
    });

    const csv = filas.map(fila => fila.map(campo => `"${String(campo).replace(/"/g, '""')}"`).join(',')).join('\r\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const f = leerFiltros();
    a.href = url;
    a.download = `historial-${f.desde}_a_${f.hasta}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}
$('btnExportar').addEventListener('click', exportarCSV);

/* ===== FILTROS: eventos =============================================== */
['fDesde', 'fHasta'].forEach(id => $(id).addEventListener('change', suscribirRango));
['fTipo', 'fEstado'].forEach(id => $(id).addEventListener('change', renderTodo));
let tBusqueda;
$('fBuscar').addEventListener('input', () => {
    clearTimeout(tBusqueda);
    tBusqueda = setTimeout(renderTodo, 150);
});

/* ===== INICIALIZACIÓN ================================================= */
$('fDesde').value = hoyISO();
$('fHasta').value = hoyISO();

onAuthStateChanged(auth, user => {
    if (user) {
        loginView.classList.add('hidden');
        histView.classList.remove('hidden');
        activarReconexionAutomatica();
        suscribirRango();
    } else {
        histView.classList.add('hidden');
        loginView.classList.remove('hidden');
        $('pass').value = '';
        if (desuscribir) { desuscribir(); desuscribir = null; }
    }
});