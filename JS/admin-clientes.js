/* =====================================================================
   ADMIN-CLIENTES.JS — Pestaña "Clientes" del panel (admin.html)
   • Modera reseñas: aprobar, rechazar, responder, borrar.
   • Configura el cupón de bienvenida del club (config/club).
   • Lista miembros del club, exporta CSV y copia los números para
     crear una lista de difusión en WhatsApp Business.
   • Sub-pestaña "Canal de WhatsApp": ver admin-canal.js.
   Se inicia la primera vez que se abre la pestaña (window.iniciarClientes).
   ===================================================================== */

import { db, COLECCION_RESENAS, COLECCION_CLUB, COLECCION_CONFIG } from './firebase-config.js';
import {
    collection, onSnapshot, doc, getDoc, setDoc, updateDoc, deleteDoc, serverTimestamp
} from 'https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js';
import { iniciarCanal } from './admin-canal.js';

const $ = id => document.getElementById(id);
function esc(s = '') { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
function toast(texto, tipo = 'ok') {
    const t = $('toast');
    t.textContent = texto;
    t.className = 'toast show ' + tipo;
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => t.className = 'toast', 2600);
}
const fecha = ts => ts?.toDate ? ts.toDate().toLocaleDateString('es-SV', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
const telBonito = t => { const d = String(t || '').replace(/^503/, ''); return d.length === 8 ? `${d.slice(0, 4)}-${d.slice(4)}` : d; };

/* ============================ RESEÑAS ============================ */
let resenas = [];
let filtro = 'pendiente';
let respondiendo = null;

function estrellas(n) {
    const v = Math.max(0, Math.min(5, Number(n) || 0));
    return `${'★'.repeat(v)}<i>${'★'.repeat(5 - v)}</i>`;
}

function renderResenas() {
    const cuenta = { pendiente: 0, aprobada: 0, rechazada: 0 };
    resenas.forEach(r => { if (cuenta[r.estado] != null) cuenta[r.estado]++; });
    $('cntPendiente').textContent = cuenta.pendiente;
    $('cntAprobada').textContent = cuenta.aprobada;
    $('cntRechazada').textContent = cuenta.rechazada;
    $('cntPendienteTab').textContent = cuenta.pendiente || '';

    const items = resenas.filter(r => r.estado === filtro);
    $('vacioResenas').classList.toggle('hidden', items.length > 0);
    $('listaResenas').innerHTML = items.map(r => `
        <article class="resena-adm">
            <div>
                <h3>${esc(r.nombre)} <span class="fecha">${fecha(r.creado)}</span></h3>
                <div class="stars" role="img" aria-label="${Number(r.estrellas) || 0} de 5 estrellas">${estrellas(r.estrellas)}</div>
                <p>${esc(r.comentario)}</p>
                ${r.respuesta ? `<div class="resp"><b>Tu respuesta:</b> ${esc(r.respuesta)}</div>` : ''}
            </div>
            <div class="acciones-col">
                ${r.estado !== 'aprobada' ? `<button class="btn-mini ok" data-accion="aprobar" data-id="${r.id}">Publicar</button>` : ''}
                ${r.estado !== 'rechazada' ? `<button class="btn-mini bad" data-accion="rechazar" data-id="${r.id}">${r.estado === 'aprobada' ? 'Ocultar' : 'Rechazar'}</button>` : ''}
                <button class="btn-mini" data-accion="responder" data-id="${r.id}">${r.respuesta ? 'Editar respuesta' : 'Responder'}</button>
                <button class="btn-mini bad" data-accion="borrar" data-id="${r.id}">Borrar</button>
            </div>
        </article>`).join('');
}

async function accionResena(accion, id) {
    const r = resenas.find(x => x.id === id);
    if (!r) return;
    try {
        if (accion === 'aprobar') {
            await updateDoc(doc(db, COLECCION_RESENAS, id), { estado: 'aprobada', revisado: serverTimestamp() });
            toast('Reseña publicada');
        } else if (accion === 'rechazar') {
            const negativa = Number(r.estrellas) <= 2;
            if (negativa && !confirm('Esta reseña es negativa. Recuerda: solo se rechaza si es spam, insulto o tiene datos personales — no por ser mala. ¿Rechazarla de todos modos?')) return;
            await updateDoc(doc(db, COLECCION_RESENAS, id), { estado: 'rechazada', revisado: serverTimestamp() });
            toast(r.estado === 'aprobada' ? 'Reseña ocultada' : 'Reseña rechazada');
        } else if (accion === 'borrar') {
            if (!confirm(`¿Borrar la reseña de "${r.nombre}"? Úsalo cuando la persona pida eliminarla. No se puede deshacer.`)) return;
            await deleteDoc(doc(db, COLECCION_RESENAS, id));
            toast('Reseña borrada');
        } else if (accion === 'responder') {
            respondiendo = id;
            $('respTexto').value = r.respuesta || '';
            $('modalRespBg').classList.add('open');
            $('respTexto').focus();
        }
    } catch (err) {
        console.error(err);
        toast('No se pudo guardar', 'bad');
    }
}

function cerrarModalResp() { $('modalRespBg').classList.remove('open'); respondiendo = null; }

/* ============================== CLUB ============================== */
let miembros = [];

function renderClub() {
    $('loadingClub').classList.add('hidden');
    $('cntClub').textContent = miembros.length;
    $('vacioClub').classList.toggle('hidden', miembros.length > 0);
    $('clubTablaWrap').classList.toggle('hidden', miembros.length === 0);
    $('listaClub').innerHTML = miembros.map(m => `
        <tr>
            <td>${esc(m.nombre)}</td>
            <td><a href="https://wa.me/${esc(m.telefono)}" target="_blank" rel="noopener">${esc(telBonito(m.telefono))}</a></td>
            <td>${fecha(m.creado)}</td>
            <td>${esc(m.origen || 'web')}</td>
            <td><button class="btn-mini bad" data-baja="${esc(m.id)}" title="Dar de baja (cuando la persona escribe BAJA)">Dar de baja</button></td>
        </tr>`).join('');
}

function descargarCSV() {
    if (!miembros.length) { toast('La lista está vacía', 'bad'); return; }
    const filas = [['nombre', 'telefono', 'se_unio', 'origen']]
        .concat(miembros.map(m => [m.nombre, '+' + m.telefono, fecha(m.creado), m.origen || 'web']));
    const csv = filas.map(f => f.map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(',')).join('\r\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `club-la-hornilla-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

async function copiarNumeros() {
    if (!miembros.length) { toast('La lista está vacía', 'bad'); return; }
    const texto = miembros.map(m => '+' + m.telefono).join('\n');
    try { await navigator.clipboard.writeText(texto); toast(`${miembros.length} números copiados`); }
    catch { toast('No se pudo copiar', 'bad'); }
}

async function cargarCupon() {
    try {
        const d = await getDoc(doc(db, COLECCION_CONFIG, 'club'));
        const c = d.exists() ? d.data() : {};
        $('cfgActivo').checked = !!c.activo;
        $('cfgCodigo').value = c.codigo || '';
        $('cfgBeneficio').value = c.beneficio || '';
        $('cfgCondiciones').value = c.condiciones || '';
    } catch (err) { console.error(err); }
}

async function guardarCupon() {
    const activo = $('cfgActivo').checked;
    const codigo = $('cfgCodigo').value.trim().toUpperCase().replace(/\s+/g, '');
    const beneficio = $('cfgBeneficio').value.trim();
    const condiciones = $('cfgCondiciones').value.trim();
    if (activo && (!codigo || !beneficio)) { toast('Pon el código y el beneficio para activarlo', 'bad'); return; }
    if (activo && !condiciones) { toast('Agrega las condiciones (vigencia y límites)', 'bad'); return; }
    $('btnGuardarCupon').disabled = true;
    try {
        await setDoc(doc(db, COLECCION_CONFIG, 'club'), { activo, codigo, beneficio, condiciones, actualizado: serverTimestamp() });
        $('cfgCodigo').value = codigo;
        toast(activo ? 'Cupón activo en la web' : 'Cupón guardado (apagado)');
    } catch (err) {
        console.error(err);
        toast('No se pudo guardar', 'bad');
    } finally {
        $('btnGuardarCupon').disabled = false;
    }
}

/* ============================ ARRANQUE ============================ */
/* Sub-pestañas: Canal · Reseñas · Club */
function iniciarSubnav() {
    const tabs = [...document.querySelectorAll('#cliSubnav .cli-subtab')];
    const paneles = { canal: 'subCanal', resenas: 'subResenas', club: 'subClub' };
    const activar = (tab, enfocar = false) => {
        tabs.forEach(t => {
            const on = t === tab;
            t.classList.toggle('active', on);
            t.setAttribute('aria-selected', on ? 'true' : 'false');
            t.tabIndex = on ? 0 : -1;
            $(paneles[t.dataset.sub]).classList.toggle('hidden', !on);
        });
        if (enfocar) tab.focus();
    };
    tabs.forEach((t, i) => {
        t.tabIndex = t.classList.contains('active') ? 0 : -1;
        t.addEventListener('click', () => activar(t));
        t.addEventListener('keydown', e => {
            if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
            const sig = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
            activar(sig, true);
        });
    });
}

window.iniciarClientes = function iniciarClientes() {
    iniciarSubnav();
    iniciarCanal();
    onSnapshot(collection(db, COLECCION_RESENAS), snap => {
        resenas = snap.docs.map(d => ({ id: d.id, ...d.data() }))
            .sort((a, b) => (b.creado?.toMillis?.() || 0) - (a.creado?.toMillis?.() || 0));
        $('loadingResenas').classList.add('hidden');
        renderResenas();
    }, err => {
        $('loadingResenas').textContent = 'No se pudieron cargar las reseñas. Revisa las reglas de Firestore.';
        console.error(err);
    });

    onSnapshot(collection(db, COLECCION_CLUB), snap => {
        miembros = snap.docs.map(d => ({ id: d.id, ...d.data() }))
            .sort((a, b) => (b.creado?.toMillis?.() || 0) - (a.creado?.toMillis?.() || 0));
        renderClub();
    }, err => {
        $('loadingClub').textContent = 'No se pudo cargar el club. Revisa las reglas de Firestore.';
        console.error(err);
    });

    cargarCupon();

    $('filtroResenas').addEventListener('click', e => {
        const b = e.target.closest('.cat-tab');
        if (!b) return;
        filtro = b.dataset.estado;
        $('filtroResenas').querySelectorAll('.cat-tab').forEach(t => t.classList.toggle('active', t === b));
        renderResenas();
    });
    $('listaResenas').addEventListener('click', e => {
        const b = e.target.closest('[data-accion]');
        if (b) accionResena(b.dataset.accion, b.dataset.id);
    });

    $('btnCancelarResp').addEventListener('click', cerrarModalResp);
    $('modalRespBg').addEventListener('click', e => { if (e.target === $('modalRespBg')) cerrarModalResp(); });
    $('btnGuardarResp').addEventListener('click', async () => {
        if (!respondiendo) return;
        const respuesta = $('respTexto').value.trim();
        $('btnGuardarResp').disabled = true;
        try {
            await updateDoc(doc(db, COLECCION_RESENAS, respondiendo), { respuesta });
            toast(respuesta ? 'Respuesta guardada' : 'Respuesta quitada');
            cerrarModalResp();
        } catch (err) {
            console.error(err);
            toast('No se pudo guardar', 'bad');
        } finally {
            $('btnGuardarResp').disabled = false;
        }
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrarModalResp(); });

    $('btnGuardarCupon').addEventListener('click', guardarCupon);
    $('btnCsvClub').addEventListener('click', descargarCSV);
    $('btnCopiarClub').addEventListener('click', copiarNumeros);
    $('listaClub').addEventListener('click', async e => {
        const b = e.target.closest('[data-baja]');
        if (!b) return;
        const m = miembros.find(x => x.id === b.dataset.baja);
        if (!confirm(`¿Dar de baja a ${m?.nombre || 'esta persona'}? Se borra su número del club.`)) return;
        try { await deleteDoc(doc(db, COLECCION_CLUB, b.dataset.baja)); toast('Dado de baja'); }
        catch (err) { console.error(err); toast('No se pudo borrar', 'bad'); }
    });
};
