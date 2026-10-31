/* =====================================================================
   PORTADA.JS — Transición de fotos de platillos en el hero (index.html)
   ---------------------------------------------------------------------
   • Cada pantalla usa las fotos que le quedan: en pantallas ANCHAS
     (compu, tablet acostada, celular acostado) las horizontales
     (data-vista="ancha"); en pantallas ALTAS (celular, tablet parada)
     las verticales (data-vista="alta"). Así la foto cubre toda la
     pantalla sin acercarse de más ni verse pixeleada.
     Si giras el celular o cambias el tamaño de la ventana, cambia solo.
   • Fundido cruzado real: la foto nueva aparece ENCIMA de la anterior,
     que se queda visible debajo hasta que la nueva está completa.
   • Cada foto se descarga justo antes de mostrarse (mientras se ve una,
     se va bajando la siguiente). Si una foto no carga, se salta.
   • Se pausa sola cuando la pestaña está oculta o el hero no se ve.
     Con "reducir movimiento" activado en el teléfono, se queda quieta
     en la primera foto.
   • Las fotos se definen en index.html (data-foto, data-vista y --pos).
     Aquí no hay que tocar nada para agregar fotos.
   ===================================================================== */
(() => {
    const hero  = document.getElementById('inicio');
    const marco = document.getElementById('heroSlides');
    if (!hero || !marco) return;

    const todas = Array.from(marco.querySelectorAll('.hero-slide[data-foto]'));
    if (!todas.length) return;

    /* ── Tiempos (ms) ── */
    const TIEMPO  = 5200;   // cuánto dura cada foto en pantalla (incluye el fundido)
    const FUNDIDO = 1400;   // cuánto tarda la foto nueva en aparecer

    hero.style.setProperty('--hero-tiempo', TIEMPO + 'ms');
    hero.style.setProperty('--hero-fundido', FUNDIDO + 'ms');

    const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pantallaAncha = window.matchMedia('(min-aspect-ratio: 1/1)');

    let slides = [];             // fotos de la vista actual (ancha o alta)
    let actual = 0;
    let timer = null;            // cambio a la siguiente foto
    let timerLimpiar = null;     // quita .is-prev cuando termina el fundido
    let avanzando = false;       // hay un cambio en curso (esperando que cargue la foto)
    let iniciado = false;        // ya terminó de cargar la página
    let enPantalla = true;
    let restante = TIEMPO;       // lo que le falta a la foto actual
    let inicioConteo = 0;
    let turno = 0;               // sube cada vez que cambia la vista (cancela cambios viejos)

    const elegirSlides = () => {
        const vista = pantallaAncha.matches ? 'ancha' : 'alta';
        const propias = todas.filter(s => s.dataset.vista === vista || s.dataset.vista === 'ambas' || !s.dataset.vista);
        return propias.length ? propias : todas;
    };

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

    const siguienteDe = (i) => {
        for (let paso = 1; paso <= slides.length; paso++) {
            const j = (i + paso) % slides.length;
            if (slides[j].dataset.estado !== 'error') return j;
        }
        return i;
    };

    /* Reinicia el zoom lento de una foto */
    const reiniciarZoom = (slide) => {
        slide.style.animation = 'none';
        void slide.offsetWidth;          // fuerza al navegador a "olvidar" la animación anterior
        slide.style.animation = '';
    };

    /* ── Cambio de foto ── */
    const mostrar = async (indice) => {
        const miTurno = turno;
        let intentos = slides.length;
        let nueva = slides[indice];
        // Si la foto no carga, se prueba con la siguiente
        while (!(await cargar(nueva)) && --intentos > 0) {
            if (miTurno !== turno) return;
            indice = siguienteDe(indice);
            nueva = slides[indice];
        }
        if (miTurno !== turno) return;   // mientras cargaba, se giró la pantalla
        const anterior = slides[actual];
        if (nueva === anterior || nueva.dataset.estado === 'error') return;

        todas.forEach(s => { if (s !== anterior && s !== nueva) s.classList.remove('is-active', 'is-prev'); });
        anterior.classList.remove('is-active');
        anterior.classList.add('is-prev');
        reiniciarZoom(nueva);
        nueva.classList.add('is-active');
        actual = indice;

        clearTimeout(timerLimpiar);
        timerLimpiar = setTimeout(() => anterior.classList.remove('is-prev'), FUNDIDO + 150);

        cargar(slides[siguienteDe(actual)]);   // va bajando la que sigue
    };

    /* ── Reloj: correr, pausar y reanudar ── */
    const debeCorrer = () => iniciado && !reducirMovimiento && enPantalla && !document.hidden && slides.length > 1;

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

    /* ── Poner la primera foto de la vista actual ── */
    const empezarVista = () => {
        turno++;
        clearTimeout(timer); timer = null;
        clearTimeout(timerLimpiar);
        avanzando = false;
        todas.forEach(s => s.classList.remove('is-active', 'is-prev'));
        slides = elegirSlides();
        actual = 0;
        const primera = slides[0];
        // La primera ya viene con <link rel="preload"> en el <head>: se pinta de una vez
        pintar(primera);
        cargar(primera);
        reiniciarZoom(primera);
        primera.classList.add('is-active');
        restante = TIEMPO;
        actualizar();
        if (iniciado && slides.length > 1) cargar(slides[siguienteDe(actual)]);
    };

    empezarVista();

    /* Al girar el celular o cambiar el tamaño de la ventana */
    const alCambiarVista = () => empezarVista();
    if (pantallaAncha.addEventListener) pantallaAncha.addEventListener('change', alCambiarVista);
    else if (pantallaAncha.addListener) pantallaAncha.addListener(alCambiarVista);

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
        restante = TIEMPO;
        actualizar();
        if (slides.length > 1) cargar(slides[siguienteDe(actual)]);
    };
    // Espera lo mismo que la pantalla de carga (loader.js deja ver la llama ~1.25 s)
    const arrancarTrasCarga = () => setTimeout(arrancar, reducirMovimiento ? 0 : Math.max(0, 1300 - performance.now()));
    hero.classList.add('is-paused');
    if (document.readyState === 'complete') arrancarTrasCarga();
    else window.addEventListener('load', arrancarTrasCarga, { once: true });
})();
