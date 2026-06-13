/* =====================================================================
   LA HORNILLA DE ZAID — Script compartido
   (El combo de la semana ahora se maneja en promos.js, leyendo desde
    Firebase. Por eso aquí ya NO está la lista COMBOS_SEMANA.)
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ===== MENÚ LATERAL ===== */
    const btn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('backdrop');

    const closeMenu = () => {
        sidebar?.classList.remove('active');
        backdrop?.classList.remove('active');
        btn?.classList.remove('open');
        btn?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };
    const toggleMenu = () => {
        const open = sidebar?.classList.toggle('active');
        backdrop?.classList.toggle('active', open);
        btn?.classList.toggle('open', open);
        btn?.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
    };

    btn?.addEventListener('click', toggleMenu);
    backdrop?.addEventListener('click', closeMenu);
    sidebar?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

    /* ===== HEADER AL HACER SCROLL ===== */
    const header = document.querySelector('.main-header');
    const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ===== APARICIÓN AL HACER SCROLL ===== */
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && reveals.length) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(en => {
                if (en.isIntersecting) {
                    en.target.classList.add('is-visible');
                    io.unobserve(en.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
        reveals.forEach(el => io.observe(el));
    } else {
        reveals.forEach(el => el.classList.add('is-visible'));
    }

});
