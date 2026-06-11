/* =====================================================================
   LA HORNILLA DE ZAID — Script compartido
   ===================================================================== */

/* ╔══════════════════════════════════════════════════════════════════╗
   ║  👇 COMBO DE LA SEMANA — EDITA SOLO ESTA LISTA                     ║
   ║  Cada semana el sitio muestra UN combo distinto, en orden y de     ║
   ║  forma automática (cambia solo, sin tocar nada más).               ║
   ║  El combo solo se muestra de MARTES a VIERNES.                     ║
   ║  Agrega todos los combos que quieras: { nombre, descripcion, precio}║
   ╚══════════════════════════════════════════════════════════════════╝ */
const COMBOS_SEMANA = [
    {
        nombre: "Combo Mega Quesadilla",
        descripcion: "1/2 Sopa de tortilla + Mega Quesadilla + Bebida.",
        precio: "$5.50"
    },
    {
        nombre: "Combo Mini Torta",
        descripcion: "1/2 Sopa de tortilla + Mini Torta + Bebida.",
        precio: "$5.50"
    },
    {
        nombre: "Combo Nachos",
        descripcion: "1/2 Sopa de tortilla + 1/2 Orden de Nachos + Bebida.",
        precio: "$5.00"
    },
    {
        nombre: "Combo Tacos",
        descripcion: "1/2 Sopa de tortilla + 2 Tacos + Bebida.",
        precio: "$5.00"
    }
];
/* ── fin de la zona editable ──────────────────────────────────────── */


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

    /* ===== COMBO DE LA SEMANA (rotación automática · solo de martes a viernes) ===== */
    const comboBox = document.getElementById('comboSemana');
    if (comboBox && COMBOS_SEMANA.length) {
        const dia = new Date().getDay();           // 0 = domingo … 6 = sábado
        const enTemporada = dia >= 2 && dia <= 5;  // martes (2) a viernes (5)

        if (enTemporada) {
            const week = getWeekNumber(new Date());
            const combo = COMBOS_SEMANA[week % COMBOS_SEMANA.length];
            comboBox.querySelector('[data-combo="nombre"]').textContent = combo.nombre;
            comboBox.querySelector('[data-combo="descripcion"]').textContent = combo.descripcion;
            comboBox.querySelector('[data-combo="precio"]').textContent = combo.precio;
            comboBox.style.display = '';     // visible: respeta el display de tu CSS
        } else {
            comboBox.style.display = 'none'; // oculto sábado, domingo y lunes
        }
    }
});

/* Número de semana ISO — sirve para rotar el combo automáticamente */
function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const day = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - day);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}