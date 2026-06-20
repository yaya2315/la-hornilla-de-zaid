/* =====================================================================
   CARTAS.JS — Lee los platillos del menú (principal o pupusas) desde
   Firebase y los pinta en pantalla, con buscador y filtro por categoría.
   ---------------------------------------------------------------------
   • Cada página (menu.html / pupusas.html) define un <div id="cartaApp">
     con data-tipo="menu" o data-tipo="pupusas".
   • Si Firebase no responde, se usa una lista de respaldo para que la
     página nunca se quede vacía.
   ===================================================================== */

import { db, COLECCION_MENU, COLECCION_PUPUSAS, COLECCION_CATEGORIAS } from './firebase-config.js';
import { collection, query, where, orderBy, getDocs }
    from 'https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js';

/* ── Respaldo: solo se usa si Firebase aún no tiene datos o falla ──── */
const RESPALDO = {
    menu: {
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
    },
    pupusas: {
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
    }
};

const CLAVE_MENU = { menu: 'principal', pupusas: 'pupusas' };
const COLECCION = { menu: COLECCION_MENU, pupusas: COLECCION_PUPUSAS };

function esc(s = '') {
    return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

/* Resalta coincidencias de búsqueda dentro de un texto ya escapado */
function resaltar(textoEscapado, termino) {
    if (!termino) return textoEscapado;
    const t = termino.trim();
    if (!t) return textoEscapado;
    try {
        const re = new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');
        return textoEscapado.replace(re, '<mark class="carta-match">$1</mark>');
    } catch { return textoEscapado; }
}

async function cargarDatos(tipo) {
    try {
        const clave = CLAVE_MENU[tipo];
        const qCat = query(collection(db, COLECCION_CATEGORIAS), where('menu', '==', clave), orderBy('orden', 'asc'));
        const qPlatos = query(collection(db, COLECCION[tipo]), orderBy('orden', 'asc'));
        const [catSnap, platoSnap] = await Promise.all([getDocs(qCat), getDocs(qPlatos)]);

        const categorias = catSnap.docs.map(d => d.data().nombre);
        const platos = platoSnap.docs.map(d => ({ id: d.id, ...d.data() })).filter(p => p.activo !== false);

        if (categorias.length === 0 || platos.length === 0) {
            console.warn('[cartas] Sin datos en Firebase, uso respaldo para', tipo);
            return RESPALDO[tipo];
        }
        return { categorias, platos };
    } catch (err) {
        console.warn('[cartas] No se pudo leer Firebase, uso respaldo:', err);
        return RESPALDO[tipo];
    }
}

function tarjetaPlato(p, termino) {
    const nombreHtml = resaltar(esc(p.nombre), termino);
    if (p.destacado) {
        const descHtml = resaltar(esc(p.descripcion || ''), termino);
        return `
            <article class="platillo-card nuevo-card carta-item">
                <span class="nuevo-tag">${esc(p.etiqueta || 'Destacado')}</span>
                <div>
                    <h3>${nombreHtml}</h3>
                    <p>${descHtml}</p>
                </div>
                <span class="precio">${esc(p.precioUnico || '')}</span>
            </article>`;
    }
    const filas = (p.variantes || []).map(v => `
        <div class="row"><span>${resaltar(esc(v.texto), termino)}</span><span class="precio">${esc(v.precio)}</span></div>
    `).join('');
    return `
        <article class="platillo-card carta-item">
            <div class="platillo-head">
                <h3>${nombreHtml}</h3>
                ${p.nota ? `<span class="platillo-nota">${esc(p.nota)}</span>` : ''}
            </div>
            <div class="platillo-rows">${filas}</div>
        </article>`;
}

function coincide(p, termino) {
    if (!termino) return true;
    const t = termino.toLowerCase();
    if (p.nombre.toLowerCase().includes(t)) return true;
    if (p.descripcion && p.descripcion.toLowerCase().includes(t)) return true;
    if (p.variantes && p.variantes.some(v => v.texto.toLowerCase().includes(t))) return true;
    return false;
}

function initCarta(tipo, datos) {
    const grid = document.getElementById('cartaGrid');
    const toolbar = document.getElementById('cartaToolbar');
    const catsWrap = document.getElementById('cartaCats');
    const input = document.getElementById('cartaBuscar');
    const searchWrap = document.getElementById('cartaSearchWrap');
    const clearBtn = document.getElementById('cartaClear');
    const sinResultados = document.getElementById('cartaSinResultados');
    if (!grid) return;

    let catActiva = 'todas';
    let termino = '';

    /* Pestañas de categoría: "Todas" + cada categoría con platillos */
    const catsConDatos = datos.categorias.filter(c => datos.platos.some(p => p.categoria === c));
    catsWrap.innerHTML = ['Todas', ...catsConDatos].map(c => {
        const valor = c === 'Todas' ? 'todas' : c;
        return `<button type="button" class="carta-cat-pill ${valor === 'todas' ? 'is-active' : ''}" data-cat="${esc(valor)}">${esc(c)}</button>`;
    }).join('');

    function render() {
        const items = datos.platos.filter(p =>
            (catActiva === 'todas' || p.categoria === catActiva) && coincide(p, termino)
        );

        if (items.length === 0) {
            grid.innerHTML = '';
            sinResultados.classList.remove('hidden');
            sinResultados.querySelector('.termino').textContent = termino ? `"${termino}"` : '';
            return;
        }
        sinResultados.classList.add('hidden');
        grid.innerHTML = items.map(p => tarjetaPlato(p, termino)).join('');
    }

    catsWrap.querySelectorAll('.carta-cat-pill').forEach(btn => {
        btn.addEventListener('click', () => {
            catActiva = btn.dataset.cat;
            catsWrap.querySelectorAll('.carta-cat-pill').forEach(b => b.classList.toggle('is-active', b === btn));
            render();
        });
    });

    let debounceTimer;
    input.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            termino = input.value.trim();
            searchWrap.classList.toggle('has-text', termino.length > 0);
            render();
        }, 120);
    });
    clearBtn.addEventListener('click', () => {
        input.value = '';
        termino = '';
        searchWrap.classList.remove('has-text');
        input.focus();
        render();
    });

    render();
}

/* ── Botón compartir (Web Share API con respaldo a copiar enlace) ─── */
function initCompartir() {
    const btn = document.getElementById('btnCompartirMenu');
    if (!btn) return;
    btn.addEventListener('click', async () => {
        const data = { title: document.title, url: window.location.href };
        if (navigator.share) {
            try { await navigator.share(data); } catch { /* usuario canceló */ }
            return;
        }
        try {
            await navigator.clipboard.writeText(window.location.href);
            const original = btn.innerHTML;
            btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg> Enlace copiado';
            setTimeout(() => { btn.innerHTML = original; }, 2000);
        } catch {
            alert(window.location.href);
        }
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    initCompartir();
    const app = document.getElementById('cartaApp');
    if (!app) return;
    const tipo = app.dataset.tipo === 'pupusas' ? 'pupusas' : 'menu';
    const datos = await cargarDatos(tipo);
    initCarta(tipo, datos);
});