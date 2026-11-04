/* =====================================================================
   ADMIN-TARJETA.JS — Sub-pestaña "Tarjeta" de Clientes (admin.html)
   ---------------------------------------------------------------------
   Tarjeta Hornilla = tarjeta de sellos 100 % digital (sin local físico).

   Cómo funciona:
   • El cliente pide su tarjeta por WhatsApp. Aquí se CREA (nombre +
     WhatsApp) y sale un código tipo HZ-K7M4QX y un enlace personal.
   • Cada pedido ENTREGADO se sella aquí con "+1 sello". Los sellos los
     pone SOLO el negocio: la web nunca suma ni descuenta sola.
   • Al completar los sellos queda un premio disponible. Se CANJEA aquí
     cuando el cliente lo pide (por WhatsApp o desde Pedir).

   Datos (Firestore):
   • tarjetas/{codigo}            público por id: primer nombre + conteo
   • tarjetas/{codigo}/movimientos solo admin: historial de cada acción
   • tarjetasClientes/{503XXXXXXXX} solo admin: nombre completo + WhatsApp
   • config/fidelidad             reglas editables (meta, mínimo, premio…)
   Reglas de Firestore: ver firestore.rules (se pegan a mano en la consola).
   ===================================================================== */

import { db, COLECCION_TARJETAS, COLECCION_TARJETAS_CLIENTES, COLECCION_CONFIG } from './firebase-config.js';
import {
    collection, onSnapshot, doc, getDoc, getDocs, query, orderBy, limit,
    runTransaction, writeBatch, setDoc, serverTimestamp
} from 'https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js';

const $ = id => document.getElementById(id);
const esc = (s = '') => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
function toast(texto, tipo = 'ok') {
    const t = $('toast');
    t.textContent = texto;
    t.className = 'toast show ' + tipo;
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => t.className = 'toast', 2800);
}
const telBonito = t => { const d = String(t || '').replace(/^503/, ''); return d.length === 8 ? `${d.slice(0, 4)}-${d.slice(4)}` : d; };
const fechaHora = ts => ts?.toDate
    ? ts.toDate().toLocaleString('es-SV', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' })
    : '—';
const dinero = n => '$' + (Number(n) || 0).toFixed(2);

/* Enlace público de la tarjeta (la página la genera web-react/) */
const SITIO = 'https://yaya2315.github.io/la-hornilla-de-zaid/';
const enlaceTarjeta = codigo => `${SITIO}HTML/tarjeta.html?c=${encodeURIComponent(codigo)}`;

/* Alfabeto sin I, L, O, 0 ni 1 para que nadie los confunda al dictarlo */
const ALFABETO = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
function generarCodigo() {
    let s = '';
    while (s.length < 6) {
        const b = crypto.getRandomValues(new Uint8Array(12));
        for (const n of b) {
            if (n < 248 && s.length < 6) s += ALFABETO[n % 31];   // 248 = 31 × 8 → sin sesgo
        }
    }
    return 'HZ-' + s;
}

/* WhatsApp: acepta 7099-1660, 70991660 o +503 7099-1660 → 50370991660 */
function normalizarTel(txt) {
    let d = String(txt || '').replace(/\D/g, '');
    if (d.length === 11 && d.startsWith('503')) d = d.slice(3);
    return /^[67]\d{7}$/.test(d) ? '503' + d : null;
}

/* ============================ ESTADO ============================ */
let cfg = { activo: false, meta: 8, minimo: 0, premio: '', condiciones: '' };
let tarjetas = new Map();   // codigo → datos públicos
let clientes = new Map();   // codigo → { nombre, telefono, ... }
let seleccion = null;       // código abierto en el panel
let ultimoMensaje = null;   // { tel, texto } del último sello/canje, para avisar por WhatsApp
let movimientos = [];

const premioTxt = () => cfg.premio || 'tu premio';

/* ============================ REGLAS ============================ */
async function cargarConfig() {
    try {
        const d = await getDoc(doc(db, COLECCION_CONFIG, 'fidelidad'));
        if (d.exists()) cfg = { ...cfg, ...d.data() };
    } catch (err) { console.error(err); }
    $('tjActivo').checked = !!cfg.activo;
    $('tjMeta').value = cfg.meta;
    $('tjMinimo').value = cfg.minimo || 0;
    $('tjPremio').value = cfg.premio || '';
    $('tjCondiciones').value = cfg.condiciones || '';
    pintarEstadoConfig();
}

function pintarEstadoConfig() {
    const chip = $('tjEstado');
    chip.textContent = cfg.activo ? 'Activa' : 'Apagada';
    chip.style.color = cfg.activo ? 'var(--ok)' : 'var(--muted)';
}

async function guardarConfig() {
    const activo = $('tjActivo').checked;
    const meta = parseInt($('tjMeta').value, 10);
    const minimo = parseFloat($('tjMinimo').value || '0');
    const premio = $('tjPremio').value.trim();
    const condiciones = $('tjCondiciones').value.trim();
    if (!Number.isInteger(meta) || meta < 2 || meta > 30) { toast('Los sellos del premio van de 2 a 30', 'bad'); return; }
    if (!Number.isFinite(minimo) || minimo < 0 || minimo > 100) { toast('El mínimo por pedido debe ser entre $0 y $100', 'bad'); return; }
    if (activo && !premio) { toast('Escribe el premio para activar la tarjeta', 'bad'); return; }
    if (activo && !condiciones) { toast('Agrega las condiciones (vigencia y límites)', 'bad'); return; }
    $('btnGuardarTj').disabled = true;
    try {
        const nuevo = { activo, meta, minimo, premio, condiciones };
        await setDoc(doc(db, COLECCION_CONFIG, 'fidelidad'), { ...nuevo, actualizado: serverTimestamp() });
        cfg = nuevo;
        pintarEstadoConfig();
        renderDetalle();
        toast(activo ? 'Tarjeta activa en la web' : 'Reglas guardadas (tarjeta apagada)');
    } catch (err) {
        console.error(err);
        toast('No se pudo guardar', 'bad');
    } finally {
        $('btnGuardarTj').disabled = false;
    }
}

/* ===================== MENSAJES DE WHATSAPP ===================== */
const CIERRE = '\n🛵 Únicamente delivery en Sonsonate\n📞 7099-1660';

function msgBienvenida(c) {
    return [
        `🤠🔥 ¡Hola ${c.nombre}! Ya tienes tu *Tarjeta Hornilla*.`,
        '',
        `🌮 Cada pedido entregado${cfg.minimo > 0 ? ` de ${dinero(cfg.minimo)} o más` : ''} suma *1 sello*.`,
        `🎁 Con *${cfg.meta} sellos* ganas: *${premioTxt()}*`,
        '',
        `👉 Tu tarjeta: ${enlaceTarjeta(c.codigo)}`,
        `🔑 Tu código: *${c.codigo}*`,
        '',
        '📲 Guárdala o toma captura. Para canjear, escríbenos aquí o agrega tu código al pedir en la web.',
        cfg.condiciones ? `📌 ${cfg.condiciones}` : '',
        CIERRE
    ].filter((l, i, a) => !(l === '' && a[i - 1] === '')).join('\n');
}
function msgSello(c, t) {
    if (t.gano) {
        return [
            `🎉 ¡Felicidades ${c.nombre}! Completaste tu tarjeta.`,
            `🎁 Ya tienes un premio disponible: *${premioTxt()}*`,
            '',
            `👉 Para canjearlo escríbenos "Quiero canjear mi tarjeta ${c.codigo}" o agrégalo en tu próximo pedido.`,
            `🔑 ${c.codigo}  ·  ${enlaceTarjeta(c.codigo)}`,
            CIERRE
        ].join('\n');
    }
    const faltan = cfg.meta - t.sellos;
    return [
        `🌮 ¡Gracias ${c.nombre}! Sumaste un sello.`,
        `Llevas *${t.sellos} de ${cfg.meta}*. Te ${faltan === 1 ? 'falta *1*' : `faltan *${faltan}*`} para tu premio 🎁`,
        '',
        `👉 Tu tarjeta: ${enlaceTarjeta(c.codigo)}`,
        CIERRE
    ].join('\n');
}
function msgCanje(c, t) {
    return [
        `🎁 ¡Listo ${c.nombre}! Canjeamos tu premio: *${premioTxt()}*`,
        `Tu tarjeta volvió a empezar: *${t.sellos} de ${cfg.meta}*${t.premios > 0 ? ` (y aún te queda ${t.premios} premio${t.premios === 1 ? '' : 's'} 🎉)` : ''}.`,
        '',
        `👉 ${enlaceTarjeta(c.codigo)}`,
        CIERRE
    ].join('\n');
}

/* ============================ LISTA ============================ */
function filas() {
    return [...tarjetas.values()].map(t => ({ ...t, ...(clientes.get(t.codigo) || {}), codigo: t.codigo, nombrePublico: t.nombre }));
}

function renderLista() {
    $('loadingTarjetas').classList.add('hidden');
    const q = $('tjBuscar').value.trim().toLowerCase();
    const qDig = q.replace(/\D/g, '');
    let items = filas().sort((a, b) => (b.actualizado?.toMillis?.() || 0) - (a.actualizado?.toMillis?.() || 0));
    $('cntTarjetas').textContent = items.length;
    if (q) {
        items = items.filter(t =>
            String(t.nombre || '').toLowerCase().includes(q) ||
            String(t.codigo || '').toLowerCase().includes(q) ||
            (qDig.length >= 3 && String(t.telefono || '').includes(qDig)));
    }
    $('vacioTarjetas').classList.toggle('hidden', items.length > 0);
    $('vacioTarjetas').querySelector('p').textContent = tarjetas.size
        ? 'No hay tarjetas que coincidan con tu búsqueda.'
        : 'Crea la primera con “Nueva tarjeta”.';
    $('tjLista').innerHTML = items.map(t => `
        <button type="button" class="tj-fila${t.codigo === seleccion ? ' sel' : ''}" data-abrir="${esc(t.codigo)}">
            <span class="tj-fila-nom">${esc(t.nombre || '—')}<small>${esc(telBonito(t.telefono))} · ${esc(t.codigo)}</small></span>
            <span class="tj-fila-prog">${Number(t.sellos) || 0}/${cfg.meta}</span>
            ${t.premios > 0 ? `<span class="tj-badge">🎁 ${t.premios}</span>` : ''}
        </button>`).join('');
}

/* ============================ DETALLE ============================ */
function puntos(sellos) {
    let h = '';
    for (let i = 1; i <= cfg.meta; i++) h += `<i class="tj-punto${i <= sellos ? ' on' : ''}"></i>`;
    return h;
}

function renderDetalle() {
    const caja = $('tjDetalle');
    const t = seleccion && tarjetas.get(seleccion);
    if (!t) { caja.classList.add('hidden'); caja.innerHTML = ''; return; }
    const c = clientes.get(t.codigo) || {};
    const enviarMsg = ultimoMensaje && ultimoMensaje.codigo === t.codigo ? ultimoMensaje : null;
    /* Si llega un cambio en vivo mientras escribes, no se borra lo que tecleaste */
    const previo = { tjTotal: $('tjTotal')?.value ?? '', tjNota: $('tjNota')?.value ?? '', foco: document.activeElement?.id };
    caja.classList.remove('hidden');
    caja.innerHTML = `
        <div class="tj-cab">
            <div>
                <h3>${esc(c.nombre || t.nombre)}</h3>
                <p class="tj-sub"><a href="https://wa.me/${esc(c.telefono || '')}" target="_blank" rel="noopener">${esc(telBonito(c.telefono))}</a> · <b>${esc(t.codigo)}</b></p>
            </div>
            <button type="button" class="btn-mini" data-act="cerrar" aria-label="Cerrar tarjeta">✕</button>
        </div>
        <div class="tj-prog" role="img" aria-label="${Number(t.sellos) || 0} de ${cfg.meta} sellos">${puntos(Number(t.sellos) || 0)}</div>
        <p class="tj-num"><b>${Number(t.sellos) || 0}</b> de ${cfg.meta} sellos
            ${t.premios > 0 ? `<span class="tj-badge grande">🎁 ${t.premios} premio${t.premios === 1 ? '' : 's'} disponible${t.premios === 1 ? '' : 's'}</span>` : ''}
            <span class="tj-sub"> · ${Number(t.canjes) || 0} canje${Number(t.canjes) === 1 ? ' hecho' : 's hechos'}</span></p>

        <div class="field-row">
            <div class="field">
                <label for="tjTotal">Total del pedido ($)${cfg.minimo > 0 ? ` — mínimo ${dinero(cfg.minimo)}` : ' (opcional)'}</label>
                <input type="number" id="tjTotal" inputmode="decimal" min="0" step="0.01" placeholder="${cfg.minimo > 0 ? dinero(cfg.minimo) : '0.00'}">
            </div>
            <div class="field">
                <label for="tjNota">Nota o # de pedido (opcional)</label>
                <input type="text" id="tjNota" maxlength="60" placeholder="Ej. 2 tacos + horchata">
            </div>
        </div>
        <div class="tj-acciones">
            <button type="button" class="btn btn-primary" data-act="sellar"${cfg.activo ? '' : ' disabled title="Activa la tarjeta en Reglas"'}>+1 sello</button>
            <button type="button" class="btn btn-ghost" data-act="canjear"${t.premios > 0 ? '' : ' disabled'}>Canjear premio</button>
            <button type="button" class="btn-mini" data-act="quitar">− Quitar 1 sello (corregir)</button>
        </div>
        ${enviarMsg ? `<div class="tj-aviso"><b>Listo.</b> Avísale a ${esc(c.nombre || t.nombre)}:
            <a class="btn-mini ok" target="_blank" rel="noopener" href="https://wa.me/${esc(enviarMsg.tel)}?text=${encodeURIComponent(enviarMsg.texto)}">Avisar por WhatsApp ↗</a></div>` : ''}
        <div class="tj-acciones sec">
            <a class="btn-mini ok" target="_blank" rel="noopener" href="https://wa.me/${esc(c.telefono || '')}?text=${encodeURIComponent(msgBienvenida({ nombre: c.nombre || t.nombre, codigo: t.codigo }))}">Mandar su tarjeta por WhatsApp ↗</a>
            <button type="button" class="btn-mini" data-act="copiar">Copiar enlace</button>
            <button type="button" class="btn-mini bad" data-act="borrar">Borrar tarjeta y datos</button>
        </div>
        <h4 class="tj-h4">Últimos movimientos</h4>
        <ul class="tj-mov" id="tjMov">${renderMovs()}</ul>`;
    $('tjTotal').value = previo.tjTotal;
    $('tjNota').value = previo.tjNota;
    if (previo.foco === 'tjTotal' || previo.foco === 'tjNota') $(previo.foco).focus();
}

function renderMovs() {
    if (!movimientos.length) return '<li class="tj-sub">Sin movimientos todavía.</li>';
    const nom = { sello: '+1 sello', canje: 'Canje de premio', ajuste: 'Corrección (−1 sello)' };
    return movimientos.map(m => `<li><b>${nom[m.tipo] || esc(m.tipo)}</b>
        ${m.total != null ? ` · pedido ${dinero(m.total)}` : ''}${m.nota ? ` · ${esc(m.nota)}` : ''}
        <span class="tj-sub"> · ${fechaHora(m.creado)}</span></li>`).join('');
}

async function cargarMovs(codigo) {
    try {
        const s = await getDocs(query(collection(db, COLECCION_TARJETAS, codigo, 'movimientos'), orderBy('creado', 'desc'), limit(8)));
        movimientos = s.docs.map(d => d.data());
    } catch (err) { console.error(err); movimientos = []; }
    if (seleccion === codigo) { const ul = $('tjMov'); if (ul) ul.innerHTML = renderMovs(); }
}

function abrir(codigo) {
    seleccion = codigo;
    movimientos = [];
    renderLista();
    renderDetalle();
    cargarMovs(codigo);
    $('tjDetalle').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ============================ ACCIONES ============================ */
function datosCliente(codigo) {
    const t = tarjetas.get(codigo) || {};
    const c = clientes.get(codigo) || {};
    return { codigo, nombre: c.nombre || t.nombre || '', telefono: c.telefono || '' };
}

async function sellar() {
    const codigo = seleccion;
    if (!codigo) return;
    const totalTxt = $('tjTotal').value.trim();
    const total = totalTxt === '' ? null : parseFloat(totalTxt);
    const nota = $('tjNota').value.trim().slice(0, 60);
    const min = Number(cfg.minimo) || 0;
    if (total != null && (!Number.isFinite(total) || total < 0)) { toast('El total del pedido no es válido', 'bad'); return; }
    if (min > 0) {
        if (total == null) { toast(`Escribe el total del pedido (mínimo ${dinero(min)})`, 'bad'); return; }
        if (total < min && !confirm(`El pedido es de ${dinero(total)} y el mínimo es ${dinero(min)}. ¿Sellar de todos modos?`)) return;
    }
    const ref = doc(db, COLECCION_TARJETAS, codigo);
    const mov = doc(collection(ref, 'movimientos'));
    try {
        const r = await runTransaction(db, async tx => {
            const s = await tx.get(ref);
            if (!s.exists()) throw new Error('La tarjeta ya no existe');
            const d = s.data();
            let sellos = (Number(d.sellos) || 0) + 1;
            let premios = Number(d.premios) || 0;
            let gano = false;
            while (sellos >= cfg.meta) { sellos -= cfg.meta; premios += 1; gano = true; }
            tx.update(ref, { sellos, premios, sellosTotal: (Number(d.sellosTotal) || 0) + 1, actualizado: serverTimestamp() });
            tx.set(mov, { tipo: 'sello', total, nota, creado: serverTimestamp() });
            return { sellos, premios, gano };
        });
        const c = datosCliente(codigo);
        ultimoMensaje = { codigo, tel: c.telefono, texto: msgSello(c, r) };
        renderDetalle();
        toast(r.gano ? '¡Tarjeta completa! Premio disponible' : `Sello sumado: ${r.sellos} de ${cfg.meta}`);
        if ($('tjTotal')) $('tjTotal').value = '';
        if ($('tjNota')) $('tjNota').value = '';
        cargarMovs(codigo);
    } catch (err) {
        console.error(err);
        toast(err.message || 'No se pudo sellar', 'bad');
    }
}

async function canjear() {
    const codigo = seleccion;
    if (!codigo) return;
    const c = datosCliente(codigo);
    if (!confirm(`¿Canjear el premio de ${c.nombre}?\n\n${premioTxt()}\n\nSe descuenta 1 premio de su tarjeta. Esto no se puede deshacer.`)) return;
    const ref = doc(db, COLECCION_TARJETAS, codigo);
    const mov = doc(collection(ref, 'movimientos'));
    const nota = ($('tjNota')?.value || '').trim().slice(0, 60);
    try {
        const r = await runTransaction(db, async tx => {
            const s = await tx.get(ref);
            if (!s.exists()) throw new Error('La tarjeta ya no existe');
            const d = s.data();
            const premios = Number(d.premios) || 0;
            if (premios < 1) throw new Error('Esta tarjeta no tiene premios disponibles');
            tx.update(ref, { premios: premios - 1, canjes: (Number(d.canjes) || 0) + 1, actualizado: serverTimestamp() });
            tx.set(mov, { tipo: 'canje', premio: cfg.premio || '', nota, creado: serverTimestamp() });
            return { sellos: Number(d.sellos) || 0, premios: premios - 1 };
        });
        ultimoMensaje = { codigo, tel: c.telefono, texto: msgCanje(c, r) };
        renderDetalle();
        toast('Premio canjeado');
        cargarMovs(codigo);
    } catch (err) {
        console.error(err);
        toast(err.message || 'No se pudo canjear', 'bad');
    }
}

async function quitarSello() {
    const codigo = seleccion;
    if (!codigo) return;
    if (!confirm('¿Quitar 1 sello? Úsalo solo para corregir un error al sellar.')) return;
    const ref = doc(db, COLECCION_TARJETAS, codigo);
    const mov = doc(collection(ref, 'movimientos'));
    try {
        await runTransaction(db, async tx => {
            const s = await tx.get(ref);
            if (!s.exists()) throw new Error('La tarjeta ya no existe');
            const d = s.data();
            let sellos = Number(d.sellos) || 0;
            let premios = Number(d.premios) || 0;
            if (sellos > 0) sellos -= 1;
            else if (premios > 0) { premios -= 1; sellos = cfg.meta - 1; }   // deshace el sello que completó la tarjeta
            else throw new Error('La tarjeta ya está en 0');
            tx.update(ref, { sellos, premios, sellosTotal: Math.max(0, (Number(d.sellosTotal) || 0) - 1), actualizado: serverTimestamp() });
            tx.set(mov, { tipo: 'ajuste', nota: 'Se quitó 1 sello', creado: serverTimestamp() });
        });
        ultimoMensaje = null;
        toast('Sello quitado');
        cargarMovs(codigo);
    } catch (err) {
        console.error(err);
        toast(err.message || 'No se pudo corregir', 'bad');
    }
}

async function borrarTarjeta() {
    const codigo = seleccion;
    if (!codigo) return;
    const c = datosCliente(codigo);
    if (!confirm(`¿Borrar la tarjeta de ${c.nombre} y todos sus datos (nombre, WhatsApp, sellos e historial)?\n\nÚsalo cuando la persona pida eliminar sus datos. No se puede deshacer.`)) return;
    try {
        const movs = await getDocs(collection(db, COLECCION_TARJETAS, codigo, 'movimientos'));
        const lote = writeBatch(db);
        movs.docs.forEach(m => lote.delete(m.ref));
        lote.delete(doc(db, COLECCION_TARJETAS, codigo));
        if (c.telefono) lote.delete(doc(db, COLECCION_TARJETAS_CLIENTES, c.telefono));
        await lote.commit();
        seleccion = null;
        ultimoMensaje = null;
        renderDetalle();
        toast('Tarjeta y datos borrados');
    } catch (err) {
        console.error(err);
        toast('No se pudo borrar', 'bad');
    }
}

async function copiarEnlace() {
    if (!seleccion) return;
    try { await navigator.clipboard.writeText(enlaceTarjeta(seleccion)); toast('Enlace copiado'); }
    catch { toast('No se pudo copiar', 'bad'); }
}

/* ============================ CREAR ============================ */
async function crearTarjeta() {
    const nombre = $('tjNombre').value.trim().replace(/\s+/g, ' ');
    const tel = normalizarTel($('tjTelefono').value);
    if (nombre.length < 2 || nombre.length > 40) { toast('Escribe el nombre (2 a 40 letras)', 'bad'); return; }
    if (!tel) { toast('El WhatsApp debe tener 8 dígitos y empezar con 6 o 7', 'bad'); return; }
    if (!$('tjConsiente').checked) { toast('Confirma que la persona aceptó guardar sus datos', 'bad'); return; }

    $('btnCrearTj').disabled = true;
    try {
        /* ¿Ya tiene tarjeta? No se duplica: se abre la que existe */
        const previa = await getDoc(doc(db, COLECCION_TARJETAS_CLIENTES, tel));
        if (previa.exists()) {
            toast('Ese WhatsApp ya tiene tarjeta — te la abrí');
            abrir(previa.data().codigo);
            return;
        }
        let codigo = null;
        for (let i = 0; i < 6 && !codigo; i++) {
            const c = generarCodigo();
            const ya = await getDoc(doc(db, COLECCION_TARJETAS, c));
            if (!ya.exists()) codigo = c;
        }
        if (!codigo) throw new Error('No se pudo generar un código libre, intenta de nuevo');

        const primerNombre = nombre.split(' ')[0];
        const lote = writeBatch(db);
        lote.set(doc(db, COLECCION_TARJETAS, codigo), {
            codigo, nombre: primerNombre, sellos: 0, premios: 0, canjes: 0, sellosTotal: 0,
            creado: serverTimestamp(), actualizado: serverTimestamp()
        });
        lote.set(doc(db, COLECCION_TARJETAS_CLIENTES, tel), {
            codigo, nombre, telefono: tel,
            consentimiento: true,
            textoConsentimiento: 'La persona pidió su Tarjeta Hornilla y aceptó que se guarden su nombre y WhatsApp solo para llevar su tarjeta.',
            creado: serverTimestamp()
        });
        await lote.commit();

        $('tjNombre').value = '';
        $('tjTelefono').value = '';
        $('tjConsiente').checked = false;
        const c = { codigo, nombre: primerNombre, telefono: tel };
        ultimoMensaje = { codigo, tel, texto: msgBienvenida(c) };
        toast('Tarjeta creada');
        /* El listado llega por onSnapshot; abrimos en cuanto aparezca */
        const esperar = setInterval(() => { if (tarjetas.has(codigo) && clientes.has(codigo)) { clearInterval(esperar); abrir(codigo); } }, 150);
        setTimeout(() => clearInterval(esperar), 4000);
    } catch (err) {
        console.error(err);
        toast(err.message || 'No se pudo crear la tarjeta', 'bad');
    } finally {
        $('btnCrearTj').disabled = false;
    }
}

/* ============================ ARRANQUE ============================ */
export function iniciarTarjeta() {
    cargarConfig();

    onSnapshot(collection(db, COLECCION_TARJETAS), snap => {
        tarjetas = new Map(snap.docs.map(d => [d.id, { codigo: d.id, ...d.data() }]));
        renderLista();
        renderDetalle();
    }, err => {
        $('loadingTarjetas').textContent = 'No se pudieron cargar las tarjetas. Revisa las reglas de Firestore.';
        console.error(err);
    });
    onSnapshot(collection(db, COLECCION_TARJETAS_CLIENTES), snap => {
        clientes = new Map(snap.docs.map(d => [d.data().codigo, { id: d.id, ...d.data() }]));
        renderLista();
        renderDetalle();
    }, err => console.error(err));

    $('btnGuardarTj').addEventListener('click', guardarConfig);
    $('btnCrearTj').addEventListener('click', crearTarjeta);
    $('tjBuscar').addEventListener('input', renderLista);
    $('tjLista').addEventListener('click', e => {
        const b = e.target.closest('[data-abrir]');
        if (b) abrir(b.dataset.abrir);
    });
    $('tjDetalle').addEventListener('click', e => {
        const b = e.target.closest('[data-act]');
        if (!b) return;
        ({ sellar, canjear, quitar: quitarSello, borrar: borrarTarjeta, copiar: copiarEnlace,
           cerrar: () => { seleccion = null; renderLista(); renderDetalle(); } })[b.dataset.act]?.();
    });
}
