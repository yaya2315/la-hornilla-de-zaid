/* =====================================================================
   PUPUSAS-CONTENIDO.JS — Arma toda la página de pupusas desde Firebase
   ---------------------------------------------------------------------
   Antes pupusas.html estaba escrita a mano de principio a fin (no se
   podía editar nada desde el admin). Ahora cada categoría, platillo y
   bebida sale de Firebase — lo mismo que ya gestiona el admin — y se
   pinta con las mismas clases CSS de siempre (cat-card / toque-card /
   bebida-row), así que el diseño no cambia.

   • Cada categoría de pupusas puede tener estilo "lista" (tarjeta con
     filas simples, como Especialidades/Tradicionales) o "toque"
     (tarjeta ancha con título + descripción, como "Con un toque
     mexicano"). Se elige desde el admin al crear/editar la categoría.
   • El color de la etiqueta de cada categoría rota automáticamente
     (rojo, dorado, verde, naranja) según su orden.
   • El buscador filtra pupusas Y bebidas sin volver a pedir nada a
     Firebase ni destruir las tarjetas (así el resaltado de la pestaña
     activa del sub-menú nunca se rompe).
   ===================================================================== */

import { db, COLECCION_PUPUSAS, COLECCION_CATEGORIAS } from './firebase-config.js';
import { collection, getDocs }
    from 'https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js';
import { cargarBebidas } from './bebidas.js';

/* ── Respaldo: solo se usa si Firebase aún no tiene datos o falla ──── */
const RESPALDO_CATEGORIAS = [
    { nombre: 'Especialidades' },
    { nombre: 'Tradicionales', nota: 'Las clásicas de siempre, a precio de barrio.' },
    { nombre: 'Con un toque mexicano', estilo: 'toque' }
];
const RESPALDO_PLATOS = [
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
      variantes: [{ texto: 'Acompañada de su caldo, cilantro y cebolla.', precio: '$1.50' }] },
    { nombre: 'Pollo pastor con queso y piña', categoria: 'Con un toque mexicano', activo: true,
      variantes: [{ texto: 'Acompañada de cilantro y cebolla.', precio: '$1.50' }] },
    { nombre: 'Pastor con queso y piña', categoria: 'Con un toque mexicano', activo: true,
      variantes: [{ texto: '', precio: '$1.50' }] }
];

const PALETTE = ['is-red', 'is-gold', 'is-green', 'is-ember'];

function esc(s = '') { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
function moneyParse(txt = '') { const n = parseFloat(String(txt).replace(/[^0-9.]/g, '')); return Number.isFinite(n) ? n : 0; }
function money(n) { return '$' + n.toFixed(2); }
function resaltar(textoEscapado, termino) {
    if (!termino) return textoEscapado;
    try {
        const re = new RegExp(`(${termino.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');
        return textoEscapado.replace(re, '<mark class="pupusa-match">$1</mark>');
    } catch { return textoEscapado; }
}
function slugify(s, usados) {
    const base = String(s).toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') || 'categoria';
    let slug = base, n = 2;
    while (usados.has(slug)) slug = `${base}-${n++}`;
    usados.add(slug);
    return slug;
}
function precioFijoCategoria(platos) {
    if (!platos.length) return '';
    const precios = platos.map(p => moneyParse((p.variantes && p.variantes[0] && p.variantes[0].precio) || '0'));
    return precios.every(p => p === precios[0]) ? `${money(precios[0])} c/u` : '';
}

/* ── Carga de datos ─────────────────────────────────────────────── */
async function cargarCategorias() {
    try {
        /* Sin where/orderBy en el servidor: así una categoría o un
           platillo sin el campo "orden" (agregado a mano en Firebase,
           por ejemplo) nunca queda invisible. Se filtra y se ordena
           aquí mismo. */
        const snap = await getDocs(collection(db, COLECCION_CATEGORIAS));
        const cats = snap.docs.map(d => ({ id: d.id, ...d.data() }))
            .filter(c => c.menu === 'pupusas')
            .sort((a, b) => (a.orden ?? Infinity) - (b.orden ?? Infinity));
        return cats.length ? cats : RESPALDO_CATEGORIAS;
    } catch (err) {
        console.warn('[pupusas] No se pudieron leer las categorías, uso respaldo:', err);
        return RESPALDO_CATEGORIAS;
    }
}
async function cargarPlatos() {
    try {
        const snap = await getDocs(collection(db, COLECCION_PUPUSAS));
        const platos = snap.docs.map(d => ({ id: d.id, ...d.data() }))
            .filter(p => p.activo !== false)
            .sort((a, b) => (a.orden ?? Infinity) - (b.orden ?? Infinity));
        return platos.length ? platos : RESPALDO_PLATOS;
    } catch (err) {
        console.warn('[pupusas] No se pudieron leer los platillos, uso respaldo:', err);
        return RESPALDO_PLATOS;
    }
}

/* ── Render de categorías (tarjetas) + sub-nav ─────────────────── */
function renderCategorias(categorias, platos) {
    const layout = document.getElementById('pupusasLayout');
    const subnav = document.getElementById('pupusaSubnav');
    if (!layout) return;

    const usados = new Set();
    const registros = [];
    let html = '';

    categorias.forEach((cat, i) => {
        const propios = platos.filter(p => p.categoria === cat.nombre);
        if (!propios.length) return;
        const slug = slugify(cat.nombre, usados);
        const pill = PALETTE[i % PALETTE.length];
        registros.push({ cat, slug });

        if (cat.estilo === 'toque') {
            html += `
            <article class="toque-card" id="${slug}">
                <header class="cat-head">
                    <span class="cat-pill ${pill}">${esc(cat.nombre)}</span>
                </header>
                <ul class="toque-rows">
                    ${propios.map(p => {
                        const v = (p.variantes && p.variantes[0]) || {};
                        return `
                        <li class="toque-row" data-nombre="${esc(p.nombre)}" data-desc="${esc(v.texto || '')}">
                            <div class="toque-info">
                                <h3>${esc(p.nombre)}</h3>
                                ${v.texto ? `<p>${esc(v.texto)}</p>` : ''}
                            </div>
                            <span class="precio">${esc(v.precio || '')}</span>
                        </li>`;
                    }).join('')}
                </ul>
            </article>`;
        } else {
            const badge = precioFijoCategoria(propios);
            html += `
            <article class="cat-card" id="${slug}">
                <header class="cat-head">
                    <span class="cat-pill ${pill}">${esc(cat.nombre)}</span>
                    ${badge ? `<span class="cat-precio-fijo">${esc(badge)}</span>` : ''}
                </header>
                <ul class="cat-rows">
                    ${propios.map(p => {
                        const v = (p.variantes && p.variantes[0]) || {};
                        return `<li class="cat-row" data-nombre="${esc(p.nombre)}" data-desc="">
                            <span class="cat-name">${esc(p.nombre)}</span><span class="precio">${esc(v.precio || '')}</span>
                        </li>`;
                    }).join('')}
                </ul>
                ${cat.nota ? `<p class="cat-nota">${esc(cat.nota)}</p>` : ''}
            </article>`;
        }
    });

    layout.innerHTML = html || '<p class="pupusas-cargando">Aún no hay pupusas publicadas.</p>';

    if (subnav) {
        subnav.innerHTML = registros.map((r, i) =>
            `<a href="#${r.slug}" class="subnav-pill${i === 0 ? ' is-active' : ''}">${esc(r.cat.nombre)}</a>`
        ).join('') + `<a href="#bebidas-pupusas" class="subnav-pill">Bebidas</a>`;
    }
}

/* ── Render de bebidas (lista simple, igual que siempre) ─────────── */
function renderBebidas(bebidas) {
    const wrap = document.getElementById('bebidasPupusasLista');
    if (!wrap) return;
    wrap.innerHTML = bebidas.map(b =>
        `<div class="bebida-row" data-nombre="${esc(b.nombre)}"><span>${esc(b.nombre)}</span><span class="precio">${esc(b.precio)}</span></div>`
    ).join('');
}

/* ── Buscador: solo toca clases/HTML interno, nunca destruye tarjetas
   (así el IntersectionObserver del sub-menú nunca pierde sus objetivos) ── */
function aplicarBusqueda(termino) {
    const t = termino.trim().toLowerCase();
    let algunaCoincidencia = false;

    document.querySelectorAll('.cat-card, .toque-card').forEach(card => {
        let visibles = 0;
        card.querySelectorAll('.cat-row, .toque-row').forEach(row => {
            const nombre = row.dataset.nombre || '';
            const desc = row.dataset.desc || '';
            const coincide = !t || nombre.toLowerCase().includes(t) || desc.toLowerCase().includes(t);
            row.classList.toggle('search-hide', !coincide);
            if (coincide) { visibles++; algunaCoincidencia = true; }
            const nameEl = row.querySelector('.cat-name, .toque-info h3');
            if (nameEl) nameEl.innerHTML = resaltar(esc(nombre), t);
            const descEl = row.querySelector('.toque-info p');
            if (descEl) descEl.innerHTML = resaltar(esc(desc), t);
        });
        card.classList.toggle('search-hide', visibles === 0);
    });

    const bebidasWrap = document.getElementById('bebidasPupusasLista');
    if (bebidasWrap) {
        let visibles = 0;
        bebidasWrap.querySelectorAll('.bebida-row').forEach(row => {
            const nombre = row.dataset.nombre || '';
            const coincide = !t || nombre.toLowerCase().includes(t);
            row.classList.toggle('search-hide', !coincide);
            if (coincide) { visibles++; algunaCoincidencia = true; }
            const nameEl = row.querySelector('span:first-child');
            if (nameEl) nameEl.innerHTML = resaltar(esc(nombre), t);
        });
        bebidasWrap.classList.toggle('search-hide', visibles === 0);
    }

    const sinResultados = document.getElementById('pupusaSinResultados');
    if (sinResultados) {
        sinResultados.classList.toggle('hidden', !t || algunaCoincidencia);
        const span = sinResultados.querySelector('span');
        if (span) span.textContent = termino.trim();
    }
}

/* ── Pestaña activa del sub-menú al hacer scroll ──────────────────── */
function configurarSubnavActivo() {
    const pills = Array.from(document.querySelectorAll('.subnav-pill'));
    if (!pills.length) return;
    const mapa = pills
        .map(pill => {
            const id = pill.getAttribute('href')?.replace('#', '');
            const seccion = id ? document.getElementById(id) : null;
            return seccion ? { pill, seccion } : null;
        })
        .filter(Boolean);
    if (!mapa.length) return;

    const activar = (pill) => {
        pills.forEach(p => {
            const on = p === pill;
            p.classList.toggle('is-active', on);
            if (on) p.setAttribute('aria-current', 'true'); else p.removeAttribute('aria-current');
        });
    };

    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            const visibles = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
            if (visibles.length) {
                const item = mapa.find(m => m.seccion === visibles[0].target);
                if (item) activar(item.pill);
            }
        }, { rootMargin: '-150px 0px -55% 0px', threshold: [0.15, 0.5, 1] });
        mapa.forEach(m => io.observe(m.seccion));
    }
    mapa.forEach(({ pill }) => pill.addEventListener('click', () => activar(pill)));
}

/* ── Inicialización ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', async () => {
    const cargando = document.getElementById('pupusasCargando');
    const [categorias, platos, bebidas] = await Promise.all([cargarCategorias(), cargarPlatos(), cargarBebidas()]);

    renderCategorias(categorias, platos);
    renderBebidas(bebidas);
    if (cargando) cargando.remove();

    configurarSubnavActivo();

    const buscarInput = document.getElementById('pupusaBuscar');
    const clearBtn = document.getElementById('pupusaClear');
    const searchWrap = document.getElementById('pupusaSearchWrap');

    if (buscarInput) {
        let debounceTimer;
        buscarInput.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const termino = buscarInput.value;
                if (searchWrap) searchWrap.classList.toggle('has-text', termino.trim().length > 0);
                aplicarBusqueda(termino);
            }, 120);
        });
    }
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            buscarInput.value = '';
            if (searchWrap) searchWrap.classList.remove('has-text');
            aplicarBusqueda('');
            buscarInput.focus();
        });
    }
});