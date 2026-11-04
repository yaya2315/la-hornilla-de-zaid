/* =====================================================================
   ADMIN-CLIENTES.JS — Pestaña "Clientes" del panel (admin.html)
   • Modera reseñas: aprobar, rechazar, responder, borrar.
   • Sub-pestaña "Canal de WhatsApp": ver admin-canal.js.
   • Sub-pestaña "Tarjeta" (sellos y canjes): ver admin-tarjeta.js.
   Se inicia la primera vez que se abre la pestaña (window.iniciarClientes).
   ===================================================================== */

import { db, COLECCION_RESENAS } from './firebase-config.js';
import {
    collection, onSnapshot, doc, updateDoc, deleteDoc, serverTimestamp
} from 'https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js';
import { iniciarCanal } from './admin-canal.js';
import { iniciarTarjeta } from './admin-tarjeta.js';

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

/* ============================ ARRANQUE ============================ */
/* Sub-pestañas: Canal · Reseñas · Tarjeta */
function iniciarSubnav() {
    const tabs = [...document.querySelectorAll('#cliSubnav .cli-subtab')];
    const paneles = { canal: 'subCanal', resenas: 'subResenas', tarjeta: 'subTarjeta' };
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
    iniciarTarjeta();
    onSnapshot(collection(db, COLECCION_RESENAS), snap => {
        resenas = snap.docs.map(d => ({ id: d.id, ...d.data() }))
            .sort((a, b) => (b.creado?.toMillis?.() || 0) - (a.creado?.toMillis?.() || 0));
        $('loadingResenas').classList.add('hidden');
        renderResenas();
    }, err => {
        $('loadingResenas').textContent = 'No se pudieron cargar las reseñas. Revisa las reglas de Firestore.';
        console.error(err);
    });

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
};
