/* =====================================================================
   PUPUSAS.JS — Resalta la pestaña activa del sub-menú al hacer scroll.
   ---------------------------------------------------------------------
   El menú lateral, el header y las animaciones .reveal los maneja
   script.js (igual que en el resto del sitio). Aquí solo se ilumina
   la pestaña de la sección que se está viendo.
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    const pills = Array.from(document.querySelectorAll('.subnav-pill'));
    if (!pills.length) return;

    /* Relaciona cada pestaña con su sección por el #ancla del enlace */
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
            if (on) p.setAttribute('aria-current', 'true');
            else p.removeAttribute('aria-current');
        });
    };

    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            /* Toma la sección más visible cerca de la parte superior */
            const visibles = entries
                .filter(e => e.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

            if (visibles.length) {
                const item = mapa.find(m => m.seccion === visibles[0].target);
                if (item) activar(item.pill);
            }
        }, {
            /* La franja activa empieza bajo el header + sub-nav */
            rootMargin: '-150px 0px -55% 0px',
            threshold: [0.15, 0.5, 1]
        });

        mapa.forEach(m => io.observe(m.seccion));
    }

    /* Feedback inmediato al tocar una pestaña (sin esperar al scroll) */
    mapa.forEach(({ pill }) => {
        pill.addEventListener('click', () => activar(pill));
    });
});