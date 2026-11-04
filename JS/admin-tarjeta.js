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

/* ===================== MENSAJES DE WHATSAPP =====================
   Cortos a propósito: la imagen de la tarjeta lleva el resto. */
const primerNombre = n => String(n || '').trim().split(/\s+/)[0] || '';

function msgBienvenida(c) {
    const min = cfg.minimo > 0 ? ` de ${dinero(cfg.minimo)} o más` : '';
    return [
        `🤠🔥 ¡Hola ${primerNombre(c.nombre)}! Ya tienes tu *Tarjeta Hornilla*.`,
        `🌮 Cada pedido entregado${min} suma 1 sello. Con ${cfg.meta}, ¡${cfg.premio ? `*${cfg.premio}*` : 'tu premio'}! 🎁`,
        `👉 ${enlaceTarjeta(c.codigo)}`,
        `🔑 Tu código: *${c.codigo}*`
    ].join('\n');
}
function msgSello(c, t) {
    const n = primerNombre(c.nombre);
    if (t.gano) {
        return [
            `🎉 ¡Completaste tu tarjeta, ${n}!`,
            `🎁 Tu premio: ${cfg.premio ? `*${cfg.premio}*` : 'ya está listo'}`,
            `Para canjearlo escríbenos "canjear ${c.codigo}" o agrégalo al pedir.`,
            `👉 ${enlaceTarjeta(c.codigo)}`
        ].join('\n');
    }
    const faltan = cfg.meta - t.sellos;
    return [
        `🌮 ¡Sello ${t.sellos} de ${cfg.meta}, ${n}! Te ${faltan === 1 ? 'falta 1' : `faltan ${faltan}`} para tu premio 🎁`,
        `👉 ${enlaceTarjeta(c.codigo)}`
    ].join('\n');
}
function msgCanje(c, t) {
    const n = primerNombre(c.nombre);
    return `🎁 ¡Listo ${n}! Canjeamos tu premio${cfg.premio ? `: *${cfg.premio}*` : ''}. Tu tarjeta sigue en ${t.sellos} de ${cfg.meta} 🌮${t.premios > 0 ? ` (y te queda ${t.premios} premio${t.premios === 1 ? '' : 's'} más 🎉)` : ''}`;
}

/* ===================== IMAGEN DE LA TARJETA =====================
   Misma tarjeta de la web, dibujada en un canvas de 1080×1350 (formato
   WhatsApp). Cambia con los sellos, así que se manda una nueva cada vez. */
const FLAGS = ['#d9201f', '#f6ecd2', '#ffd21f', '#ff7a1a', '#d6e22b', '#e4007c'];
const LLAMA = new Path2D('M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z');
const REGALO = [
    new Path2D('M4 8h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z'),
    new Path2D('M12 8v13'),
    new Path2D('M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7'),
    new Path2D('M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5')
];
const LOGO_URL = '../Imagenes/IMG-20260215-WA0049.jpg.png';

function rrect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}
function texto(ctx, str, x, y, { fuente, color, sombra, espaciado = 0, ancho, align = 'center' }) {
    ctx.font = fuente; ctx.fillStyle = color; ctx.textAlign = align; ctx.textBaseline = 'alphabetic';
    if ('letterSpacing' in ctx) ctx.letterSpacing = espaciado + 'px';
    if (ancho) {   // reduce la letra hasta que quepa
        let px = parseInt(fuente.match(/(\d+)px/)[1], 10);
        while (ctx.measureText(str).width > ancho && px > 18) { px -= 2; ctx.font = fuente.replace(/\d+px/, px + 'px'); }
    }
    if (sombra) { ctx.fillStyle = sombra.color; ctx.fillText(str, x + sombra.dx, y + sombra.dy); ctx.fillStyle = color; }
    ctx.fillText(str, x, y);
    if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
}
function cargarImg(src) {
    return new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src; });
}

async function imagenTarjeta(codigo) {
    const t = tarjetas.get(codigo);
    const meta = cfg.meta;
    const sellos = Math.min(Number(t.sellos) || 0, meta);
    const premios = Number(t.premios) || 0;
    const faltan = meta - sellos;
    await Promise.all([document.fonts.load('120px Smokum'), document.fonts.load('60px Rye'), document.fonts.load('600 30px Oswald')]).catch(() => {});
    const logo = await cargarImg(LOGO_URL);

    const W = 1080, H = 1350;
    const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
    const ctx = cv.getContext('2d');

    /* Fondo noche de feria */
    ctx.fillStyle = '#0f2a0b'; ctx.fillRect(0, 0, W, H);
    const g = ctx.createRadialGradient(W / 2, 0, 50, W / 2, 0, 900);
    g.addColorStop(0, 'rgba(47,116,36,.55)'); g.addColorStop(1, 'rgba(47,116,36,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(214,231,166,.06)';
    for (let y = 9; y < H; y += 18) for (let x = 9; x < W; x += 18) { ctx.beginPath(); ctx.arc(x, y, 1.4, 0, 7); ctx.fill(); }

    /* Logo oficial, sin tocar (solo sombra suave) */
    if (logo) {
        const lh = 110, lw = lh * logo.width / logo.height;
        ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 16; ctx.shadowOffsetY = 6;
        ctx.drawImage(logo, (W - lw) / 2, 48, lw, lh); ctx.restore();
    }

    /* Tarjeta */
    const cx = 60, cy = 190, cw = 960, ch = 1010, cr = 44;
    ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 24;
    rrect(ctx, cx, cy, cw, ch, cr); ctx.fillStyle = '#f6ecd2'; ctx.fill(); ctx.restore();
    ctx.save(); rrect(ctx, cx, cy, cw, ch, cr); ctx.clip();

    /* Cabecera verde */
    const hh = 350;
    ctx.fillStyle = '#2f7424'; ctx.fillRect(cx, cy, cw, hh);
    const gh = ctx.createRadialGradient(cx, cy, 20, cx, cy, 700);
    gh.addColorStop(0, 'rgba(214,231,166,.25)'); gh.addColorStop(1, 'rgba(214,231,166,0)');
    ctx.fillStyle = gh; ctx.fillRect(cx, cy, cw, hh);
    ctx.fillStyle = 'rgba(255,255,255,.10)';
    for (let y = cy + 8; y < cy + hh; y += 16) for (let x = cx + 8; x < cx + cw; x += 16) { ctx.beginPath(); ctx.arc(x, y, 1.6, 0, 7); ctx.fill(); }

    /* Papel picado */
    ctx.strokeStyle = 'rgba(246,236,210,.55)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cx, cy + 20); ctx.quadraticCurveTo(cx + cw / 2, cy + 36, cx + cw, cy + 20); ctx.stroke();
    const n = 14, fw = cw / n;
    for (let i = 0; i < n; i++) {
        const x = cx + i * fw + 6, y = cy + 24, w = fw - 12, h = 78, rot = (i % 2 ? -4 : 3) * Math.PI / 180;
        ctx.save(); ctx.translate(x + w / 2, y); ctx.rotate(rot); ctx.translate(-w / 2, 0);
        ctx.fillStyle = FLAGS[i % FLAGS.length];
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(w, 0); ctx.lineTo(w, h);
        for (let k = 3; k >= 0; k--) { ctx.lineTo(w * (k + .5) / 4 + (k % 2 ? 0 : 0), h - 12); ctx.lineTo(w * k / 4, h); }
        ctx.closePath(); ctx.fill();
        ctx.fillStyle = 'rgba(15,42,11,.55)';
        ctx.beginPath(); ctx.moveTo(w / 2, 20); ctx.lineTo(w / 2 + 11, 34); ctx.lineTo(w / 2, 48); ctx.lineTo(w / 2 - 11, 34); ctx.closePath(); ctx.fill();
        ctx.restore();
    }

    texto(ctx, 'LA HORNILLA DE ZAID', W / 2, cy + 150, { fuente: '600 30px Oswald, sans-serif', color: '#f6ecd2', espaciado: 7 });
    texto(ctx, 'Tarjeta Hornilla', W / 2, cy + 262, { fuente: '124px Smokum, Rye, Georgia, serif', color: '#f6ecd2', sombra: { color: '#0f2a0b', dx: 5, dy: 5 } });
    /* Etiqueta roja con el nombre */
    const nombre = primerNombre(t.nombre).toUpperCase();
    ctx.font = '600 44px Oswald, sans-serif'; if ('letterSpacing' in ctx) ctx.letterSpacing = '4px';
    const lw = Math.max(200, ctx.measureText(nombre).width + 90); if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
    ctx.save(); ctx.translate(W / 2, cy + 306); ctx.rotate(-1 * Math.PI / 180);
    ctx.fillStyle = '#8f1210'; ctx.fillRect(-lw / 2, 6, lw, 62);
    ctx.fillStyle = '#d9201f'; ctx.fillRect(-lw / 2, 0, lw, 62);
    ctx.restore();
    texto(ctx, nombre, W / 2, cy + 306 + 46, { fuente: '600 44px Oswald, sans-serif', color: '#ffffff', espaciado: 4, ancho: 860 });

    /* Cuerpo: puntitos de papel */
    const by = cy + hh;
    ctx.fillStyle = 'rgba(47,116,36,.09)';
    for (let y = by + 8; y < cy + ch; y += 14) for (let x = cx + 8; x < cx + cw; x += 14) { ctx.beginPath(); ctx.arc(x, y, 1.3, 0, 7); ctx.fill(); }

    /* Sellos */
    const cols = meta <= 8 ? 4 : meta <= 10 ? 5 : 6, rows = Math.ceil(meta / cols);
    const rowH = Math.min(160, 330 / rows), cellW = (cw - 140) / cols, rad = Math.min(64, rowH * .39, cellW * .33);
    for (let i = 0; i < meta; i++) {
        const col = i % cols, row = Math.floor(i / cols);
        const x = cx + 70 + cellW * (col + .5), y = by + 122 + rowH * row;
        ctx.save(); ctx.translate(x, y);
        if (i < sellos) {
            ctx.rotate(-6 * Math.PI / 180);
            ctx.fillStyle = '#8f1210'; ctx.beginPath(); ctx.arc(0, 5, rad, 0, 7); ctx.fill();
            const gr = ctx.createLinearGradient(0, -rad, 0, rad); gr.addColorStop(0, '#e6332c'); gr.addColorStop(1, '#d9201f');
            ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(0, 0, rad, 0, 7); ctx.fill();
            ctx.strokeStyle = 'rgba(255,255,255,.22)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, 0, rad - 5, 0, 7); ctx.stroke();
            ctx.scale(rad * .9 / 12, rad * .9 / 12); ctx.translate(-12, -12);
            ctx.strokeStyle = '#fff'; ctx.lineWidth = 2.2; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke(LLAMA);
        } else {
            ctx.strokeStyle = 'rgba(20,20,20,.40)'; ctx.lineWidth = 4; ctx.setLineDash([11, 9]);
            ctx.beginPath(); ctx.arc(0, 0, rad, 0, 7); ctx.stroke(); ctx.setLineDash([]);
            if (i === meta - 1) {
                ctx.scale(rad * .8 / 12, rad * .8 / 12); ctx.translate(-12, -12);
                ctx.strokeStyle = 'rgba(20,20,20,.62)'; ctx.lineWidth = 1.8; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
                REGALO.forEach(p => ctx.stroke(p));
            } else {
                texto(ctx, String(i + 1), 0, rad * .32, { fuente: `${Math.round(rad * .62)}px Rye, Georgia, serif`, color: 'rgba(20,20,20,.55)' });
            }
        }
        ctx.restore();
    }

    /* Conteo */
    const yc = by + 122 + rowH * (rows - 1) + rad + 92;
    ctx.font = '84px Rye, Georgia, serif'; const wN = ctx.measureText(String(sellos)).width;
    ctx.font = '600 52px Oswald, sans-serif'; if ('letterSpacing' in ctx) ctx.letterSpacing = '3px';
    const resto = `DE ${meta} SELLOS`, wR = ctx.measureText(resto).width; if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
    const x0 = W / 2 - (wN + 24 + wR) / 2;
    texto(ctx, String(sellos), x0, yc, { fuente: '84px Rye, Georgia, serif', color: '#d9201f', align: 'left' });
    texto(ctx, resto, x0 + wN + 24, yc, { fuente: '600 52px Oswald, sans-serif', color: '#141414', espaciado: 3, align: 'left' });
    texto(ctx, premios > 0 ? '¡Ya tienes un premio disponible!' : faltan === 1 ? 'Te falta 1 sello para tu premio' : `Te faltan ${faltan} sellos para tu premio`,
        W / 2, yc + 50, { fuente: '500 34px Oswald, sans-serif', color: 'rgba(20,20,20,.78)' });

    /* Premio */
    if (cfg.premio) {
        const py = yc + 76;
        ctx.save(); ctx.setLineDash([12, 9]); ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(47,116,36,.6)';
        rrect(ctx, cx + 60, py, cw - 120, 100, 26); ctx.fillStyle = 'rgba(47,116,36,.09)'; ctx.fill(); ctx.stroke(); ctx.restore();
        texto(ctx, 'TU PREMIO', W / 2, py + 36, { fuente: '600 22px Oswald, sans-serif', color: '#18420f', espaciado: 5 });
        texto(ctx, cfg.premio, W / 2, py + 80, { fuente: '600 38px Poppins, Inter, sans-serif', color: '#141414', ancho: cw - 170 });
    }

    ctx.restore();

    /* Pie: código y delivery */
    texto(ctx, `Tu código: ${t.codigo}`, W / 2, 1268, { fuente: '38px Rye, Georgia, serif', color: '#ffd21f', espaciado: 2 });
    texto(ctx, 'Únicamente delivery en Sonsonate  ·  7099-1660', W / 2, 1318, { fuente: '600 28px Oswald, sans-serif', color: '#f6ecd2', espaciado: 2 });
    return cv;
}

const blobDe = (cv, tipo, q) => new Promise(r => cv.toBlob(r, tipo, q));

/* Manda mensaje + imagen: en celular abre el menú de compartir (eliges el chat);
   en compu copia la imagen, abre el chat con el texto y solo pegas con Ctrl+V. */
async function enviarConImagen(codigo, texto) {
    const c = datosCliente(codigo);
    const movil = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const ventana = movil ? null : window.open('', '_blank');
    let cv = null, file = null;
    try {
        cv = await imagenTarjeta(codigo);
        file = new File([await blobDe(cv, 'image/jpeg', .92)], `tarjeta-hornilla-${codigo}.jpg`, { type: 'image/jpeg' });
    } catch (err) { console.error(err); }

    if (movil && navigator.share) {
        try {
            if (file && navigator.canShare?.({ files: [file] })) await navigator.share({ files: [file], text: texto });
            else await navigator.share({ text: texto });
            return;
        } catch (err) { if (err?.name === 'AbortError') return; console.error(err); }
    }
    const url = `https://wa.me/${c.telefono}?text=${encodeURIComponent(texto)}`;
    let copiada = false;
    if (cv && window.ClipboardItem && navigator.clipboard?.write) {
        try { await navigator.clipboard.write([new ClipboardItem({ 'image/png': await blobDe(cv, 'image/png') })]); copiada = true; }
        catch (err) { console.error(err); }
    }
    if (!copiada && file) descargarArchivo(file);
    if (ventana) ventana.location.href = url; else window.open(url, '_blank', 'noopener');
    toast(copiada ? 'Imagen copiada: en el chat pégala con Ctrl+V (el texto ya viene escrito)' : 'Imagen descargada: arrástrala al chat de WhatsApp');
}

function descargarArchivo(file) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file); a.download = file.name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1500);
}
async function descargarImagenTarjeta() {
    if (!seleccion) return;
    try {
        const cv = await imagenTarjeta(seleccion);
        descargarArchivo(new File([await blobDe(cv, 'image/jpeg', .92)], `tarjeta-hornilla-${seleccion}.jpg`, { type: 'image/jpeg' }));
    } catch (err) { console.error(err); toast('No se pudo crear la imagen', 'bad'); }
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
        ${enviarMsg ? `<div class="tj-aviso"><b>Listo.</b> Avísale a ${esc(c.nombre || t.nombre)} con su tarjeta actualizada:
            <button type="button" class="btn-mini ok" data-act="avisar">Enviar por WhatsApp (imagen + mensaje)</button></div>` : ''}
        <div class="tj-acciones sec">
            <button type="button" class="btn-mini ok" data-act="bienvenida">Mandar su tarjeta (imagen + mensaje)</button>
            <button type="button" class="btn-mini" data-act="imagen">Descargar imagen</button>
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
        ({ sellar, canjear, quitar: quitarSello, borrar: borrarTarjeta, copiar: copiarEnlace, imagen: descargarImagenTarjeta,
           avisar: () => ultimoMensaje && enviarConImagen(ultimoMensaje.codigo, ultimoMensaje.texto),
           bienvenida: () => { const c = datosCliente(seleccion); enviarConImagen(seleccion, msgBienvenida(c)); },
           cerrar: () => { seleccion = null; renderLista(); renderDetalle(); } })[b.dataset.act]?.();
    });
}
