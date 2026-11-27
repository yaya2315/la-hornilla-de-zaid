/* =====================================================================
   IMPRESORA TÉRMICA X6h (Bluetooth) — tickets de La Hornilla
   ---------------------------------------------------------------------
   La X6h (app "Tiny Print") no entiende texto: imprime líneas de puntos
   blanco/negro de 384 de ancho (papel de 58 mm). Por eso aquí:
     1) dibujarTicket(pedido) arma el ticket en un <canvas>;
     2) canvasAPuntos() lo pasa a blanco y negro puro;
     3) imprimirCanvas() lo manda por Web Bluetooth.
   Protocolo (familia "tiny", tomado del proyecto abierto TiMini-Print):
     paquete = 51 78 | comando | 00 | largo (2 bytes, little endian) |
               datos | CRC-8 de los datos (polinomio 0x07) | FF
     A4 negrura · AF energía · BE modo (0 imagen) · BD velocidad/avance ·
     A2 línea cruda (48 bytes, bit 0 = punto de la izquierda, 1 = negro) ·
     BF línea comprimida (RLE) · A1 avance de papel · A3 estado.
   La impresora pide pausa/continúa por notificaciones (51 78 AE …).
   Solo funciona en Android con Chrome (Web Bluetooth). No usa Firebase.
   ===================================================================== */

export const ANCHO = 384;
const BYTES_LINEA = ANCHO / 8;

/* Servicios tipo "UART" que usan estas impresoras (el primero es el más común) */
const SERVICIOS = [
    '0000ae30-0000-1000-8000-00805f9b34fb', '0000ae3a-0000-1000-8000-00805f9b34fb',
    '0000ae00-0000-1000-8000-00805f9b34fb', '0000ae80-0000-1000-8000-00805f9b34fb',
    '0000ff00-0000-1000-8000-00805f9b34fb', '0000ab00-0000-1000-8000-00805f9b34fb',
    '49535343-fe7d-4ae5-8fa9-9fafd205e455',
];
const ESCRITURAS = ['0000ae01', '0000ae3b', '0000ae81', '0000ff02', '0000ab01', '49535343-8841'];
const LECTURAS = ['0000ae02', '0000ff01', '0000ff03', '0000ae04', '0000ae3c', '0000ab03', '49535343-1e4d'];
const PAUSA = '5178ae0101001070ff';
const CONTINUA = '5178ae0101000000ff';

export const hayBluetooth = () => typeof navigator !== 'undefined' && !!navigator.bluetooth;

/* ---------- Paquetes ---------- */
const TABLA_CRC = (() => {
    const t = new Uint8Array(256);
    for (let i = 0; i < 256; i++) {
        let c = i;
        for (let b = 0; b < 8; b++) c = (c & 0x80) ? ((c << 1) ^ 0x07) & 0xff : (c << 1) & 0xff;
        t[i] = c;
    }
    return t;
})();
function crc8(datos) { let c = 0; for (const b of datos) c = TABLA_CRC[(c ^ b) & 0xff]; return c; }

function paquete(cmd, datos = []) {
    const d = Uint8Array.from(datos);
    const out = new Uint8Array(8 + d.length);
    out.set([0x51, 0x78, cmd & 0xff, 0x00, d.length & 0xff, (d.length >> 8) & 0xff], 0);
    out.set(d, 6);
    out[6 + d.length] = crc8(d);
    out[7 + d.length] = 0xff;
    return out;
}

/* RLE de una línea: cada byte = color (bit 7) + cuántos puntos seguidos (1-127) */
function rle(linea) {
    const out = [];
    let previo = linea[0], cuenta = 1, hayNegro = previo === 1;
    const emitir = (color, n) => { while (n > 127) { out.push((color << 7) | 127); n -= 127; } if (n > 0) out.push((color << 7) | n); };
    for (let i = 1; i < linea.length; i++) {
        const p = linea[i];
        if (p) hayNegro = true;
        if (p === previo) cuenta++;
        else { emitir(previo, cuenta); previo = p; cuenta = 1; }
    }
    if (hayNegro || !out.length) emitir(previo, cuenta);
    return out;
}

function lineaCruda(linea) {
    const out = new Uint8Array(BYTES_LINEA);
    for (let x = 0; x < ANCHO; x++) if (linea[x]) out[x >> 3] |= 1 << (x & 7);
    return out;
}

/* Arma el trabajo completo de impresión a partir de una matriz de puntos (1 = negro) */
export function armarTrabajo(puntos, alto, { energia = 9500, velocidad = 10, comprimir = true } = {}) {
    const partes = [
        paquete(0xA4, [0x33]),                                   // negrura media (3 de 5)
        paquete(0xAF, [energia & 0xff, (energia >> 8) & 0xff]),  // energía del cabezal
        paquete(0xBE, [0x00]),                                   // modo imagen
        paquete(0xBD, [velocidad]),                              // velocidad
    ];
    for (let y = 0; y < alto; y++) {
        const linea = puntos.subarray(y * ANCHO, (y + 1) * ANCHO);
        const r = comprimir ? rle(linea) : null;
        partes.push(r && r.length <= BYTES_LINEA ? paquete(0xBF, r) : paquete(0xA2, lineaCruda(linea)));
        if ((y + 1) % 200 === 0) partes.push(paquete(0xBD, [velocidad]));
    }
    partes.push(paquete(0xBD, [0x00]), paquete(0xA1, [0x30, 0x00]), paquete(0xA1, [0x30, 0x00]),
        paquete(0xBD, [0x00]), paquete(0xA3, [0x00]));
    const total = partes.reduce((s, p) => s + p.length, 0);
    const out = new Uint8Array(total);
    let o = 0; for (const p of partes) { out.set(p, o); o += p.length; }
    return out;
}

/* ---------- Canvas → puntos ----------
   El texto se pasa con un corte simple (bordes lisos, sin "piquitos").
   Solo las zonas marcadas como foto (el logo) usan tramado de puntos. */
export function canvasAPuntos(canvas, zonasFoto = []) {
    const w = ANCHO, h = canvas.height;
    const d = canvas.getContext('2d').getImageData(0, 0, w, h).data;
    const lum = new Float32Array(w * h);
    for (let i = 0; i < w * h; i++) lum[i] = 0.299 * d[i * 4] + 0.587 * d[i * 4 + 1] + 0.114 * d[i * 4 + 2];
    const esFoto = (x, y) => zonasFoto.some(z => x >= z.x && x < z.x + z.w && y >= z.y && y < z.y + z.h);
    const puntos = new Uint8Array(w * h);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        const i = y * w + x;
        if (!esFoto(x, y)) { puntos[i] = lum[i] < 150 ? 1 : 0; continue; }
        const v = lum[i], n = v < 128 ? 0 : 255, e = v - n;
        puntos[i] = n === 0 ? 1 : 0;
        if (x + 1 < w && esFoto(x + 1, y)) lum[i + 1] += e * 7 / 16;
        if (y + 1 < h) {
            if (x > 0 && esFoto(x - 1, y + 1)) lum[i + w - 1] += e * 3 / 16;
            if (esFoto(x, y + 1)) lum[i + w] += e * 5 / 16;
            if (x + 1 < w && esFoto(x + 1, y + 1)) lum[i + w + 1] += e / 16;
        }
    }
    return puntos;
}

/* Muestra en pantalla exactamente lo que saldrá impreso */
export function pintarVista(canvas, puntos) {
    const ctx = canvas.getContext('2d');
    const img = ctx.createImageData(ANCHO, canvas.height);
    for (let i = 0; i < puntos.length; i++) {
        const v = puntos[i] ? 0 : 255;
        img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = v; img.data[i * 4 + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
}

/* ---------- Dibujo del ticket ---------- */
let fuentesListas = null;
function cargarFuentes(base) {
    if (!fuentesListas) {
        fuentesListas = Promise.all([
            new FontFace('OswaldTicket', `url(${base}enlaces/fuentes/oswald-700.woff2)`, { weight: '700' }).load(),
            new FontFace('OswaldTicket', `url(${base}enlaces/fuentes/oswald-600.woff2)`, { weight: '600' }).load(),
        ]).then(fs => fs.forEach(f => document.fonts.add(f))).catch(() => {});
    }
    return fuentesListas;
}
function cargarImagen(src) {
    return new Promise((ok, mal) => { const i = new Image(); i.onload = () => ok(i); i.onerror = mal; i.src = src; });
}

const dinero = n => (Math.round(n * 100) / 100).toFixed(2);

/**
 * pedido = { numero, tipo ('Mesa 3' / 'Para llevar' / 'Domicilio'), atendio, fecha (Date),
 *            items: [{ nombre, cant, precio }], ofertas: [texto], total? }
 * base = ruta a la raíz del sitio (p. ej. '../')
 * Devuelve { canvas, zonasFoto }
 */
export async function dibujarTicket(pedido, base = '../') {
    await cargarFuentes(base);
    const [logo, qr] = await Promise.all([
        cargarImagen(`${base}Imagenes/IMG-20260215-WA0049.jpg.png`),
        cargarImagen(`${base}Imagenes/ticket-qr-enlaces.svg`).catch(() => null),
    ]);
    const M = 14, F = 'OswaldTicket, Oswald, Arial, sans-serif';
    const cv = document.createElement('canvas');
    /* alto de sobra según lo que trae el pedido (luego se recorta a lo dibujado) */
    const largoItems = (pedido.items || []).reduce((s, it) => s + 40 + String(it.nombre || '').length * 3, 0);
    const largoOfertas = (pedido.ofertas || []).reduce((s, o) => s + 30 + String(o).length * 3, 0);
    cv.width = ANCHO; cv.height = 1500 + largoItems + largoOfertas;
    const ctx = cv.getContext('2d');
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, ANCHO, cv.height);
    ctx.fillStyle = '#000'; ctx.strokeStyle = '#000';
    const zonasFoto = [];
    let y = 8;
    const texto = (t, x, yy, f, al = 'left') => { ctx.font = f; ctx.textAlign = al; ctx.fillText(t, x, yy); };
    const raya = (yy, guion = true) => { ctx.lineWidth = 2; ctx.setLineDash(guion ? [6, 4] : []); ctx.beginPath(); ctx.moveTo(M, yy); ctx.lineTo(ANCHO - M, yy); ctx.stroke(); ctx.setLineDash([]); };
    const partir = (t, max, f) => {
        ctx.font = f; const ls = []; let l = '';
        for (const p of String(t).split(' ')) { const n = l ? l + ' ' + p : p; if (ctx.measureText(n).width > max && l) { ls.push(l); l = p; } else l = n; }
        if (l) ls.push(l); return ls;
    };

    /* Logo: letras blancas del PNG → negro; el horno queda en grises (luego se trama) */
    const lw = 300, lh = Math.round(lw * logo.height / logo.width);
    const tmp = document.createElement('canvas'); tmp.width = lw; tmp.height = lh;
    const tc = tmp.getContext('2d'); tc.drawImage(logo, 0, 0, lw, lh);
    const px = tc.getImageData(0, 0, lw, lh);
    for (let i = 0; i < px.data.length; i += 4) {
        const a = px.data[i + 3] / 255, l = 0.3 * px.data[i] + 0.59 * px.data[i + 1] + 0.11 * px.data[i + 2];
        const g = Math.round(255 * (1 - a) + (255 - l) * a);
        px.data[i] = px.data[i + 1] = px.data[i + 2] = g; px.data[i + 3] = 255;
    }
    tc.putImageData(px, 0, 0);
    const lx = Math.round((ANCHO - lw) / 2);
    ctx.drawImage(tmp, lx, y);
    zonasFoto.push({ x: lx, y, w: lw, h: lh });
    y += lh + 10;

    texto('La Hornilla de Zaid', ANCHO / 2, y += 24, `700 26px ${F}`, 'center');
    texto('Comida mexicana · Sonsonate', ANCHO / 2, y += 26, `600 19px ${F}`, 'center');
    texto('Pedidos y WhatsApp: 7099-1660', ANCHO / 2, y += 24, `600 18px ${F}`, 'center');
    y += 14; raya(y, false); y += 8;

    const f = pedido.fecha instanceof Date ? pedido.fecha : new Date();
    const dd = `${String(f.getDate()).padStart(2, '0')}/${String(f.getMonth() + 1).padStart(2, '0')}/${f.getFullYear()}`;
    const hh = `${String(f.getHours()).padStart(2, '0')}:${String(f.getMinutes()).padStart(2, '0')}`;
    if (pedido.numero) texto(`Pedido #${pedido.numero}`, M, y += 24, `700 20px ${F}`);
    else y += 24;
    if (pedido.tipo) texto(pedido.tipo, ANCHO - M, y, `700 20px ${F}`, 'right');
    if (pedido.atendio) texto(`Le atendió: ${pedido.atendio}`, M, y += 24, `600 18px ${F}`);
    texto(`Fecha: ${dd}`, M, y += 24, `600 18px ${F}`);
    texto(`Hora: ${hh}`, ANCHO - M, y, `600 18px ${F}`, 'right');
    y += 14;

    const xC = 226, xP = 290, xI = ANCHO - M;
    texto('Artículo', M, y += 22, `700 17px ${F}`); texto('Cant', xC, y, `700 17px ${F}`, 'right');
    texto('Precio', xP, y, `700 17px ${F}`, 'right'); texto('Importe', xI, y, `700 17px ${F}`, 'right');
    y += 8; raya(y); y += 4;
    let total = 0;
    for (const it of pedido.items || []) {
        const cant = Math.max(1, Number(it.cant) || 1), precio = Math.max(0, Number(it.precio) || 0), imp = cant * precio;
        total += imp;
        partir(it.nombre, xC - 40 - M, `600 18px ${F}`).forEach((l, k) => {
            texto(l, M, y += 23, `600 18px ${F}`);
            if (k === 0) {
                texto(String(cant), xC, y, `600 18px ${F}`, 'right');
                texto(dinero(precio), xP, y, `600 18px ${F}`, 'right');
                texto(dinero(imp), xI, y, `600 18px ${F}`, 'right');
            }
        });
        y += 4;
    }
    if (typeof pedido.total === 'number') total = pedido.total;
    y += 6; raya(y); y += 8;
    texto('TOTAL USD', M, y += 32, `700 28px ${F}`);
    texto(`$${dinero(total)}`, xI, y, `700 32px ${F}`, 'right');
    y += 12; raya(y, false); y += 6;

    texto('¡Gracias por tu visita!', ANCHO / 2, y += 34, `700 24px ${F}`, 'center');
    texto('Hecho al momento, a la hornilla.', ANCHO / 2, y += 24, `600 18px ${F}`, 'center');
    if (pedido.ofertas?.length) {
        y += 10;
        texto('PROMOS DE LA SEMANA', ANCHO / 2, y += 26, `700 18px ${F}`, 'center');
        for (const o of pedido.ofertas) for (const l of partir(o, ANCHO - 2 * M, `600 17px ${F}`)) texto(l, ANCHO / 2, y += 22, `600 17px ${F}`, 'center');
    }
    y += 14;
    if (qr) {
        const q = 128;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(qr, Math.round((ANCHO - q) / 2), y += 6, q, q);
        y += q;
        texto('Escanea: menú, pedidos y redes', ANCHO / 2, y += 24, `700 17px ${F}`, 'center');
    }
    texto('yaya2315.github.io/la-hornilla-de-zaid', ANCHO / 2, y += 22, `600 16px ${F}`, 'center');
    texto('IG @la_hornilla_de_zaid · TikTok @lahornilladezaid', ANCHO / 2, y += 21, `600 15px ${F}`, 'center');
    texto('Facebook: La Hornilla de Zaid', ANCHO / 2, y += 20, `600 15px ${F}`, 'center');
    y += 12; raya(y);
    texto('Comprobante de pedido · No es factura', ANCHO / 2, y += 24, `600 15px ${F}`, 'center');
    y += 24;

    /* recorta el lienzo a lo dibujado */
    const final = document.createElement('canvas');
    final.width = ANCHO; final.height = y;
    final.getContext('2d').drawImage(cv, 0, 0);
    return { canvas: final, zonasFoto };
}

/* ---------- Bluetooth ---------- */
let conexion = null; // { dispositivo, escritura, lectura, pausado, despertar }

export function conectada() { return !!conexion?.dispositivo?.gatt?.connected; }
export function nombreImpresora() { return conexion?.dispositivo?.name || ''; }

/**
 * Pide al usuario elegir la impresora (Chrome muestra la lista) y se conecta.
 * todas=true muestra todos los equipos Bluetooth por si el nombre no empieza con "X6".
 * Devuelve un informe con los servicios encontrados (útil para diagnosticar).
 */
export async function conectar({ todas = false, registro = () => {} } = {}) {
    if (!hayBluetooth()) throw new Error('Este navegador no tiene Bluetooth web. Usa Google Chrome en Android.');
    const opciones = todas
        ? { acceptAllDevices: true, optionalServices: SERVICIOS }
        : { filters: [{ namePrefix: 'X6' }, { namePrefix: 'X7' }, { services: [SERVICIOS[0]] }], optionalServices: SERVICIOS };
    const dispositivo = await navigator.bluetooth.requestDevice(opciones);
    registro(`Elegida: ${dispositivo.name || '(sin nombre)'}`);
    const servidor = await dispositivo.gatt.connect();
    registro('Conectada por Bluetooth.');
    const informe = [];
    let escritura = null, lectura = null;
    for (const uuid of SERVICIOS) {
        let servicio;
        try { servicio = await servidor.getPrimaryService(uuid); } catch { continue; }
        const caracs = await servicio.getCharacteristics();
        informe.push(`${uuid.slice(4, 8)}: ${caracs.map(c => c.uuid.slice(4, 8) + (c.properties.writeWithoutResponse ? '(w)' : c.properties.write ? '(W)' : '') + (c.properties.notify ? '(n)' : '')).join(' ')}`);
        /* Se revisan TODOS los servicios: la escritura y los avisos pueden estar en servicios distintos */
        let escrituraAqui = null, lecturaAqui = null;
        for (const c of caracs) {
            if (!escrituraAqui && ESCRITURAS.some(p => c.uuid.startsWith(p)) && (c.properties.writeWithoutResponse || c.properties.write)) escrituraAqui = c;
            if (!lecturaAqui && LECTURAS.some(p => c.uuid.startsWith(p)) && c.properties.notify) lecturaAqui = c;
        }
        if (!escritura && escrituraAqui) { escritura = escrituraAqui; if (lecturaAqui) lectura = lecturaAqui; }
        if (!lectura && lecturaAqui) lectura = lecturaAqui;
    }
    informe.forEach(l => registro('Servicio ' + l));
    if (!escritura) { dispositivo.gatt.disconnect(); throw new Error('No encontré por dónde mandarle datos a esta impresora.'); }
    conexion = { dispositivo, escritura, lectura, pausado: false, despertar: null };
    if (lectura) {
        try { await lectura.startNotifications(); }
        catch (e) { registro('Sin avisos de pausa (' + e.message + '): se imprimirá más despacio.'); lectura = null; conexion.lectura = null; }
    }
    if (lectura) {
        lectura.addEventListener('characteristicvaluechanged', e => {
            const v = e.target.value;
            const hex = [...new Uint8Array(v.buffer, v.byteOffset, v.byteLength)].map(b => b.toString(16).padStart(2, '0')).join('');
            if (hex.includes(PAUSA)) conexion.pausado = true;
            if (hex.includes(CONTINUA)) { conexion.pausado = false; conexion.despertar?.(); }
        });
    }
    dispositivo.addEventListener('gattserverdisconnected', () => { registro('La impresora se desconectó.'); });
    registro(`Lista para imprimir (escritura ${escritura.uuid.slice(4, 8)}${lectura ? ', avisos ' + lectura.uuid.slice(4, 8) : ''}).`);
    return informe;
}

const dormir = ms => new Promise(r => setTimeout(r, ms));

async function escribir(trozo) {
    const c = conexion.escritura;
    if (c.properties.writeWithoutResponse) await c.writeValueWithoutResponse(trozo);
    else await c.writeValueWithResponse(trozo);
}

/** Manda bytes en trozos, respetando las pausas que pide la impresora */
export async function enviar(bytes, { trozo = 180, pausaMs, progreso = () => {} } = {}) {
    if (!conectada()) throw new Error('Primero conecta la impresora.');
    let tam = trozo;
    /* sin avisos de pausa no hay control de flujo: se manda más despacio */
    const espera = pausaMs ?? (conexion.lectura ? 6 : 25);
    conexion.pausado = false;
    for (let o = 0; o < bytes.length;) {
        const inicioPausa = Date.now();
        while (conexion.pausado) {
            if (!conectada()) throw new Error('La impresora se desconectó a mitad del ticket.');
            if (Date.now() - inicioPausa > 60000) { conexion.pausado = false; break; } // por si nunca llega "continúa"
            await Promise.race([new Promise(r => { conexion.despertar = r; }), dormir(1000)]);
        }
        if (!conectada()) throw new Error('La impresora se desconectó a mitad del ticket.');
        const parte = bytes.subarray(o, Math.min(o + tam, bytes.length));
        try {
            await escribir(parte);
        } catch (e) {
            // Un solo reintento con trozos chicos (algunos teléfonos no aceptan grandes); si sigue fallando, se avisa.
            if (tam > 20 && conectada()) { tam = 20; continue; }
            throw e;
        }
        o += parte.length;
        progreso(o / bytes.length);
        await dormir(espera);
    }
}

/** Atajo: dibuja → pasa a puntos → arma → envía */
export async function imprimirCanvas(canvas, zonasFoto = [], opciones = {}) {
    const puntos = canvasAPuntos(canvas, zonasFoto);
    const trabajo = armarTrabajo(puntos, canvas.height, opciones);
    await enviar(trabajo, opciones);
}
