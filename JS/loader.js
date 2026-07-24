/* =====================================================================
   LOADER.JS — Pantalla de carga "fueguito" + transición entre páginas
   ---------------------------------------------------------------------
   • Al abrir cualquier página el overlay se ve por defecto (así no hay
     parpadeo antes de que este script corra) y la llama se "llena".
   • Cuando la página termina de cargar, el overlay se desvanece.
   • Al hacer clic en un enlace interno (.html del mismo sitio), el
     overlay vuelve a aparecer y, un instante después, se navega —
     dando la sensación de una transición continua entre páginas.
   • Si algo falla o el usuario prefiere menos movimiento, style.css
     trae un margen de seguridad para que la página nunca quede
     bloqueada por el overlay.
   ===================================================================== */
(() => {
    const overlay = document.getElementById('pageload');
    if (!overlay) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const MIN_VISIBLE = reduceMotion ? 0 : 1250;   // deja ver la llama llenarse
    const EXIT_DELAY  = reduceMotion ? 0 : 600;    // espera antes de navegar

    const inicio = performance.now();

    function ocultarOverlay() {
        const transcurrido = performance.now() - inicio;
        const espera = Math.max(0, MIN_VISIBLE - transcurrido);
        setTimeout(() => {
            overlay.classList.add('is-hidden');
            overlay.setAttribute('aria-hidden', 'true');
        }, espera);
    }

    if (document.readyState === 'complete') {
        ocultarOverlay();
    } else {
        window.addEventListener('load', ocultarOverlay, { once: true });
    }

    /* Al volver con el botón "atrás" (bfcache), no dejar el overlay activo */
    window.addEventListener('pageshow', (e) => {
        if (e.persisted) {
            overlay.classList.add('is-hidden');
            overlay.setAttribute('aria-hidden', 'true');
        }
    });

    /* ── ¿Este enlace debe disparar la transición? ── */
    function esNavegacionInterna(a) {
        if (!a || !a.href) return false;
        if (a.target && a.target !== '_self') return false;
        if (a.hasAttribute('download')) return false;
        let url;
        try { url = new URL(a.href, location.href); } catch { return false; }
        if (url.origin !== location.origin) return false;
        if (!/\.html?$/.test(url.pathname)) return false;         // solo páginas del sitio
        if (url.pathname === location.pathname && url.hash) return false; // anclas internas
        return true;
    }

    document.addEventListener('click', (e) => {
        if (e.defaultPrevented || e.button !== 0) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

        const a = e.target.closest('a');
        if (!esNavegacionInterna(a)) return;

        e.preventDefault();
        overlay.classList.remove('is-hidden');
        overlay.removeAttribute('aria-hidden');

        setTimeout(() => { window.location.href = a.href; }, EXIT_DELAY);
    });
})();