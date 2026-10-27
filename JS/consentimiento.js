/* =====================================================================
   CONSENTIMIENTO.JS — Aviso de cookies + medición solo con permiso
   ---------------------------------------------------------------------
   • Google Analytics 4 y el Píxel de Meta NO se cargan hasta que la
     persona acepta. Si rechaza, no se carga nada de terceros.
   • Rechazar es igual de fácil que aceptar (mismo tamaño de botón).
   • La elección se guarda en este navegador (localStorage) y se puede
     cambiar cuando quiera con cualquier botón [data-abrir-cookies]
     (en el footer: "Configurar cookies").
   • Si no hay ningún ID configurado abajo, el sitio solo usa
     almacenamiento necesario y el aviso NO aparece (no hace falta).

   CÓMO ACTIVAR LA MEDICIÓN
   1. Crea una propiedad en analytics.google.com → copia el ID que
      empieza con "G-" y pégalo en GA4_ID.
   2. (Opcional) Píxel de Meta: pega el número en META_PIXEL_ID.
   3. Si después agregas otra herramienta, sube VERSION en 1 para que
      el aviso vuelva a pedir permiso a todos.
   ===================================================================== */
(function () {
    'use strict';

    const CONFIG = {
        GA4_ID: 'G-M6V6T2627K',          // ej. 'G-ABC123XYZ'  — vacío = Analytics apagado
        META_PIXEL_ID: '',   // ej. '123456789012345' — vacío = Píxel apagado
        VERSION: 1
    };
    const CLAVE = 'hornilla_consentimiento';

    const hayAnalytics = /^G-[A-Z0-9]+$/i.test(CONFIG.GA4_ID);
    const hayPixel = /^\d{6,20}$/.test(CONFIG.META_PIXEL_ID);
    const hayTerceros = hayAnalytics || hayPixel;

    /* Ruta a la política de cookies, esté la página en la raíz o en /HTML/ */
    const enHTML = /\/HTML\//i.test(location.pathname);
    const urlCookies = enHTML ? 'cookies.html' : 'HTML/cookies.html';

    /* ---------- Almacenamiento seguro ---------- */
    function leer() {
        try {
            const d = JSON.parse(localStorage.getItem(CLAVE) || 'null');
            return d && d.v === CONFIG.VERSION ? d : null;
        } catch { return null; }
    }
    function guardar(analitica, publicidad) {
        const d = { v: CONFIG.VERSION, analitica: !!analitica, publicidad: !!publicidad, fecha: new Date().toISOString() };
        try { localStorage.setItem(CLAVE, JSON.stringify(d)); } catch { /* modo privado: solo dura esta visita */ }
        return d;
    }

    /* ---------- Google Consent Mode v2: todo negado por defecto ---------- */
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied'
    });

    let gaCargado = false, pixelCargado = false;

    function cargarAnalytics() {
        if (!hayAnalytics || gaCargado) return;
        gaCargado = true;
        window.gtag('consent', 'update', { analytics_storage: 'granted' });
        const s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(CONFIG.GA4_ID);
        document.head.appendChild(s);
        window.gtag('js', new Date());
        window.gtag('config', CONFIG.GA4_ID, { anonymize_ip: true });
    }

    function cargarPixel() {
        if (!hayPixel || pixelCargado) return;
        pixelCargado = true;
        /* Código base oficial del Píxel de Meta, sin la etiqueta <noscript> */
        !function (f, b, e, v, n, t, s) {
            if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
            if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
            t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
        }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
        window.fbq('init', CONFIG.META_PIXEL_ID);
        window.fbq('track', 'PageView');
    }

    function aplicar(d) {
        if (!d) return;
        if (d.analitica) cargarAnalytics();
        if (d.publicidad) {
            window.gtag('consent', 'update', { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted' });
            cargarPixel();
        }
        /* Si alguien retira el permiso después de haber aceptado, los
           scripts ya cargados siguen en memoria hasta recargar: se recarga
           para que dejen de medir de inmediato. */
    }

    /* ---------- Medición de acciones (pedido, reseña, club) ----------
       Uso: window.hornillaTrack('pedido_whatsapp', { valor: 12.5 })
       No hace nada si la persona no dio permiso. */
    const EVENTOS_META = { pedido_whatsapp: 'Contact', club_registro: 'Lead', resena_enviada: 'SubmitApplication' };
    window.hornillaTrack = function (nombre, params = {}) {
        try {
            if (gaCargado) window.gtag('event', nombre, params);
            if (pixelCargado && window.fbq) {
                const std = EVENTOS_META[nombre];
                std ? window.fbq('track', std, params) : window.fbq('trackCustom', nombre, params);
            }
        } catch { /* la medición nunca debe romper la página */ }
    };

    /* ---------- Aviso ---------- */
    let banner = null;

    function textoPrincipal() {
        const que = [hayAnalytics && 'Google Analytics', hayPixel && 'el Píxel de Meta'].filter(Boolean).join(' y ');
        return `Usamos almacenamiento necesario para que el sitio funcione (por ejemplo, tu carrito). ` +
            `Con tu permiso también usamos ${que} para saber cómo nos encuentras y mejorar. ` +
            `Puedes cambiar tu elección cuando quieras. <a href="${urlCookies}">Más información</a>.`;
    }

    function opcionHTML(id, titulo, desc, marcado, disponible) {
        if (!disponible) return '';
        return `
            <label class="cookie-opcion" for="${id}">
                <span><strong>${titulo}</strong><span>${desc}</span></span>
                <input type="checkbox" id="${id}" ${marcado ? 'checked' : ''}>
            </label>`;
    }

    function construir(modo) {
        cerrar(false);
        const actual = leer() || { analitica: false, publicidad: false };
        banner = document.createElement('section');
        banner.className = 'cookie-banner';
        banner.setAttribute('role', 'region');
        banner.setAttribute('aria-labelledby', 'cookieTitulo');

        if (!hayTerceros) {
            banner.innerHTML = `
                <h2 id="cookieTitulo">Cookies y privacidad</h2>
                <p>Este sitio solo usa almacenamiento necesario para funcionar (tu carrito de pedido y esta preferencia). No usamos cookies de medición ni de publicidad. <a href="${urlCookies}">Más información</a>.</p>
                <div class="cookie-acciones" style="grid-template-columns:1fr">
                    <button type="button" class="cookie-btn cookie-btn--fuerte" data-accion="cerrar">Entendido</button>
                </div>`;
        } else if (modo === 'config') {
            banner.innerHTML = `
                <h2 id="cookieTitulo">Configurar cookies</h2>
                <p>Elige qué permites. Las necesarias siempre están activas porque sin ellas el pedido en línea no funciona.</p>
                <div class="cookie-opciones">
                    <div class="cookie-opcion">
                        <span><strong>Necesarias</strong><span>Carrito de pedido y esta preferencia. Siempre activas.</span></span>
                        <input type="checkbox" checked disabled aria-label="Necesarias, siempre activas">
                    </div>
                    ${opcionHTML('ckAnalitica', 'Medición (Google Analytics)', 'Cuántas personas visitan el sitio y de dónde llegan. Datos agregados.', actual.analitica, hayAnalytics)}
                    ${opcionHTML('ckPublicidad', 'Publicidad (Píxel de Meta)', 'Mide si nuestros anuncios en Facebook e Instagram funcionan.', actual.publicidad, hayPixel)}
                </div>
                <div class="cookie-acciones" style="grid-template-columns:1fr 1fr">
                    <button type="button" class="cookie-btn" data-accion="guardar">Guardar selección</button>
                    <button type="button" class="cookie-btn cookie-btn--fuerte" data-accion="aceptar">Aceptar todo</button>
                </div>`;
        } else {
            banner.innerHTML = `
                <h2 id="cookieTitulo">¿Aceptas las cookies?</h2>
                <p>${textoPrincipal()}</p>
                <div class="cookie-acciones">
                    <button type="button" class="cookie-btn" data-accion="rechazar">Rechazar</button>
                    <button type="button" class="cookie-btn" data-accion="config">Configurar</button>
                    <button type="button" class="cookie-btn cookie-btn--fuerte" data-accion="aceptar">Aceptar</button>
                </div>`;
        }

        banner.addEventListener('click', e => {
            const b = e.target.closest('[data-accion]');
            if (!b) return;
            const accion = b.dataset.accion;
            const antes = leer();
            if (accion === 'cerrar') { cerrar(true); return; }
            if (accion === 'config') { construir('config'); banner.querySelector('input:not([disabled])')?.focus(); return; }
            let d;
            if (accion === 'aceptar') d = guardar(hayAnalytics, hayPixel);
            if (accion === 'rechazar') d = guardar(false, false);
            if (accion === 'guardar') d = guardar(
                !!banner.querySelector('#ckAnalitica')?.checked,
                !!banner.querySelector('#ckPublicidad')?.checked
            );
            cerrar(true);
            const retiro = antes && ((antes.analitica && !d.analitica) || (antes.publicidad && !d.publicidad));
            if (retiro) location.reload(); else aplicar(d);
        });

        document.body.appendChild(banner);
        requestAnimationFrame(() => banner && banner.classList.add('is-visible'));
    }

    let focoPrevio = null;
    function cerrar(devolverFoco) {
        if (!banner) return;
        banner.remove();
        banner = null;
        if (devolverFoco && focoPrevio && document.contains(focoPrevio)) focoPrevio.focus();
        focoPrevio = null;
    }

    function abrir() {
        focoPrevio = document.activeElement;
        construir(hayTerceros ? 'config' : 'info');
        banner.querySelector('button, input:not([disabled])')?.focus();
    }
    window.hornillaCookies = { abrir };

    document.addEventListener('keydown', e => { if (e.key === 'Escape' && banner && leer()) cerrar(true); });

    /* ---------- Arranque ---------- */
    function iniciar() {
        document.querySelectorAll('[data-abrir-cookies]').forEach(b => b.addEventListener('click', abrir));
        const d = leer();
        if (d) aplicar(d);
        else if (hayTerceros) construir('inicio');
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
    else iniciar();
})();
