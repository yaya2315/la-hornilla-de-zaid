/* =====================================================================
   PEDIDO.JS — Arma el pedido del cliente y genera el mensaje de WhatsApp
   ---------------------------------------------------------------------
   • El menú y las pupusas se leen de Firebase (misma fuente que
     cartas.js). Si Firebase falla, usa el respaldo de aquí abajo.
   • Las bebidas están fijas en BEBIDAS porque en el resto del sitio
     tampoco se manejan desde Firebase (igual que en menu.html).
   • REGLA DE LA PIÑA: solo las carnes cuyo nombre contiene "pastor"
     (Pastor, Pollo pastor) pueden llevar piña — ver tienePiña().
     La piña no tiene costo extra; si algún día se cobra aparte,
     ajusta PIÑA_EXTRA más abajo.
   • Para dar de alta una categoría nueva del menú principal que deba
     pedir carne, agrégala a CATEGORIAS_CARNE_GRUPO (si sus variantes
     ya son "Carne · Carne · Carne") o a CATEGORIAS_CARNE_APARTE (si
     sus variantes son tamaño y la carne va aparte, como la sopa).
   • COMBO DE LA SEMANA + CARNE: si el combo lleva un platillo con
     carne a elegir (quesadilla, torta, tacos, etc.), el admin marca
     "pideCarne" en el panel de promociones. Ese campo se guarda en
     Firebase junto con el resto del combo, pero SOLO esta página lo
     lee y muestra el selector de carne — promos.js (menu.html) lo
     ignora a propósito, así el menú público no cambia.
   ===================================================================== */

import { db, COLECCION, COLECCION_MENU, COLECCION_PUPUSAS, COLECCION_CATEGORIAS } from './firebase-config.js';
import { collection, getDocs }
    from 'https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js';
import { cargarBebidas } from './bebidas.js';

const WHATSAPP_NUM = '50370991660';
const PIÑA_EXTRA = 0;

/* ── Respaldo: solo se usa si Firebase aún no tiene datos o falla ──── */
const RESPALDO_MENU = {
    categorias: ['Tacos', 'Burrito', 'Tortas', 'Nachos', 'Quesadillas', 'Sopa de Tortilla', 'Lo nuevo'],
    platos: [
        { nombre: 'Tacos', categoria: 'Tacos', nota: 'Orden de 4', activo: true,
          variantes: [{ texto: 'Pastor · Pollo pastor · Suadero', precio: '$4.99' }, { texto: 'Cochinita pibil · Birria', precio: '$5.99' }] },
        { nombre: 'Burrito', categoria: 'Burrito', activo: true,
          variantes: [{ texto: 'Pastor · Pollo pastor · Suadero', precio: '$4.99' }, { texto: 'Cochinita pibil · Birria', precio: '$5.99' }] },
        { nombre: 'Tortas', categoria: 'Tortas', activo: true,
          variantes: [{ texto: 'Pastor · Pollo pastor · Suadero', precio: '$4.99' }, { texto: 'Cochinita pibil · Birria', precio: '$5.99' }] },
        { nombre: 'Nachos', categoria: 'Nachos', activo: true,
          variantes: [{ texto: 'Pastor · Pollo pastor · Suadero', precio: '$4.50' }, { texto: 'Cochinita pibil · Birria', precio: '$5.50' }] },
        { nombre: 'Quesadillas', categoria: 'Quesadillas', nota: 'Orden de 3', activo: true,
          variantes: [{ texto: 'Pastor · Pollo pastor · Suadero', precio: '$4.99' }, { texto: 'Cochinita pibil · Birria', precio: '$5.99' }] },
        { nombre: 'Sopa de Tortilla', categoria: 'Sopa de Tortilla', nota: 'Carne a elección', activo: true,
          variantes: [{ texto: 'Media (16 oz)', precio: '$3.00' }, { texto: 'Entera (32 oz)', precio: '$5.00' }] },
        { nombre: 'Papa Asada', categoria: 'Lo nuevo', destacado: true, etiqueta: 'Lo nuevo',
          descripcion: 'Base de papa asada con mezcla de queso gratinado y cheddar, crema, tu carne a elección, pico de gallo y un toque de salsa de aguacate.',
          precioUnico: '$5.50', activo: true }
    ]
};
const RESPALDO_PUPUSAS = {
    categorias: ['Especialidades', 'Tradicionales', 'Con un toque mexicano'],
    platos: [
        { nombre: 'Ayote', categoria: 'Especialidades', activo: true, variantes: [{ texto: 'c/u', precio: '$1.00' }] },
        { nombre: 'Mora', categoria: 'Especialidades', activo: true, variantes: [{ texto: 'c/u', precio: '$1.00' }] },
        { nombre: 'Queso', categoria: 'Especialidades', activo: true, variantes: [{ texto: 'c/u', precio: '$1.00' }] },
        { nombre: 'Queso con loroco', categoria: 'Especialidades', activo: true, variantes: [{ texto: 'c/u', precio: '$1.00' }] },
        { nombre: 'Ajo', categoria: 'Especialidades', activo: true, variantes: [{ texto: 'c/u', precio: '$1.00' }] },
        { nombre: 'Pollo', categoria: 'Especialidades', activo: true, variantes: [{ texto: 'c/u', precio: '$1.00' }] },
        { nombre: 'Chicharrón con queso', categoria: 'Especialidades', activo: true, variantes: [{ texto: 'c/u', precio: '$1.00' }] },
        { nombre: 'Frijol con queso', categoria: 'Tradicionales', activo: true, variantes: [{ texto: 'c/u', precio: '$0.35' }] },
        { nombre: 'Revueltas', categoria: 'Tradicionales', activo: true, variantes: [{ texto: 'c/u', precio: '$0.35' }] },
        { nombre: 'Birria con queso', categoria: 'Con un toque mexicano', activo: true,
          variantes: [{ texto: 'Acompañada de su caldo, cilantro y cebolla', precio: '$1.50' }] },
        { nombre: 'Pollo pastor con queso y piña', categoria: 'Con un toque mexicano', activo: true,
          variantes: [{ texto: 'Acompañada de cilantro y cebolla', precio: '$1.50' }] },
        { nombre: 'Pastor con queso y piña', categoria: 'Con un toque mexicano', activo: true,
          variantes: [{ texto: '', precio: '$1.50' }] }
    ]
};

/* Combo(s) de la semana: misma colección 'promociones' que lee promos.js
   en menu.html. Cualquier cambio hecho desde el admin (nombre, lo que
   lleva, precio, días o activo/inactivo) se refleja aquí también. */
const RESPALDO_COMBOS = [
    { nombre: "Combo Mega Quesadilla", descripcion: "1/2 Sopa de tortilla + Mega Quesadilla + Bebida.", precio: "$5.50", activa: true, dias: [2, 3, 4, 5], pideCarne: true },
    { nombre: "Combo Mini Torta",      descripcion: "1/2 Sopa de tortilla + Mini Torta + Bebida.",      precio: "$5.50", activa: true, dias: [2, 3, 4, 5], pideCarne: true }
];
const ORDEN_SEM_COMBO = [1, 2, 3, 4, 5, 6, 0];   // Lun → Dom
const NOMBRE_DIA = { 0: 'domingo', 1: 'lunes', 2: 'martes', 3: 'miércoles', 4: 'jueves', 5: 'viernes', 6: 'sábado' };

function textoDiasCombo(dias) {
    if (!Array.isArray(dias) || dias.length === 0 || dias.length >= 7) return 'todos los días';
    const arr = [...dias].sort((a, b) => ORDEN_SEM_COMBO.indexOf(a) - ORDEN_SEM_COMBO.indexOf(b));
    const idx = arr.map(d => ORDEN_SEM_COMBO.indexOf(d));
    const contiguo = idx.every((v, i) => i === 0 || v === idx[i - 1] + 1);
    if (contiguo && arr.length >= 3) return `${NOMBRE_DIA[arr[0]]} a ${NOMBRE_DIA[arr[arr.length - 1]]}`;
    if (arr.length === 1) return NOMBRE_DIA[arr[0]];
    return arr.slice(0, -1).map(d => NOMBRE_DIA[d]).join(', ') + ' y ' + NOMBRE_DIA[arr[arr.length - 1]];
}
function comboSeMuestraHoy(p, hoy) {
    if (p.activa !== true) return false;
    const dias = (Array.isArray(p.dias) && p.dias.length) ? p.dias : [0, 1, 2, 3, 4, 5, 6];
    return dias.includes(hoy);
}

/* Bebidas: se cargan desde Firebase con cargarBebidas() (bebidas.js),
   la misma fuente que usan menu.html y pupusas.html. */

const CATEGORIAS_CARNE_GRUPO = ['Tacos', 'Burrito', 'Tortas', 'Nachos', 'Quesadillas'];
const CATEGORIAS_CARNE_APARTE = ['Sopa de Tortilla'];
const CARNES_INDEPENDIENTES = ['Pastor', 'Pollo pastor', 'Suadero', 'Cochinita pibil', 'Birria'];
const ETIQUETAS_ENTREGA = { local: 'Comer en el local', delivery: 'Delivery', recoger: 'Para llevar (pasa a recogerlo)' };

function tienePiña(nombreCarne = '') { return nombreCarne.toLowerCase().includes('pastor'); }
function moneyParse(txt = '') { const n = parseFloat(String(txt).replace(/[^0-9.]/g, '')); return Number.isFinite(n) ? n : 0; }
function money(n) { return '$' + n.toFixed(2); }
function esc(s = '') { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

/* ── Estado ──────────────────────────────────────────────────────── */
let carrito = [];
let contador = 0;
let claveContador = 0;
let tipoEntrega = '';
const registro = new Map();

function cargarCarritoGuardado() {
    try {
        const raw = sessionStorage.getItem('hornilla_carrito');
        if (raw) {
            carrito = JSON.parse(raw);
            contador = carrito.reduce((m, l) => Math.max(m, l.id), 0);
        }
    } catch { /* si falla, empieza vacío */ }
}
function guardarCarrito() {
    try { sessionStorage.setItem('hornilla_carrito', JSON.stringify(carrito)); } catch { /* no crítico */ }
}

/* ── Carga de datos desde Firebase ─────────────────────────────────── */
/* En todas estas, se evita where()/orderBy() del lado del servidor:
   un documento sin el campo "orden" (por ejemplo agregado a mano desde
   la consola de Firebase) queda invisible si Firestore ordena, así que
   se trae todo y se filtra/ordena aquí mismo. */
function ordenar(lista) { return lista.sort((a, b) => (a.orden ?? Infinity) - (b.orden ?? Infinity)); }

async function cargarMenu() {
    try {
        const [catSnap, platoSnap] = await Promise.all([
            getDocs(collection(db, COLECCION_CATEGORIAS)),
            getDocs(collection(db, COLECCION_MENU))
        ]);
        const categorias = ordenar(catSnap.docs.map(d => d.data()).filter(c => c.menu === 'principal')).map(c => c.nombre);
        const platos = ordenar(platoSnap.docs.map(d => ({ id: d.id, ...d.data() })).filter(p => p.activo !== false));
        if (!categorias.length || !platos.length) return RESPALDO_MENU;
        return { categorias, platos };
    } catch (err) {
        console.warn('[pedido] No se pudo leer el menú de Firebase, uso respaldo:', err);
        return RESPALDO_MENU;
    }
}
async function cargarPupusas() {
    try {
        const [catSnap, platoSnap] = await Promise.all([
            getDocs(collection(db, COLECCION_CATEGORIAS)),
            getDocs(collection(db, COLECCION_PUPUSAS))
        ]);
        const categorias = ordenar(catSnap.docs.map(d => d.data()).filter(c => c.menu === 'pupusas')).map(c => c.nombre);
        const platos = ordenar(platoSnap.docs.map(d => ({ id: d.id, ...d.data() })).filter(p => p.activo !== false));
        if (!categorias.length || !platos.length) return RESPALDO_PUPUSAS;
        return { categorias, platos };
    } catch (err) {
        console.warn('[pedido] No se pudieron leer las pupusas de Firebase, uso respaldo:', err);
        return RESPALDO_PUPUSAS;
    }
}

async function cargarCombos() {
    try {
        const snap = await getDocs(collection(db, COLECCION));
        const combos = ordenar(snap.docs.map(d => d.data()));
        return combos.length ? combos : RESPALDO_COMBOS;
    } catch (err) {
        console.warn('[pedido] No se pudo leer el combo de Firebase, uso respaldo:', err);
        return RESPALDO_COMBOS;
    }
}

/* ── Clasificación de cada platillo ────────────────────────────────── */
function tipoDePlato(p) {
    if (p.destacado) return 'destacado';
    if (CATEGORIAS_CARNE_GRUPO.includes(p.categoria)) return 'carne-grupo';
    if (CATEGORIAS_CARNE_APARTE.includes(p.categoria)) return 'carne-aparte';
    return 'simple';
}

function crearTarjetaPlato(plato, tipoColeccion) {
    const tipo = tipoDePlato(plato);
    const key = `p${claveContador++}`;
    let opcionesPrecio;
    let necesitaCarne = false;

    if (tipo === 'destacado') {
        opcionesPrecio = [{ texto: '', precio: moneyParse(plato.precioUnico) }];
        necesitaCarne = /carne/i.test(plato.descripcion || '');
    } else if (tipo === 'carne-grupo') {
        /* Cada opción de precio YA es una carne específica (p. ej. "Pollo
           pastor — $4.99"), así que no se repite en un select aparte:
           la carne se toma directo del texto de la opción elegida. */
        opcionesPrecio = (plato.variantes || []).map(v => ({ texto: v.texto, precio: moneyParse(v.precio) }));
    } else if (tipo === 'carne-aparte') {
        opcionesPrecio = (plato.variantes || []).map(v => ({ texto: v.texto, precio: moneyParse(v.precio) }));
        necesitaCarne = true;
    } else {
        const vs = (plato.variantes && plato.variantes.length) ? plato.variantes : [{ texto: '', precio: '0' }];
        opcionesPrecio = vs.map(v => ({ texto: v.texto, precio: moneyParse(v.precio) }));
    }
    if (!opcionesPrecio.length) opcionesPrecio = [{ texto: '', precio: 0 }];

    registro.set(key, { plato, tipoColeccion, tipo, opcionesPrecio, necesitaCarne });
    return renderCardHTML(key, plato, tipo, tipoColeccion, opcionesPrecio, necesitaCarne);
}

const ETIQUETAS_SELECT_PRECIO = { 'carne-aparte': 'Tamaño', 'carne-grupo': 'Carnes' };

function renderCardHTML(key, plato, tipo, tipoColeccion, opcionesPrecio, necesitaCarne) {
    const mostrarSelectPrecio = opcionesPrecio.length > 1;
    const etiquetaSelectPrecio = ETIQUETAS_SELECT_PRECIO[tipo] || 'Opción';
    const nombreVisible = tipoColeccion === 'pupusas' ? `Pupusa de ${esc(plato.nombre)}` : esc(plato.nombre);
    const piñaPorOpcion = tipo === 'carne-grupo';

    return `
    <div class="pedido-card" data-key="${key}">
        <div class="pedido-card-head">
            <h3>${nombreVisible}</h3>
            ${plato.nota ? `<span class="pedido-nota">${esc(plato.nota)}</span>` : ''}
        </div>
        ${plato.descripcion ? `<p class="pedido-desc">${esc(plato.descripcion)}</p>` : ''}
        <div class="pedido-controles">
            ${mostrarSelectPrecio ? `
            <div class="campo-mini">
                <label>${etiquetaSelectPrecio}</label>
                <select class="sel-precio" data-key="${key}">
                    ${opcionesPrecio.map((o, i) => `<option value="${i}">${esc(o.texto)} — ${money(o.precio)}</option>`).join('')}
                </select>
            </div>` : ''}
            ${necesitaCarne ? `
            <div class="campo-mini">
                <label>Carne</label>
                <select class="sel-carne" data-key="${key}"></select>
            </div>
            <label class="chk-piña hidden" data-key="${key}">
                <input type="checkbox" class="chk-piña-input"> Con piña 🍍
            </label>` : ''}
            ${piñaPorOpcion ? `
            <label class="chk-piña hidden" data-key="${key}">
                <input type="checkbox" class="chk-piña-input"> Con piña 🍍
            </label>` : ''}
            <div class="stepper" data-key="${key}">
                <button type="button" class="stepper-btn" data-dir="-1" aria-label="Quitar uno">−</button>
                <span class="stepper-val">1</span>
                <button type="button" class="stepper-btn" data-dir="1" aria-label="Agregar uno">+</button>
            </div>
            <button type="button" class="btn-agregar" data-key="${key}">
                Agregar <span class="precio-actual">${money(opcionesPrecio[0].precio)}</span>
            </button>
        </div>
    </div>`;
}

function renderCombos(combos) {
    return combos.map((p, i) => {
        const key = `c${i}`;
        const precioNum = moneyParse(p.precio);
        const pideCarne = p.pideCarne === true;
        registro.set(key, { combo: p, precioNum, pideCarne });
        return `
        <section class="combo-week" data-key="${key}" aria-label="Promoción">
            <span class="combo-badge"><span class="dot"></span> Combo de la semana</span>
            <p class="combo-vigencia">Disponible: ${esc(textoDiasCombo(p.dias))}</p>
            <div class="combo-grid">
                <div>
                    <h2 class="combo-name">${esc(p.nombre)}</h2>
                    <p class="combo-desc">${esc(p.descripcion || '')}</p>
                </div>
                <div class="combo-price">
                    <small>Precio</small>
                    <span>${money(precioNum)}</span>
                </div>
            </div>
            <div class="pedido-controles combo-controles">
                ${pideCarne ? `
                <div class="campo-mini campo-mini--combo">
                    <label>Carne</label>
                    <select class="sel-carne" data-key="${key}"></select>
                </div>
                <label class="chk-piña hidden" data-key="${key}">
                    <input type="checkbox" class="chk-piña-input"> Con piña 🍍
                </label>` : ''}
                <div class="stepper" data-key="${key}">
                    <button type="button" class="stepper-btn" data-dir="-1" aria-label="Quitar uno">−</button>
                    <span class="stepper-val">1</span>
                    <button type="button" class="stepper-btn" data-dir="1" aria-label="Agregar uno">+</button>
                </div>
                <button type="button" class="btn-agregar" data-key="${key}">
                    Agregar al pedido <span class="precio-actual">${money(precioNum)}</span>
                </button>
            </div>
        </section>`;
    }).join('');
}

function renderBebidas(bebidas) {
    return bebidas.map((b, i) => {
        const key = `b${i}`;
        const precioNum = moneyParse(b.precio);
        registro.set(key, { bebida: b, precioNum });
        return `
        <div class="pedido-card pedido-card--bebida" data-key="${key}">
            <div class="pedido-card-head"><h3>${esc(b.nombre)}</h3></div>
            <div class="pedido-controles">
                <span class="precio-fijo">${money(precioNum)}</span>
                <div class="stepper" data-key="${key}">
                    <button type="button" class="stepper-btn" data-dir="-1" aria-label="Quitar uno">−</button>
                    <span class="stepper-val">1</span>
                    <button type="button" class="stepper-btn" data-dir="1" aria-label="Agregar uno">+</button>
                </div>
                <button type="button" class="btn-agregar btn-agregar--bebida" data-key="${key}">Agregar</button>
            </div>
        </div>`;
    }).join('');
}

/* ── Selects de carne dependientes del grupo / precio elegido ──────── */
function opcionesCarnePara() {
    return CARNES_INDEPENDIENTES;
}

function actualizarCarneSelect(key) {
    const info = registro.get(key);
    if (!info.necesitaCarne && !info.pideCarne) return;
    const selCarne = document.querySelector(`.sel-carne[data-key="${key}"]`);
    if (!selCarne) return;
    const opciones = opcionesCarnePara(key);
    selCarne.innerHTML = opciones.map(o => `<option value="${esc(o)}">${esc(o)}</option>`).join('');
    actualizarPiñaVisibilidad(key);
}

function actualizarPiñaVisibilidad(key) {
    const selCarne = document.querySelector(`.sel-carne[data-key="${key}"]`);
    const chk = document.querySelector(`.chk-piña[data-key="${key}"]`);
    if (!selCarne || !chk) return;
    const mostrar = tienePiña(selCarne.value);
    chk.classList.toggle('hidden', !mostrar);
    if (!mostrar) chk.querySelector('input').checked = false;
}

/* Para las tarjetas "carne-grupo": la carne ya viene en la opción de
   precio elegida (p. ej. "Pollo pastor"), así que la piña se decide
   directo desde ahí, sin un select de carne aparte. */
function actualizarPiñaVisibilidadPorOpcion(key) {
    const info = registro.get(key);
    const card = document.querySelector(`.pedido-card[data-key="${key}"]`);
    const chk = card ? card.querySelector('.chk-piña') : null;
    if (!info || !card || !chk) return;
    const selPrecio = card.querySelector('.sel-precio');
    const idx = selPrecio ? parseInt(selPrecio.value, 10) : 0;
    const carne = info.opcionesPrecio[idx].texto;
    const mostrar = tienePiña(carne);
    chk.classList.toggle('hidden', !mostrar);
    if (!mostrar) chk.querySelector('input').checked = false;
}

function actualizarPrecioActual(key) {
    const info = registro.get(key);
    const card = document.querySelector(`.pedido-card[data-key="${key}"]`);
    const selPrecio = card.querySelector('.sel-precio');
    const idx = selPrecio ? parseInt(selPrecio.value, 10) : 0;
    card.querySelector('.precio-actual').textContent = money(info.opcionesPrecio[idx].precio + PIÑA_EXTRA * 0);
}

/* ── Construcción del nombre legible de cada línea del pedido ──────── */
function construirNombreLinea(info, opcion, carne, piña) {
    const { plato, tipoColeccion, tipo } = info;
    const piñaTxt = piña ? ' con piña' : '';
    if (tipoColeccion === 'pupusas') return `Pupusa de ${plato.nombre}`;
    if (tipo === 'carne-grupo') return `${plato.nombre} de ${carne}${piñaTxt}`;
    if (tipo === 'carne-aparte') return `${plato.nombre} — ${opcion.texto} — de ${carne}${piñaTxt}`;
    if (tipo === 'destacado') return info.necesitaCarne ? `${plato.nombre} de ${carne}${piñaTxt}` : plato.nombre;
    return opcion.texto ? `${plato.nombre} — ${opcion.texto}` : plato.nombre;
}

/* ── Carrito ─────────────────────────────────────────────────────── */
function addLinea(nombre, precioUnitario, cantidad) {
    const existente = carrito.find(l => l.nombre === nombre && l.precioUnitario === precioUnitario);
    if (existente) existente.cantidad += cantidad;
    else carrito.push({ id: ++contador, nombre, precioUnitario, cantidad });
}

function agregarAlCarrito(key) {
    const info = registro.get(key);
    /* El contenedor exterior (.pedido-card o .combo-week) siempre es el
       primer elemento con este data-key en el orden del documento. */
    const card = document.querySelector(`[data-key="${key}"]`);
    const cantidad = parseInt(card.querySelector('.stepper-val').textContent, 10);

    if (info.bebida) {
        addLinea(info.bebida.nombre, info.precioNum, cantidad);
    } else if (info.combo) {
        let nombreCombo = info.combo.nombre;
        if (info.pideCarne) {
            const selCarne = card.querySelector('.sel-carne');
            const carne = selCarne ? selCarne.value : '';
            const chkInput = card.querySelector('.chk-piña-input');
            const piña = tienePiña(carne) && !!(chkInput && chkInput.checked);
            if (carne) nombreCombo = `${nombreCombo} — de ${carne}${piña ? ' con piña' : ''}`;
        }
        addLinea(nombreCombo, info.precioNum, cantidad);
    } else {
        const selPrecio = card.querySelector('.sel-precio');
        const idx = selPrecio ? parseInt(selPrecio.value, 10) : 0;
        const opcion = info.opcionesPrecio[idx];

        let carne = '', piña = false;
        if (info.necesitaCarne) {
            const selCarne = card.querySelector('.sel-carne');
            carne = selCarne.value;
            piña = tienePiña(carne) && card.querySelector('.chk-piña-input').checked;
        } else if (info.tipo === 'carne-grupo') {
            carne = opcion.texto;
            const chkInput = card.querySelector('.chk-piña-input');
            piña = tienePiña(carne) && !!(chkInput && chkInput.checked);
        }
        const nombreLinea = construirNombreLinea(info, opcion, carne, piña);
        addLinea(nombreLinea, opcion.precio, cantidad);
    }

    card.querySelector('.stepper-val').textContent = '1';
    guardarCarrito();
    renderCarrito();

    const btn = card.querySelector('.btn-agregar');
    btn.classList.add('is-added');
    setTimeout(() => btn.classList.remove('is-added'), 700);
}

function calcularSubtotal() { return carrito.reduce((s, l) => s + l.precioUnitario * l.cantidad, 0); }

function renderCarrito() {
    const wrap = document.getElementById('carritoLineas');
    const vacio = document.getElementById('carritoVacio');
    const vaciarBtn = document.getElementById('btnVaciar');

    if (!carrito.length) {
        wrap.innerHTML = '';
        vacio.classList.remove('hidden');
        vaciarBtn.classList.add('hidden');
    } else {
        vacio.classList.add('hidden');
        vaciarBtn.classList.remove('hidden');
        wrap.innerHTML = carrito.map(l => `
            <div class="carrito-linea">
                <div class="carrito-linea-info">
                    <span class="carrito-linea-cant">${l.cantidad}×</span>
                    <span class="carrito-linea-nombre">${esc(l.nombre)}</span>
                </div>
                <span class="carrito-linea-precio">${money(l.precioUnitario * l.cantidad)}</span>
                <button type="button" class="carrito-linea-quitar" data-id="${l.id}" aria-label="Quitar del pedido">
                    <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>
                </button>
            </div>`).join('');
    }

    document.getElementById('carritoSubtotal').textContent = money(calcularSubtotal());
    document.getElementById('btnContinuar').disabled = carrito.length === 0;

    const entregaVisible = !document.getElementById('entregaSection').classList.contains('hidden');
    if (entregaVisible) renderResumenEntrega();
}

/* ── Paso de entrega + resumen final ────────────────────────────── */
function renderResumenEntrega() {
    const subtotal = calcularSubtotal();
    const esLocal = tipoEntrega === 'local';
    const servicio = esLocal ? subtotal * 0.05 : 0;
    const total = subtotal + servicio;

    const nombre = document.getElementById('clienteNombre').value.trim();
    const direccion = document.getElementById('clienteDireccion').value.trim();

    document.getElementById('entregaResumen').innerHTML = `
        <div class="resumen-lineas">
            ${carrito.map(l => `
                <div class="resumen-linea"><span>${l.cantidad}× ${esc(l.nombre)}</span><span>${money(l.precioUnitario * l.cantidad)}</span></div>
            `).join('')}
        </div>
        <div class="resumen-totales">
            <div class="resumen-fila"><span>Subtotal</span><span>${money(subtotal)}</span></div>
            ${esLocal ? `<div class="resumen-fila"><span>Servicio en el local (5%)</span><span>+${money(servicio)}</span></div>` : ''}
            <div class="resumen-fila resumen-total"><span>Total estimado</span><span>${money(total)}</span></div>
        </div>`;

    const listo = carrito.length > 0 && !!tipoEntrega && !!nombre && (tipoEntrega !== 'delivery' || !!direccion);
    document.getElementById('btnEnviar').disabled = !listo;
}

function construirMensaje() {
    const subtotal = calcularSubtotal();
    const esLocal = tipoEntrega === 'local';
    const servicio = esLocal ? subtotal * 0.05 : 0;
    const total = subtotal + servicio;
    const nombre = document.getElementById('clienteNombre').value.trim();
    const direccion = document.getElementById('clienteDireccion').value.trim();

    const partes = [
        '¡Hola! Mucho gusto, este sería mi pedido:',
        '',
        ...carrito.map(l => `${l.cantidad} ${l.nombre} — ${money(l.precioUnitario * l.cantidad)}`),
        '',
        `Subtotal: ${money(subtotal)}`
    ];
    if (esLocal) partes.push(`Servicio en el local (5%): +${money(servicio)}`);
    partes.push(`Total estimado: ${money(total)}`);
    partes.push('');
    partes.push(`Tipo de pedido: ${ETIQUETAS_ENTREGA[tipoEntrega] || tipoEntrega}`);
    if (tipoEntrega === 'delivery') partes.push(`Dirección: ${direccion}`);
    partes.push('');
    partes.push(`Mi nombre es ${nombre}.`);
    return partes.join('\n');
}

/* ── Inicialización ─────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', async () => {
    cargarCarritoGuardado();
    renderCarrito();

    const cont = document.getElementById('pedidoMenu');
    const comboWrap = document.getElementById('pedidoCombo');
    const [menuData, pupusasData, combosData, bebidasData] = await Promise.all([
        cargarMenu(), cargarPupusas(), cargarCombos(), cargarBebidas()
    ]);

    const hoy = new Date().getDay();   // 0 = domingo … 6 = sábado
    const combosHoy = combosData.filter(p => comboSeMuestraHoy(p, hoy));
    if (combosHoy.length) {
        comboWrap.innerHTML = renderCombos(combosHoy);
        comboWrap.classList.add('has-combo');
    }

    let html = '';
    menuData.categorias.forEach(cat => {
        const platos = menuData.platos.filter(p => p.categoria === cat);
        if (!platos.length) return;
        html += `<div class="pedido-seccion"><h2>${esc(cat)}</h2><div class="pedido-grid">`;
        platos.forEach(p => { html += crearTarjetaPlato(p, 'menu'); });
        html += `</div></div>`;
    });

    html += `<div class="pedido-seccion"><h2>Pupusas</h2>`;
    pupusasData.categorias.forEach(cat => {
        const platos = pupusasData.platos.filter(p => p.categoria === cat);
        if (!platos.length) return;
        html += `<p class="pedido-subcategoria">${esc(cat)}</p><div class="pedido-grid">`;
        platos.forEach(p => { html += crearTarjetaPlato(p, 'pupusas'); });
        html += `</div>`;
    });
    html += `</div>`;

    html += `<div class="pedido-seccion"><h2>Bebidas</h2><div class="pedido-grid">${renderBebidas(bebidasData)}</div></div>`;

    cont.innerHTML = html;

    registro.forEach((info, key) => {
        if (info.necesitaCarne || info.pideCarne) actualizarCarneSelect(key);
        else if (info.tipo === 'carne-grupo') actualizarPiñaVisibilidadPorOpcion(key);
    });

    /* Eventos delegados sobre el contenedor del menú */
    cont.addEventListener('change', (e) => {
        const key = e.target.dataset.key;
        if (!key) return;
        if (e.target.classList.contains('sel-precio')) {
            actualizarPrecioActual(key);
            const info = registro.get(key);
            if (info.tipo === 'carne-grupo') actualizarPiñaVisibilidadPorOpcion(key);
        } else if (e.target.classList.contains('sel-carne')) {
            actualizarPiñaVisibilidad(key);
        }
    });

    function manejarClickCarta(e) {
        const stepBtn = e.target.closest('.stepper-btn');
        if (stepBtn) {
            const span = stepBtn.closest('.stepper').querySelector('.stepper-val');
            const val = Math.max(1, Math.min(20, parseInt(span.textContent, 10) + parseInt(stepBtn.dataset.dir, 10)));
            span.textContent = val;
            return;
        }
        const addBtn = e.target.closest('.btn-agregar');
        if (addBtn) agregarAlCarrito(addBtn.dataset.key);
    }
    cont.addEventListener('click', manejarClickCarta);
    comboWrap.addEventListener('click', manejarClickCarta);

    comboWrap.addEventListener('change', (e) => {
        const key = e.target.dataset.key;
        if (!key) return;
        if (e.target.classList.contains('sel-carne')) actualizarPiñaVisibilidad(key);
    });

    document.getElementById('carritoLineas').addEventListener('click', (e) => {
        const btn = e.target.closest('.carrito-linea-quitar');
        if (!btn) return;
        carrito = carrito.filter(l => l.id !== parseInt(btn.dataset.id, 10));
        guardarCarrito();
        renderCarrito();
    });

    document.getElementById('btnVaciar').addEventListener('click', () => {
        carrito = [];
        guardarCarrito();
        renderCarrito();
    });

    document.getElementById('btnContinuar').addEventListener('click', () => {
        const sec = document.getElementById('entregaSection');
        sec.classList.remove('hidden');
        renderResumenEntrega();
        sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.querySelectorAll('input[name="tipoEntrega"]').forEach(r => {
        r.addEventListener('change', () => {
            tipoEntrega = r.value;
            document.getElementById('campoDireccion').classList.toggle('hidden', tipoEntrega !== 'delivery');
            renderResumenEntrega();
        });
    });
    document.getElementById('clienteNombre').addEventListener('input', renderResumenEntrega);
    document.getElementById('clienteDireccion').addEventListener('input', renderResumenEntrega);

    document.getElementById('btnEnviar').addEventListener('click', () => {
        const mensaje = construirMensaje();
        const url = `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank', 'noopener');
    });
});