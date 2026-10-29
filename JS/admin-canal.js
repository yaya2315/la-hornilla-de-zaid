/* =====================================================================
   ADMIN-CANAL.JS — Publicaciones para el canal de WhatsApp (admin.html)
   • Plantillas guardadas en Firestore (canalPlantillas): título, texto
     con variables ({pedido}, {telefono}…) e imagen de la galería.
   • Imagen: de la galería fija (JS/canal-imagenes.js) o del celular en
     el momento (esa no se guarda en ningún lado).
   • "Compartir" abre el menú de compartir del teléfono con la imagen y
     el texto; además copia el texto por si WhatsApp no lo pega.
   • Historial (canalPublicaciones) para saber qué se publicó y cuándo.
   WhatsApp no permite publicar en canales de forma automática desde una
   página web: el último toque (elegir el canal y enviar) lo haces tú.
   ===================================================================== */

import { db, COLECCION, COLECCION_CANAL, COLECCION_CANAL_HIST } from './firebase-config.js';
import {
    collection, onSnapshot, doc, addDoc, updateDoc, deleteDoc, getDocs, serverTimestamp
} from 'https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js';
import { IMAGENES_CANAL, CARPETA_IMAGENES_CANAL } from './canal-imagenes.js';

const SITIO = 'https://yaya2315.github.io/la-hornilla-de-zaid/';
const CANAL_URL = 'https://whatsapp.com/channel/0029Vb8zxK1AjPXHdtwCnh0q';
const LIMITE_PIE_FOTO = 1024;   // WhatsApp corta el texto de una foto en ~1024 caracteres

const VARIABLES = {
    pedido:   { valor: SITIO + 'HTML/pedido.html', etiqueta: 'Link para pedir' },
    menu:     { valor: SITIO + 'HTML/menu.html',   etiqueta: 'Link del menú' },
    telefono: { valor: '7099-1660',                etiqueta: 'Teléfono' },
    whatsapp: { valor: 'https://wa.me/50370991660', etiqueta: 'Chat de WhatsApp' },
    web:      { valor: SITIO,                      etiqueta: 'Página web' },
};

/* Plantillas iniciales: se crean solas la primera vez (si no hay ninguna).
   Lo que va entre [corchetes] es para completar antes de publicar. */
const PLANTILLAS_BASE = [
    { titulo: 'Precios Charros', imagen: 'precios-charros.jpg', texto:
`🤠🔥 *¡PRECIOS CHARROS!* 🔥🤠

📅 Del 29 de octubre al 1 de noviembre

🌮 Pastor, suadero y pollo pastor: *$4.00* la orden
🌯 Birria y cochinita pibil: *$5.00* la orden

En tacos, burritos, tortas y quesadillas.

🛵 Únicamente delivery en Sonsonate
📲 Pide aquí: {pedido}
📞 {telefono}` },
    { titulo: 'Combo de la semana', imagen: '', texto:
`🔥 *COMBO DE LA SEMANA* 🔥

[Nombre del combo]
[Qué incluye]

💲 Solo *[precio]*
📅 Disponible: [días]

🛵 Únicamente delivery en Sonsonate
📲 Pide aquí: {pedido}` },
    { titulo: 'Ya estamos atendiendo', imagen: '', texto:
`👋 ¡Buenas! Ya estamos recibiendo pedidos 🌮

🕒 Hoy atendemos de [hora] a [hora]
🛵 Únicamente delivery en Sonsonate

📖 Mira el menú: {menu}
📲 Pide aquí: {pedido}
📞 {telefono}` },
    { titulo: 'Aviso: hoy no hay servicio', imagen: '', texto:
`📢 *AVISO*

Hoy [día] no tendremos servicio. [motivo]

Te esperamos [cuándo volvemos] 🙌
¡Gracias por tu comprensión!` },
    { titulo: 'Invitar al Club', imagen: '', texto:
`🎁 *¡Únete al Club La Hornilla!*

Regístrate gratis en nuestra página y recibe [beneficio del cupón].

👉 {web}#club` },
];

const $ = id => document.getElementById(id);
function esc(s = '') { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
function toast(texto, tipo = 'ok') {
    const t = $('toast');
    t.textContent = texto;
    t.className = 'toast show ' + tipo;
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => t.className = 'toast', 3200);
}
const fechaHora = ts => ts?.toDate
    ? ts.toDate().toLocaleString('es-SV', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' })
    : 'ahora';
const rutaImagen = archivo => CARPETA_IMAGENES_CANAL + encodeURIComponent(archivo);
const enGaleria = archivo => IMAGENES_CANAL.some(i => i.archivo === archivo);

/* ============================ ESTADO ============================ */
let plantillas = [];
let historial = [];
let editando = null;                 // id de la plantilla abierta (null = nueva)
let imagen = null;                   // {tipo:'galeria', archivo} | {tipo:'local', file, url} | null
let sembrado = false;

/* ========================= TEXTO Y VISTA ========================= */
function textoFinal() {
    return $('cTexto').value.replace(/\{(\w+)\}/g, (m, k) => VARIABLES[k] ? VARIABLES[k].valor : m);
}
function formatoWhatsApp(t) {
    return esc(t)
        .replace(/\*([^*\n]+)\*/g, '<b>$1</b>')
        .replace(/(^|[\s(])_([^_\n]+)_/g, '$1<i>$2</i>')
        .replace(/~([^~\n]+)~/g, '<s>$1</s>')
        .replace(/\n/g, '<br>');
}
const pendientes = () => [...new Set(textoFinal().match(/\[[^\]\n]{1,40}\]/g) || [])];

function actualizarVista() {
    const t = textoFinal();
    $('cPrevTexto').innerHTML = formatoWhatsApp(t) || '<span class="wa-vacio">Escribe el texto de la publicación…</span>';
    const img = $('cPrevImg');
    if (imagen) { img.src = imagen.tipo === 'galeria' ? rutaImagen(imagen.archivo) : imagen.url; img.classList.remove('hidden'); }
    else { img.removeAttribute('src'); img.classList.add('hidden'); }

    const largo = t.length;
    const tope = imagen ? LIMITE_PIE_FOTO : 4096;
    $('cContador').textContent = `${largo} / ${tope} caracteres`;
    $('cContador').classList.toggle('pasado', largo > tope);

    const faltan = pendientes();
    const avisos = [];
    if (faltan.length) avisos.push(`Te falta completar: ${faltan.join(', ')}`);
    if (largo > tope) avisos.push('El texto es muy largo para acompañar una foto; WhatsApp lo cortaría.');
    $('cAviso').textContent = avisos.join(' · ');

    const hayImg = !!imagen;
    $('cDescargar').disabled = !hayImg;
    $('cCopiarImg').disabled = !hayImg;
    $$galeria().forEach(b => {
        const sel = (b.dataset.img === '' && !imagen)
            || (imagen?.tipo === 'galeria' && b.dataset.img === imagen.archivo)
            || (imagen?.tipo === 'local' && b.dataset.img === '__local');
        b.setAttribute('aria-pressed', sel ? 'true' : 'false');
    });
}
const $$galeria = () => [...$('cGaleria').querySelectorAll('[data-img]')];

function pintarGaleria() {
    const local = imagen?.tipo === 'local' ? imagen.url : null;
    $('cGaleria').innerHTML = `
        <button type="button" class="gal-item gal-sin" data-img="" aria-pressed="false"><span>Sin imagen</span></button>
        ${IMAGENES_CANAL.map(i => `
            <button type="button" class="gal-item" data-img="${esc(i.archivo)}" aria-pressed="false" title="${esc(i.titulo)}">
                <img src="${rutaImagen(i.archivo)}" alt="${esc(i.titulo)}" loading="lazy">
            </button>`).join('')}
        <button type="button" class="gal-item gal-local" data-img="__local" aria-pressed="false">
            ${local ? `<img src="${local}" alt="Imagen del celular">` : '<span>＋<br>Del celular</span>'}
        </button>`;
}

/* ============================ MODAL ============================ */
function abrirEditor(p = null, textoInicial = null) {
    editando = p?.id || null;
    $('canalTitulo').textContent = p ? 'Publicar en el canal' : 'Nueva publicación';
    $('cTitulo').value = p?.titulo || '';
    $('cTexto').value = textoInicial ?? p?.texto ?? '';
    imagen = p?.imagen && enGaleria(p.imagen) ? { tipo: 'galeria', archivo: p.imagen } : null;
    $('cArchivo').value = '';
    $('cBorrar').classList.toggle('hidden', !editando);
    pintarGaleria();
    actualizarVista();
    $('modalCanalBg').classList.add('open');
    setTimeout(() => (p ? $('cCompartir') : $('cTitulo')).focus(), 50);
}
function cerrarEditor() {
    $('modalCanalBg').classList.remove('open');
    if (imagen?.tipo === 'local') URL.revokeObjectURL(imagen.url);
    imagen = null;
}

function insertarVariable(nombre) {
    const ta = $('cTexto');
    const ins = `{${nombre}}`;
    const ini = ta.selectionStart ?? ta.value.length, fin = ta.selectionEnd ?? ta.value.length;
    ta.value = ta.value.slice(0, ini) + ins + ta.value.slice(fin);
    ta.focus();
    ta.selectionStart = ta.selectionEnd = ini + ins.length;
    actualizarVista();
}

/* ============================ IMAGEN ============================ */
async function archivoImagen() {
    if (!imagen) return null;
    if (imagen.tipo === 'local') return imagen.file;
    const r = await fetch(rutaImagen(imagen.archivo));
    if (!r.ok) throw new Error('No se encontró la imagen');
    const blob = await r.blob();
    return new File([blob], imagen.archivo, { type: blob.type || 'image/jpeg' });
}

async function descargarImagen() {
    try {
        const f = await archivoImagen();
        if (!f) return;
        const a = document.createElement('a');
        a.href = URL.createObjectURL(f);
        a.download = f.name || 'publicacion-hornilla.jpg';
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(() => URL.revokeObjectURL(a.href), 1500);
    } catch (err) { console.error(err); toast('No se pudo descargar la imagen', 'bad'); }
}

async function copiarImagen() {
    try {
        const f = await archivoImagen();
        if (!f) return;
        const bmp = await createImageBitmap(f);
        const c = document.createElement('canvas');
        c.width = bmp.width; c.height = bmp.height;
        c.getContext('2d').drawImage(bmp, 0, 0);
        const png = await new Promise(r => c.toBlob(r, 'image/png'));
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': png })]);
        toast('Imagen copiada: pégala en WhatsApp con Ctrl+V');
    } catch (err) { console.error(err); toast('Tu navegador no deja copiar imágenes; usa Descargar', 'bad'); }
}

async function copiarTexto(silencioso = false) {
    try {
        await navigator.clipboard.writeText(textoFinal());
        if (!silencioso) toast('Texto copiado');
        return true;
    } catch {
        if (!silencioso) toast('No se pudo copiar; selecciona el texto y cópialo a mano', 'bad');
        return false;
    }
}

function confirmarPendientes() {
    const faltan = pendientes();
    if (!faltan.length) return true;
    return confirm(`Todavía hay partes sin completar: ${faltan.join(', ')}.\n\n¿Publicar de todos modos?`);
}

/* ============================ PUBLICAR ============================ */
async function compartir() {
    if (!$('cTexto').value.trim()) { toast('Escribe el texto primero', 'bad'); return; }
    if (!confirmarPendientes()) return;
    const texto = textoFinal();
    const copiado = await copiarTexto(true);
    let file = null;
    try { file = await archivoImagen(); } catch (err) { console.error(err); }

    if (!navigator.share) {
        toast(copiado ? 'Texto copiado. Descarga la imagen y pégalos en el canal.' : 'Usa Copiar texto y Descargar imagen', copiado ? 'ok' : 'bad');
        return;
    }
    try {
        if (file && navigator.canShare?.({ files: [file] })) await navigator.share({ files: [file], text: texto });
        else await navigator.share({ text: texto });
        await registrarPublicacion();
        toast('¡Listo! Si WhatsApp no pegó el texto, mantén presionado y pégalo: ya está copiado.');
    } catch (err) {
        if (err?.name === 'AbortError') return;      // la persona cerró el menú de compartir
        console.error(err);
        toast('No se pudo abrir WhatsApp; usa Copiar texto y Descargar imagen', 'bad');
    }
}

async function registrarPublicacion(manual = false) {
    try {
        const titulo = $('cTitulo').value.trim() || 'Publicación sin nombre';
        await addDoc(collection(db, COLECCION_CANAL_HIST), {
            titulo,
            plantillaId: editando || '',
            imagen: imagen?.tipo === 'galeria' ? imagen.archivo : (imagen ? 'del celular' : ''),
            texto: textoFinal().slice(0, 600),
            fecha: serverTimestamp(),
        });
        if (editando) await updateDoc(doc(db, COLECCION_CANAL, editando), { ultimaVez: serverTimestamp() });
        if (manual) toast('Marcada como publicada');
    } catch (err) {
        console.error(err);
        if (manual) toast('No se pudo guardar en el historial', 'bad');
    }
}

async function guardarPlantilla() {
    const titulo = $('cTitulo').value.trim();
    const texto = $('cTexto').value.trim();
    if (!titulo) { toast('Ponle un nombre a la plantilla', 'bad'); $('cTitulo').focus(); return; }
    if (!texto) { toast('La plantilla no tiene texto', 'bad'); $('cTexto').focus(); return; }
    const datos = {
        titulo, texto,
        imagen: imagen?.tipo === 'galeria' ? imagen.archivo : '',
        actualizado: serverTimestamp(),
    };
    $('cGuardar').disabled = true;
    try {
        if (editando) await updateDoc(doc(db, COLECCION_CANAL, editando), datos);
        else {
            const ref = await addDoc(collection(db, COLECCION_CANAL), { ...datos, orden: Date.now() });
            editando = ref?.id || null;
            $('cBorrar').classList.toggle('hidden', !editando);
        }
        toast(imagen?.tipo === 'local'
            ? 'Plantilla guardada (la foto del celular no se guarda; agrégala a la galería)'
            : 'Plantilla guardada');
    } catch (err) {
        console.error(err);
        toast('No se pudo guardar. Revisa las reglas de Firestore.', 'bad');
    } finally {
        $('cGuardar').disabled = false;
    }
}

async function borrarPlantilla(id) {
    const p = plantillas.find(x => x.id === id);
    if (!p || !confirm(`¿Borrar la plantilla "${p.titulo}"? El historial no se borra.`)) return false;
    try { await deleteDoc(doc(db, COLECCION_CANAL, id)); toast('Plantilla borrada'); return true; }
    catch (err) { console.error(err); toast('No se pudo borrar', 'bad'); return false; }
}

/* ===================== DESDE UNA PROMO DEL MENÚ ===================== */
const NOMBRE_DIA = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
function textoDias(dias = []) {
    const orden = [1, 2, 3, 4, 5, 6, 0].filter(d => dias.map(Number).includes(d));
    if (!orden.length) return '[días]';
    if (orden.length === 7) return 'todos los días';
    const idx = orden.map(d => [1, 2, 3, 4, 5, 6, 0].indexOf(d));
    const seguidos = idx.every((v, i) => i === 0 || v === idx[i - 1] + 1);
    if (seguidos && orden.length >= 3) return `${NOMBRE_DIA[orden[0]]} a ${NOMBRE_DIA[orden.at(-1)]}`;
    const n = orden.map(d => NOMBRE_DIA[d]);
    return n.length === 1 ? n[0] : `${n.slice(0, -1).join(', ')} y ${n.at(-1)}`;
}
function textoDesdePromo(p) {
    return `🔥 *${(p.nombre || '').toUpperCase()}* 🔥

${p.descripcion || '[Qué incluye]'}

💲 Precio: *${p.precio || '[precio]'}*
📅 Disponible: ${textoDias(p.dias)}

🛵 Únicamente delivery en Sonsonate
📲 Pide aquí: {pedido}
📞 {telefono}`;
}
async function abrirDesdePromo() {
    $('modalPromoCanalBg').classList.add('open');
    const lista = $('listaPromoCanal');
    lista.innerHTML = '<p class="loading" style="padding:20px">Cargando promociones…</p>';
    try {
        const snap = await getDocs(collection(db, COLECCION));
        const promos = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        lista.innerHTML = promos.length
            ? promos.map(p => `<button type="button" class="promo-elegir" data-id="${esc(p.id)}">
                    <b>${esc(p.nombre || 'Sin nombre')}</b><span>${esc(p.precio || '')} · ${esc(textoDias(p.dias))}</span></button>`).join('')
            : '<p class="campo-ayuda" style="margin:0">No hay promociones creadas en la pestaña Promociones.</p>';
        lista.onclick = e => {
            const b = e.target.closest('[data-id]');
            if (!b) return;
            const p = promos.find(x => x.id === b.dataset.id);
            $('modalPromoCanalBg').classList.remove('open');
            abrirEditor(null, textoDesdePromo(p));
            $('cTitulo').value = p.nombre || '';
        };
    } catch (err) {
        console.error(err);
        lista.innerHTML = '<p class="campo-ayuda" style="margin:0">No se pudieron cargar las promociones.</p>';
    }
}

/* ============================ LISTAS ============================ */
function resumen(t = '') {
    const plano = t.replace(/[*_~]/g, '').replace(/\{(\w+)\}/g, (m, k) => VARIABLES[k] ? `[${VARIABLES[k].etiqueta.toLowerCase()}]` : m).replace(/\s+/g, ' ').trim();
    return plano.length > 110 ? plano.slice(0, 110) + '…' : plano;
}
function renderPlantillas() {
    $('loadingCanal').classList.add('hidden');
    $('vacioCanal').classList.toggle('hidden', plantillas.length > 0);
    $('listaPlantillas').innerHTML = plantillas.map(p => {
        const img = p.imagen && enGaleria(p.imagen) ? rutaImagen(p.imagen) : '';
        return `<article class="canal-card">
            <button type="button" class="canal-thumb" data-pub="${esc(p.id)}" aria-label="Publicar ${esc(p.titulo)}">
                ${img ? `<img src="${img}" alt="" loading="lazy">` : '<span>Solo texto</span>'}
            </button>
            <div class="canal-info">
                <h3>${esc(p.titulo)}</h3>
                <p>${esc(resumen(p.texto))}</p>
                <small>${p.ultimaVez ? 'Última vez: ' + esc(fechaHora(p.ultimaVez)) : 'Aún no publicada'}</small>
            </div>
            <button type="button" class="btn-mini ok canal-pub" data-pub="${esc(p.id)}">Publicar</button>
        </article>`;
    }).join('');
}
function renderHistorial() {
    const ultimos = historial.slice(0, 8);
    $('vacioHist').classList.toggle('hidden', ultimos.length > 0);
    $('histCanal').innerHTML = ultimos.map(h => `
        <li><b>${esc(h.titulo || 'Publicación')}</b><span>${esc(fechaHora(h.fecha))}${h.imagen ? ' · con imagen' : ''}</span></li>`).join('');
}

async function sembrarPlantillas() {
    if (sembrado) return;
    sembrado = true;
    try {
        for (const [i, p] of PLANTILLAS_BASE.entries()) {
            await addDoc(collection(db, COLECCION_CANAL), { ...p, orden: i + 1, actualizado: serverTimestamp() });
        }
    } catch (err) { console.error('[canal] No se pudieron crear las plantillas base', err); }
}

/* ============================ ARRANQUE ============================ */
export function iniciarCanal() {
    $('btnAbrirCanal').href = CANAL_URL;

    $('cChips').innerHTML = Object.entries(VARIABLES)
        .map(([k, v]) => `<button type="button" class="chip-var" data-var="${k}">+ ${esc(v.etiqueta)}</button>`).join('');
    // "Copiar imagen" solo en computadora (en el celular se usa Compartir)
    const escritorio = window.matchMedia?.('(pointer: fine)').matches;
    $('cCopiarImg').classList.toggle('hidden', !(escritorio && window.ClipboardItem && navigator.clipboard?.write));

    onSnapshot(collection(db, COLECCION_CANAL), snap => {
        plantillas = snap.docs.map(d => ({ id: d.id, ...d.data() }))
            .sort((a, b) => (a.orden || 0) - (b.orden || 0));
        if (!plantillas.length && !snap.metadata?.fromCache) { sembrarPlantillas(); }
        renderPlantillas();
    }, err => {
        $('loadingCanal').textContent = 'No se pudieron cargar las plantillas. Revisa las reglas de Firestore (canalPlantillas).';
        console.error(err);
    });

    onSnapshot(collection(db, COLECCION_CANAL_HIST), snap => {
        historial = snap.docs.map(d => ({ id: d.id, ...d.data() }))
            .sort((a, b) => (b.fecha?.toMillis?.() || 0) - (a.fecha?.toMillis?.() || 0));
        renderHistorial();
    }, err => console.error(err));

    $('btnNuevaPub').addEventListener('click', () => abrirEditor());
    $('btnDesdePromo').addEventListener('click', abrirDesdePromo);
    $('listaPlantillas').addEventListener('click', e => {
        const b = e.target.closest('[data-pub]');
        if (b) abrirEditor(plantillas.find(p => p.id === b.dataset.pub));
    });

    $('cGaleria').addEventListener('click', e => {
        const b = e.target.closest('[data-img]');
        if (!b) return;
        if (b.dataset.img === '__local') { $('cArchivo').click(); return; }
        if (imagen?.tipo === 'local') URL.revokeObjectURL(imagen.url);
        imagen = b.dataset.img ? { tipo: 'galeria', archivo: b.dataset.img } : null;
        pintarGaleria();
        actualizarVista();
    });
    $('cArchivo').addEventListener('change', () => {
        const f = $('cArchivo').files?.[0];
        if (!f) return;
        if (!f.type.startsWith('image/')) { toast('Elige una imagen', 'bad'); return; }
        if (imagen?.tipo === 'local') URL.revokeObjectURL(imagen.url);
        imagen = { tipo: 'local', file: f, url: URL.createObjectURL(f) };
        pintarGaleria();
        actualizarVista();
    });

    $('cChips').addEventListener('click', e => {
        const b = e.target.closest('[data-var]');
        if (b) insertarVariable(b.dataset.var);
    });
    $('cTexto').addEventListener('input', actualizarVista);

    $('cCompartir').addEventListener('click', compartir);
    $('cCopiarTexto').addEventListener('click', () => copiarTexto());
    $('cDescargar').addEventListener('click', descargarImagen);
    $('cCopiarImg').addEventListener('click', copiarImagen);
    $('cMarcar').addEventListener('click', () => registrarPublicacion(true));
    $('cGuardar').addEventListener('click', guardarPlantilla);
    $('cBorrar').addEventListener('click', async () => { if (editando && await borrarPlantilla(editando)) cerrarEditor(); });
    $('cCerrar').addEventListener('click', cerrarEditor);
    $('modalCanalBg').addEventListener('click', e => { if (e.target === $('modalCanalBg')) cerrarEditor(); });

    $('btnCerrarPromoCanal').addEventListener('click', () => $('modalPromoCanalBg').classList.remove('open'));
    $('modalPromoCanalBg').addEventListener('click', e => { if (e.target === $('modalPromoCanalBg')) $('modalPromoCanalBg').classList.remove('open'); });
    document.addEventListener('keydown', e => {
        if (e.key !== 'Escape') return;
        if ($('modalPromoCanalBg').classList.contains('open')) $('modalPromoCanalBg').classList.remove('open');
        else if ($('modalCanalBg').classList.contains('open')) cerrarEditor();
    });
}
