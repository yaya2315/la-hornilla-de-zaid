/* =====================================================================
   PORTADA.JS — Transición de fotos de platillos en el hero (index.html)
   ---------------------------------------------------------------------
   • Fundido cruzado real: la foto nueva aparece ENCIMA de la anterior,
     que se queda visible debajo hasta que la nueva está completa.
     Así ya no hay "parpadeo" oscuro entre una foto y otra.
   • Cada foto se descarga justo antes de mostrarse (mientras se ve una,
     se va bajando la siguiente). La página carga más rápido y gasta
     menos datos en el celular.
   • Si una foto no existe o no carga, se salta (no deja la pantalla negra).
   • Se pausa sola cuando la pestaña está oculta o el hero no se ve.
   • Botón para pausar / reanudar (accesibilidad WCAG 2.2.2).
     Con "reducir movimiento" activado en el teléfono, arranca en pausa.
   • Las fotos se definen en index.html: data-foto y --pos de cada
     .hero-slide. Aquí no hay que tocar nada para agregar fotos.
   ===================================================================== */
(() => {
    const hero   = document.getElementById('inicio');
    const marco  = document.getElementById('heroSlides');
    const boton  = document.getElementById('heroPausa');
    if (!hero || !marco) return;

    const slides = Array.from(marco.querySelectorAll('.hero-slide[data-foto]'));
    if (!slides.length) return;

    /* ── Tiempos (ms) ── */
    const TIEMPO  = 5200;   // cuánto dura cada foto en pantalla (incluye el fundido)
    const FUNDIDO = 1400;   // cuánto tarda la foto nueva en aparecer

    hero.style.setProperty('--hero-tiempo', TIEMPO + 'ms');
    hero.style.setProperty('--hero-fundido', FUNDIDO + 'ms');

    const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let actual = Math.max(0, slides.findIndex(s => s.classList.contains('is-active')));
    let timer = null;            // cambio a la siguiente foto
    let timerLimpiar = null;     // quita .is-prev cuando termina el fundido
    let avanzando = false;       // hay un cambio en curso (esperando que cargue la foto)
    let iniciado = false;        // ya terminó de cargar la página
    let pausadaPorUsuario = reducirMovimiento;
    let enPantalla = true;
    let restante = TIEMPO;       // lo que le falta a la foto actual
    let inicioConteo = 0;

    /* ── Carga de fotos ── */
    const pintar = (slide) => { slide.style.backgroundImage = `url("${slide.dataset.foto}")`; };

    const cargar = (slide) => {
        if (slide._carga) return slide._carga;
        slide._carga = new Promise((resolve) => {
            const img = new Image();
            img.decoding = 'async';
            img.onload = () => {
                const listo = () => { pintar(slide); slide.dataset.estado = 'lista'; resolve(true); };
                (img.decode ? img.decode() : Promise.resolve()).then(listo, listo);
            };
            img.onerror = () => {
                slide.dataset.estado = 'error';
                console.warn('[portada] No se encontró la foto:', slide.dataset.foto);
                resolve(false);
            };
            img.src = slide.dataset.foto;
        });
        return slide._carga;
    };

    // La primera se pinta de inmediato (ya viene con <link rel="preload"> en el <head>)
    pintar(slides[actual]);
    slides[actual].classList.add('is-active');

    const siguienteDe = (i) => {
        for (let paso = 1; paso <= slides.length; paso++) {
            const j = (i + paso) % slides.length;
            if (slides[j].dataset.estado !== 'error') return j;
        }
        return i;
    };

    /* Reinicia una animación CSS (zoom de la foto o anillo del botón) */
    const reiniciar = (el, clase) => {
        el.classList.remove(clase);
        void el.offsetWidth;          // fuerza al navegador a "olvidar" la animación anterior
        el.classList.add(clase);
    };
    const reiniciarZoom = (slide) => {
        slide.style.animation = 'none';
        void slide.offsetWidth;
        slide.style.animation = '';
    };

    /* ── Cambio de foto ── */
    const mostrar = async (indice) => {
        let intentos = slides.length;
        let nueva = slides[indice];
        // Si la foto no carga, se prueba con la siguiente
        while (!(await cargar(nueva)) && --intentos > 0) {
            indice = siguienteDe(indice);
            nueva = slides[indice];
        }
        const anterior = slides[actual];
        if (nueva === anterior || nueva.dataset.estado === 'error') return;

        slides.forEach(s => { if (s !== anterior && s !== nueva) s.classList.remove('is-active', 'is-prev'); });
        anterior.classList.remove('is-active');
        anterior.classList.add('is-prev');
        reiniciarZoom(nueva);
        nueva.classList.add('is-active');
        actual = indice;

        clearTimeout(timerLimpiar);
        timerLimpiar = setTimeout(() => anterior.classList.remove('is-prev'), FUNDIDO + 150);

        if (boton) reiniciar(boton, 'is-run');
        cargar(slides[siguienteDe(actual)]);   // va bajando la que sigue
    };

    /* ── Reloj: correr, pausar y reanudar ── */
    const debeCorrer = () => iniciado && !pausadaPorUsuario && enPantalla && !document.hidden;

    const avanzar = async () => {
        timer = null;
        avanzando = true;
        await mostrar(siguienteDe(actual));
        avanzando = false;
        restante = TIEMPO;
        actualizar();
    };

    const actualizar = () => {
        const corre = debeCorrer();
        hero.classList.toggle('is-paused', !corre);
        hero.classList.toggle('is-stopped', pausadaPorUsuario);
        if (avanzando) return;
        if (corre && !timer) {
            inicioConteo = performance.now();
            timer = setTimeout(avanzar, restante);
        } else if (!corre && timer) {
            clearTimeout(timer);
            timer = null;
            restante = Math.max(0, restante - (performance.now() - inicioConteo));
        }
    };

    /* ── Botón pausar / reanudar ── */
    if (boton) {
        boton.hidden = false;
        const etiquetar = () => {
            boton.setAttribute('aria-label', pausadaPorUsuario ? 'Reanudar fotos de platillos' : 'Pausar fotos de platillos');
        };
        etiquetar();
        boton.addEventListener('click', () => {
            pausadaPorUsuario = !pausadaPorUsuario;
            etiquetar();
            actualizar();
        });
    }

    /* ── Pausa automática: pestaña oculta o hero fuera de la pantalla ── */
    document.addEventListener('visibilitychange', actualizar);
    if ('IntersectionObserver' in window) {
        new IntersectionObserver((entradas) => {
            enPantalla = entradas[0].isIntersecting;
            actualizar();
        }, { threshold: 0.1 }).observe(hero);
    }

    /* ── Arranque: cuando termina de cargar la página (sale la pantalla del fueguito) ── */
    const arrancar = () => {
        if (iniciado) return;
        iniciado = true;
        reiniciarZoom(slides[actual]);          // el zoom de la 1.ª foto empieza cuando ya se ve
        if (boton) reiniciar(boton, 'is-run');
        restante = TIEMPO;
        actualizar();
        if (slides.length > 1) cargar(slides[siguienteDe(actual)]);
    };
    // Espera lo mismo que la pantalla de carga (loader.js deja ver la llama ~1.25 s)
    const arrancarTrasCarga = () => setTimeout(arrancar, reducirMovimiento ? 0 : Math.max(0, 1300 - performance.now()));
    hero.classList.add('is-paused');
    hero.classList.toggle('is-stopped', pausadaPorUsuario);
    if (document.readyState === 'complete') arrancarTrasCarga();
    else window.addEventListener('load', arrancarTrasCarga, { once: true });
})();
