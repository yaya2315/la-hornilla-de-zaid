/* =====================================================================
   MESERO.JS — Toma de pedidos (La Hornilla de Zaid / KDS)
   ---------------------------------------------------------------------
   • El menú (platillos, pupusas, bebidas y extras) se lee EN VIVO de
     las mismas colecciones que ya administras desde tu panel — nada
     está escrito a mano aquí. Si agregas o editas algo en el admin,
     aparece solo, sin recargar la página.
   • NUEVO — Tipo de pedido: Comer aquí / Para llevar / Domicilio.
     - Comer aquí: se elige una mesa (1–6), igual que antes; si esa
       mesa ya tiene un pedido activo, se carga para editarlo.
     - Para llevar / Domicilio: no hay mesa — se escribe el nombre del
       cliente (y la dirección, si es domicilio). Siempre arma un
       pedido nuevo, no busca uno existente para editar.
   • El pedido se guarda en Firestore con persistencia offline: si el
     wifi falla un instante, no se pierde nada — se sincroniza solo.
   • activarReconexionAutomatica() evita que esta pantalla se quede
     "pegada" si se deja abierta todo el turno.
   ===================================================================== */

import {
    db, COLECCION_MENU, COLECCION_PUPUSAS, COLECCION_CATEGORIAS,
    COLECCION_BEBIDAS, COLECCION_EXTRAS, activarReconexionAutomatica
} from './firebase-config.js';
import { collection, onSnapshot, enableIndexedDbPersistence }
    from 'https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js';
import {
    moneyParse, money, crearPedido, actualizarItemsPedido, buscarPedidoActivoPorMesa
} from './pedidos.js';

/* Offline: si hay más de una pestaña abierta del sistema, Firestore
   solo puede activar la persistencia en una — el resto sigue
   funcionando en línea con normalidad, por eso el catch queda mudo. */
try { enableIndexedDbPersistence(db); } catch { /* ya activa en otra pestaña, o navegador sin soporte */ }

const MESAS = [1, 2, 3, 4, 5, 6];
const TIPOS_PEDIDO = [
    { id: 'local',     icono: '🍽️', label: 'Comer aquí' },
    { id: 'llevar',    icono: '🥡', label: 'Para llevar' },
    { id: 'domicilio', icono: '🛵', label: 'Domicilio' }
];

/* ===== ESTADO EN MEMORIA ============================================ */
const menu = { categorias: [], principal: [], pupusas: [], bebidas: [], extras: [] };
let fichas = [];            // menú ya normalizado y listo para pintar
let grupoActivo = 'todo';
let termino = '';
let fichaAbierta = null;    // id de la ficha con el panel de opciones abierto

let tipoActual = 'local';   // 'local' | 'llevar' | 'domicilio'
let mesaActual = null;      // solo aplica a tipo 'local'
let clienteActual = '';     // aplica a 'llevar' / 'domicilio'
let direccionActual = '';   // aplica solo a 'domicilio'
let telefonoActual = '';    // aplica solo a 'domicilio'
let pedidoIdActual = null;  // null = pedido nuevo
let itemsCarrito = [];      // { platillo, cantidad, notas, precio }

/* ===== UTILIDADES ==================================================== */
function esc(s = '') {
    return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

function toast(msg, tipo = 'ok') {
    const cont = document.getElementById('kdsToasts');
    if (!cont) return;
    const el = document.createElement('div');
    el.className = `kds-toast kds-toast--${tipo}`;
    el.textContent = msg;
    cont.appendChild(el);
    requestAnimationFrame(() => el.classList.add('is-visible'));
    setTimeout(() => {
        el.classList.remove('is-visible');
        setTimeout(() => el.remove(), 300);
    }, 2600);
}

/* ¿Hay suficiente información para poder enviar el pedido? */
function origenListo() {
    if (tipoActual === 'local') return !!mesaActual;
    if (tipoActual === 'domicilio') return clienteActual.trim().length > 0 && telefonoActual.trim().length > 0;
    return clienteActual.trim().length > 0;
}

/* ===== NORMALIZAR EL MENÚ A "FICHAS" ================================ */
function normalizarPlato(p, grupo) {
    if (p.activo === false) return null;
    if (p.destacado && p.precioUnico != null) {
        return {
            id: p.id, grupo, nombre: p.nombre, categoria: p.categoria || '',
            nota: p.etiqueta || '', descripcion: p.descripcion || '',
            opciones: [{ label: null, precio: moneyParse(p.precioUnico) }]
        };
    }
    const opciones = (p.variantes || []).map(v => ({ label: v.texto || '', precio: moneyParse(v.precio) }));
    if (!opciones.length) return null;
    return {
        id: p.id, grupo, nombre: p.nombre, categoria: p.categoria || '',
        nota: p.nota || '', descripcion: '', opciones
    };
}

function reconstruirFichas() {
    const platosPrincipal = menu.principal.map(p => normalizarPlato(p, 'Menú mexicano')).filter(Boolean);
    const platosPupusas   = menu.pupusas.map(p => normalizarPlato(p, 'Pupusas')).filter(Boolean);
    const bebidas = menu.bebidas.filter(b => b.activo !== false).map(b => ({
        id: b.id, grupo: 'Bebidas', nombre: b.nombre, categoria: b.grupo === 'caliente' ? 'Caliente' : 'Fría',
        nota: '', descripcion: '', opciones: [{ label: null, precio: moneyParse(b.precio) }]
    }));
    const extras = menu.extras.filter(e => e.activo !== false).map(e => ({
        id: e.id, grupo: 'Extras', nombre: e.nombre, categoria: '', nota: '', descripcion: '',
        opciones: [{ label: null, precio: moneyParse(e.precio) }]
    }));
    fichas = [...platosPrincipal, ...platosPupusas, ...bebidas, ...extras];
    renderMenu();
}

/* ===== SUSCRIPCIONES EN VIVO A FIRESTORE ============================ */
function suscribirMenu() {
    const marcarCargando = () => document.getElementById('menuEstado')?.classList.remove('hidden');
    marcarCargando();

    onSnapshot(collection(db, COLECCION_CATEGORIAS), snap => {
        menu.categorias = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        reconstruirFichas();
    }, err => console.error('[mesero] categorías:', err));

    onSnapshot(collection(db, COLECCION_MENU), snap => {
        menu.principal = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        reconstruirFichas();
    }, err => console.error('[mesero] menú principal:', err));

    onSnapshot(collection(db, COLECCION_PUPUSAS), snap => {
        menu.pupusas = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        reconstruirFichas();
    }, err => console.error('[mesero] pupusas:', err));

    onSnapshot(collection(db, COLECCION_BEBIDAS), snap => {
        menu.bebidas = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        reconstruirFichas();
    }, err => console.error('[mesero] bebidas:', err));

    onSnapshot(collection(db, COLECCION_EXTRAS), snap => {
        menu.extras = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        reconstruirFichas();
    }, err => console.error('[mesero] extras:', err));
}

/* ===== RENDER: GRID DE PLATILLOS ===================================== */
function coincideBusqueda(f) {
    if (!termino) return true;
    return f.nombre.toLowerCase().includes(termino) || (f.categoria || '').toLowerCase().includes(termino);
}
function coincideGrupo(f) {
    if (grupoActivo === 'todo') return true;
    return f.grupo === grupoActivo;
}

function renderPills() {
    const wrap = document.getElementById('grupoPills');
    if (!wrap) return;
    const grupos = ['todo', 'Menú mexicano', 'Pupusas', 'Bebidas', 'Extras'];
    wrap.innerHTML = grupos.map(g => `
        <button type="button" class="grupo-pill ${g === grupoActivo ? 'is-active' : ''}" data-grupo="${esc(g)}">
            ${g === 'todo' ? 'Todo' : esc(g)}
        </button>`).join('');
    wrap.querySelectorAll('.grupo-pill').forEach(btn => {
        btn.addEventListener('click', () => {
            grupoActivo = btn.dataset.grupo;
            fichaAbierta = null;
            renderPills();
            renderMenu();
        });
    });
}

function renderFichaOpciones(f) {
    if (f.opciones.length <= 1) {
        return `<input type="hidden" class="opcion-radio" value="0" checked data-precio="${f.opciones[0].precio}">`;
    }
    return `
        <div class="opciones-lista" role="radiogroup" aria-label="Variante de ${esc(f.nombre)}">
            ${f.opciones.map((o, i) => `
                <label class="opcion-item">
                    <input type="radio" class="opcion-radio" name="op-${esc(f.id)}" value="${i}" data-precio="${o.precio}" ${i === 0 ? 'checked' : ''}>
                    <span class="opcion-texto">${esc(o.label || 'Precio único')}</span>
                    <span class="opcion-precio">${money(o.precio)}</span>
                </label>`).join('')}
        </div>`;
}

function renderMenu() {
    const grid = document.getElementById('menuGrid');
    const vacio = document.getElementById('menuVacio');
    const estado = document.getElementById('menuEstado');
    if (!grid) return;
    estado?.classList.add('hidden');

    const visibles = fichas.filter(f => coincideGrupo(f) && coincideBusqueda(f));

    if (!visibles.length) {
        grid.innerHTML = '';
        vacio?.classList.remove('hidden');
        return;
    }
    vacio?.classList.add('hidden');

    grid.innerHTML = visibles.map(f => {
        const abierta = fichaAbierta === f.id;
        const precioBase = f.opciones.length === 1 ? money(f.opciones[0].precio) : `desde ${money(Math.min(...f.opciones.map(o => o.precio)))}`;
        return `
        <article class="ficha ${abierta ? 'is-abierta' : ''}" data-id="${esc(f.id)}">
            <button type="button" class="ficha-head" aria-expanded="${abierta}">
                <span class="ficha-grupo">${esc(f.grupo)}</span>
                <h3 class="ficha-nombre">${esc(f.nombre)}</h3>
                ${f.nota ? `<span class="ficha-nota">${esc(f.nota)}</span>` : ''}
                ${f.descripcion ? `<p class="ficha-desc">${esc(f.descripcion)}</p>` : ''}
                <span class="ficha-precio">${precioBase}</span>
            </button>
            <div class="ficha-panel" ${abierta ? '' : 'hidden'}>
                ${renderFichaOpciones(f)}
                <div class="ficha-fila">
                    <label class="ficha-lbl">Cantidad
                        <div class="stepper">
                            <button type="button" class="stepper-btn" data-accion="menos" aria-label="Quitar uno">−</button>
                            <input type="number" class="stepper-valor" value="1" min="1" max="50" inputmode="numeric">
                            <button type="button" class="stepper-btn" data-accion="mas" aria-label="Agregar uno">+</button>
                        </div>
                    </label>
                    <label class="ficha-lbl ficha-lbl--notas">Notas
                        <input type="text" class="ficha-notas" placeholder="Ej. sin cebolla, extra picante" maxlength="120">
                    </label>
                </div>
                <button type="button" class="btn-agregar-comanda">Agregar a la orden <span class="arrow">→</span></button>
            </div>
        </article>`;
    }).join('');

    grid.querySelectorAll('.ficha-head').forEach(head => {
        head.addEventListener('click', () => {
            const card = head.closest('.ficha');
            const id = card.dataset.id;
            fichaAbierta = fichaAbierta === id ? null : id;
            renderMenu();
            if (fichaAbierta) card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    });

    grid.querySelectorAll('.stepper-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.parentElement.querySelector('.stepper-valor');
            const val = Math.max(1, (parseInt(input.value, 10) || 1) + (btn.dataset.accion === 'mas' ? 1 : -1));
            input.value = val;
        });
    });

    grid.querySelectorAll('.btn-agregar-comanda').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.ficha');
            const f = fichas.find(x => x.id === card.dataset.id);
            if (!f) return;
            const radioSel = card.querySelector('.opcion-radio:checked') || card.querySelector('.opcion-radio');
            const precio = parseFloat(radioSel.dataset.precio) || 0;
            const idxOpcion = parseInt(radioSel.value, 10) || 0;
            const label = f.opciones[idxOpcion]?.label;
            const cantidad = Math.max(1, parseInt(card.querySelector('.stepper-valor').value, 10) || 1);
            const notas = card.querySelector('.ficha-notas').value.trim();

            itemsCarrito.push({
                platillo: label ? `${f.nombre} — ${label}` : f.nombre,
                cantidad, notas, precio
            });

            fichaAbierta = null;
            renderMenu();
            renderCarrito();
            toast(`${f.nombre} agregado a la orden`);
        });
    });
}

/* ===== TIPO DE PEDIDO ================================================ */
function renderTipoPedido() {
    const wrap = document.getElementById('tipoPedidoWrap');
    if (!wrap) return;
    wrap.innerHTML = TIPOS_PEDIDO.map(t => `
        <button type="button" class="tipo-pill ${tipoActual === t.id ? 'is-active' : ''}" data-tipo="${t.id}" role="tab" aria-selected="${tipoActual === t.id}">
            <span aria-hidden="true">${t.icono}</span> ${t.label}
        </button>`).join('');
    wrap.querySelectorAll('.tipo-pill').forEach(btn => {
        btn.addEventListener('click', () => cambiarTipoPedido(btn.dataset.tipo));
    });
}

function bannerInicial() {
    if (tipoActual === 'local') return 'Selecciona una mesa para comenzar';
    if (tipoActual === 'llevar') return 'Escribe el nombre del cliente para el pedido para llevar';
    return 'Escribe el nombre y la dirección para el domicilio';
}

function actualizarBotonNuevo() {
    const btn = document.getElementById('btnNuevaMesa');
    if (btn) btn.textContent = tipoActual === 'local' ? 'Cambiar de mesa' : 'Nuevo pedido';
}

function cambiarTipoPedido(t) {
    if (t === tipoActual) return;
    if (itemsCarrito.length && !confirm('Cambiar el tipo de pedido descarta lo que llevas sin enviar en la comanda. ¿Continuar?')) return;
    tipoActual = t;
    mesaActual = null;
    pedidoIdActual = null;
    itemsCarrito = [];
    clienteActual = '';
    direccionActual = '';
    telefonoActual = '';
    renderTipoPedido();
    renderOrigen();
    renderCarrito();
    actualizarBotonNuevo();
    document.getElementById('comandaBanner').textContent = bannerInicial();
}

function renderOrigen() {
    const wrap = document.getElementById('origenPedidoWrap');
    if (!wrap) return;

    if (tipoActual === 'local') {
        wrap.innerHTML = `<nav id="mesasWrap" class="mesas-wrap" aria-label="Selección de mesa"></nav>`;
        renderMesas();
        return;
    }

    wrap.innerHTML = `
        <div class="cliente-form">
            <label class="ficha-lbl">Nombre del cliente
                <input type="text" id="clienteInput" class="ficha-notas" placeholder="Ej. Juan Pérez" maxlength="60" value="${esc(clienteActual)}">
            </label>
            ${tipoActual === 'domicilio' ? `
            <label class="ficha-lbl">Teléfono del cliente
                <input type="tel" id="telefonoInput" class="ficha-notas" placeholder="Ej. 7123-4567" maxlength="20" inputmode="tel" value="${esc(telefonoActual)}">
            </label>
            <label class="ficha-lbl">Dirección de entrega
                <input type="text" id="direccionInput" class="ficha-notas" placeholder="Ej. Col. Escalón, casa #12" maxlength="140" value="${esc(direccionActual)}">
            </label>` : ''}
        </div>`;

    document.getElementById('clienteInput')?.addEventListener('input', e => {
        clienteActual = e.target.value;
        renderCarrito();
    });
    document.getElementById('direccionInput')?.addEventListener('input', e => {
        direccionActual = e.target.value;
    });
    document.getElementById('telefonoInput')?.addEventListener('input', e => {
        telefonoActual = e.target.value;
        renderCarrito();
    });
}

/* ===== MESAS ========================================================= */
function renderMesas() {
    const wrap = document.getElementById('mesasWrap');
    if (!wrap) return;
    wrap.innerHTML = MESAS.map(n => `
        <button type="button" class="mesa-btn ${mesaActual === n ? 'is-active' : ''}" data-mesa="${n}">
            <span class="mesa-num">${n}</span><span class="mesa-lbl">Mesa</span>
        </button>`).join('');
    wrap.querySelectorAll('.mesa-btn').forEach(btn => {
        btn.addEventListener('click', () => seleccionarMesa(parseInt(btn.dataset.mesa, 10)));
    });
}

async function seleccionarMesa(n) {
    if (itemsCarrito.length && mesaActual !== n) {
        const confirmar = confirm(`Tienes ${itemsCarrito.length} ítem(s) sin enviar en la mesa ${mesaActual}. ¿Cambiar de mesa y descartarlos?`);
        if (!confirmar) return;
    }
    mesaActual = n;
    pedidoIdActual = null;
    itemsCarrito = [];
    renderMesas();
    renderCarrito();
    document.getElementById('comandaBanner').textContent = `Buscando pedido activo de la mesa ${n}…`;

    const activo = await buscarPedidoActivoPorMesa(n);
    if (activo) {
        pedidoIdActual = activo.id;
        itemsCarrito = (activo.items || []).map(it => ({ ...it }));
        document.getElementById('comandaBanner').innerHTML =
            `Editando el pedido <strong>activo</strong> de la mesa ${n} · estado: <strong>${esc(activo.estado)}</strong>`;
    } else {
        document.getElementById('comandaBanner').textContent = `Pedido nuevo para la mesa ${n}`;
    }
    renderCarrito();
}

/* ===== CARRITO / COMANDA ============================================= */
function renderCarrito() {
    const lista = document.getElementById('carritoLista');
    const totalEl = document.getElementById('carritoTotal');
    const btnEnviar = document.getElementById('btnEnviarPedido');
    if (!lista) return;

    if (!itemsCarrito.length) {
        lista.innerHTML = `<p class="carrito-vacio">Toca un platillo del menú para agregarlo aquí.</p>`;
    } else {
        lista.innerHTML = itemsCarrito.map((it, i) => `
            <div class="carrito-item">
                <div class="carrito-item-info">
                    <span class="carrito-item-nombre">${esc(it.platillo)}</span>
                    ${it.notas ? `<span class="carrito-item-notas">"${esc(it.notas)}"</span>` : ''}
                </div>
                <div class="carrito-item-controles">
                    <div class="stepper stepper--sm">
                        <button type="button" class="stepper-btn" data-i="${i}" data-accion="menos" aria-label="Quitar uno">−</button>
                        <span class="stepper-valor-txt">${it.cantidad}</span>
                        <button type="button" class="stepper-btn" data-i="${i}" data-accion="mas" aria-label="Agregar uno">+</button>
                    </div>
                    <span class="carrito-item-precio">${money(it.precio * it.cantidad)}</span>
                    <button type="button" class="carrito-item-quitar" data-i="${i}" aria-label="Quitar ítem">✕</button>
                </div>
            </div>`).join('');
    }

    const total = itemsCarrito.reduce((a, it) => a + it.precio * it.cantidad, 0);
    if (totalEl) totalEl.textContent = money(total);

    if (btnEnviar) {
        btnEnviar.disabled = !origenListo() || !itemsCarrito.length;
        btnEnviar.textContent = pedidoIdActual ? 'Guardar cambios' : 'Enviar pedido a cocina';
    }

    lista.querySelectorAll('.stepper-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const i = parseInt(btn.dataset.i, 10);
            itemsCarrito[i].cantidad = Math.max(1, itemsCarrito[i].cantidad + (btn.dataset.accion === 'mas' ? 1 : -1));
            renderCarrito();
        });
    });
    lista.querySelectorAll('.carrito-item-quitar').forEach(btn => {
        btn.addEventListener('click', () => {
            itemsCarrito.splice(parseInt(btn.dataset.i, 10), 1);
            renderCarrito();
        });
    });
}

async function enviarPedido() {
    if (!origenListo() || !itemsCarrito.length) return;
    const btn = document.getElementById('btnEnviarPedido');
    btn.disabled = true;
    btn.textContent = 'Enviando…';

    const nombreOrigen = tipoActual === 'local' ? `mesa ${mesaActual}` : clienteActual.trim();
    const origen = tipoActual === 'local'
        ? { tipo: 'local', mesa: mesaActual }
        : { tipo: tipoActual, mesa: clienteActual.trim(), cliente: clienteActual.trim(), direccion: direccionActual.trim(), telefono: telefonoActual.trim() };

    try {
        if (pedidoIdActual) {
            await actualizarItemsPedido(pedidoIdActual, itemsCarrito);
            toast(`Cambios guardados — ${nombreOrigen}`);
        } else {
            pedidoIdActual = await crearPedido(origen, itemsCarrito);
            toast(`Pedido enviado a cocina — ${nombreOrigen}`);
        }
        document.getElementById('comandaBanner').innerHTML =
            `Editando el pedido <strong>activo</strong> de ${esc(nombreOrigen)} · estado: <strong>pendiente</strong>`;
        if (tipoActual === 'domicilio') abrirModalDomicilio();
    } catch (err) {
        console.error('[mesero] Error al guardar el pedido:', err);
        toast('No se pudo guardar. Revisa tu conexión — se reintentará solo.', 'error');
    } finally {
        renderCarrito();
    }
}

/* ===== MODAL DE DATOS DE DOMICILIO ===================================
   Se muestra justo después de enviar (o actualizar) un pedido a
   domicilio, para que el mesero pueda pasarle al repartidor el nombre,
   teléfono y dirección sin tener que ir a buscarlos de nuevo — ya sea
   mandando una captura de la tarjeta o abriendo WhatsApp con el texto
   ya armado. */
function totalCarritoActual() {
    return itemsCarrito.reduce((a, it) => a + it.precio * it.cantidad, 0);
}

function datosDomicilioHTML() {
    return `
        <div class="domicilio-dato">
            <span class="domicilio-dato-lbl">Cliente</span>
            <span class="domicilio-dato-val">${esc(clienteActual.trim())}</span>
        </div>
        <div class="domicilio-dato">
            <span class="domicilio-dato-lbl">Teléfono</span>
            <span class="domicilio-dato-val">${esc(telefonoActual.trim())}</span>
        </div>
        <div class="domicilio-dato">
            <span class="domicilio-dato-lbl">Dirección</span>
            <span class="domicilio-dato-val">${esc(direccionActual.trim())}</span>
        </div>
        <div class="domicilio-dato">
            <span class="domicilio-dato-lbl">Total del pedido</span>
            <span class="domicilio-dato-val domicilio-dato-total">${money(totalCarritoActual())}</span>
        </div>`;
}

function abrirModalDomicilio() {
    const cont = document.getElementById('domicilioModalDatos');
    if (cont) cont.innerHTML = datosDomicilioHTML();
    document.getElementById('domicilioModal')?.classList.add('is-abierto');
    document.getElementById('domicilioModalBackdrop')?.classList.add('is-abierto');
}
function cerrarModalDomicilio() {
    document.getElementById('domicilioModal')?.classList.remove('is-abierto');
    document.getElementById('domicilioModalBackdrop')?.classList.remove('is-abierto');
}
document.getElementById('btnCerrarDomicilio')?.addEventListener('click', cerrarModalDomicilio);
document.getElementById('domicilioModalBackdrop')?.addEventListener('click', cerrarModalDomicilio);

/* Botón "Enviar a WhatsApp" — abre WhatsApp (app o web) con el texto ya
   armado, sin número fijo, para que el mesero elija al repartidor que
   corresponda desde su lista de contactos. */
document.getElementById('btnWhatsappDomicilio')?.addEventListener('click', () => {
    const texto = [
        '🛵 *Pedido a domicilio — La Hornilla de Zaid*',
        '',
        `👤 Cliente: ${clienteActual.trim()}`,
        `📞 Teléfono: ${telefonoActual.trim()}`,
        `📍 Dirección: ${direccionActual.trim()}`,
        `💵 Total: ${money(totalCarritoActual())}`
    ].join('\n');
    window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, '_blank');
});

/* Botón "Enviar captura" — genera una imagen de la tarjeta de datos con
   html2canvas. En celular, si el navegador soporta compartir archivos,
   abre directamente el panel nativo (WhatsApp incluido); si no,
   descarga la imagen para adjuntarla a mano. */
document.getElementById('btnCapturaDomicilio')?.addEventListener('click', async () => {
    const btn = document.getElementById('btnCapturaDomicilio');
    const tarjeta = document.querySelector('#domicilioModal .domicilio-modal-card');
    if (!tarjeta) return;
    if (typeof html2canvas === 'undefined') {
        toast('No se pudo cargar el generador de capturas', 'error');
        return;
    }
    const textoOriginal = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Generando…';
    try {
        const ocultar = tarjeta.querySelector('.btn-cerrar-domicilio');
        if (ocultar) ocultar.style.visibility = 'hidden';
        const canvas = await html2canvas(tarjeta, { backgroundColor: '#1d0c03', scale: 2 });
        if (ocultar) ocultar.style.visibility = '';
        canvas.toBlob(async blob => {
            if (!blob) { btn.disabled = false; btn.textContent = textoOriginal; return; }
            const nombreArchivo = `domicilio-${clienteActual.trim().replace(/\s+/g, '-') || 'pedido'}.png`;
            const archivo = new File([blob], nombreArchivo, { type: 'image/png' });
            try {
                if (navigator.canShare && navigator.canShare({ files: [archivo] })) {
                    await navigator.share({ files: [archivo], title: 'Datos de domicilio' });
                } else {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url; a.download = nombreArchivo;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    URL.revokeObjectURL(url);
                    toast('Captura descargada');
                }
            } catch (err) {
                if (err?.name !== 'AbortError') console.warn('[mesero] No se pudo compartir la captura:', err);
            } finally {
                btn.disabled = false;
                btn.textContent = textoOriginal;
            }
        }, 'image/png');
    } catch (err) {
        console.error('[mesero] Error al generar la captura:', err);
        toast('No se pudo generar la captura', 'error');
        btn.disabled = false;
        btn.textContent = textoOriginal;
    }
});

/* ===== INICIALIZACIÓN ================================================ */
document.addEventListener('DOMContentLoaded', () => {
    activarReconexionAutomatica();

    renderTipoPedido();
    renderOrigen();
    renderPills();
    renderCarrito();
    suscribirMenu();
    actualizarBotonNuevo();
    document.getElementById('comandaBanner').textContent = bannerInicial();

    const buscar = document.getElementById('menuBuscar');
    if (buscar) {
        let t;
        buscar.addEventListener('input', () => {
            clearTimeout(t);
            t = setTimeout(() => { termino = buscar.value.trim().toLowerCase(); renderMenu(); }, 120);
        });
    }

    document.getElementById('btnEnviarPedido')?.addEventListener('click', enviarPedido);
    document.getElementById('btnNuevaMesa')?.addEventListener('click', () => {
        if (itemsCarrito.length && !confirm('Se perderán los ítems no enviados. ¿Continuar?')) return;
        mesaActual = null; pedidoIdActual = null; itemsCarrito = [];
        clienteActual = ''; direccionActual = ''; telefonoActual = '';
        renderOrigen(); renderCarrito();
        document.getElementById('comandaBanner').textContent = bannerInicial();
    });
});
