/* =====================================================================
   PORTADA.JS — Transición de fotos de platillos en el hero (index.html)
   ---------------------------------------------------------------------
   • Cada foto se ve completa y centrada, con aire alrededor; detrás va
     la misma foto difuminada (lo dibuja CSS/inicio.css).
   • Fundido cruzado real: la foto nueva aparece ENCIMA de la anterior,
     que se queda visible debajo hasta que la nueva está completa.
     Así no hay "parpadeo" oscuro entre una foto y otra.
   • Cada foto se descarga justo antes de mostrarse (mientras se ve una,
     se va bajando la siguiente): la página carga más rápido y gasta
     menos datos en el celular.
   • Si una foto no existe o no carga, se salta (no deja la pantalla negra).
   • Se pausa sola cuando la pestaña está oculta o el hero no se ve.
     Con "reducir movimiento" activado en el teléfono, queda fija la primera.
   • Las fotos se definen en index.html: data-foto (y --ar) de cada
     .hero-slide. Aquí no hay que tocar nada para agregar fotos.
   ===================================================================== */
(() => {
    const hero  = document.getElementById('inicio');
    const marco = document.getElementById('heroSlides');
    if (!hero || !marco) return;

    const slides = Array.from(marco.querySelectorAll('.hero-slide[data-foto]'));
    if (!slides.length) return;

    /* ── Tiempos (ms) ── */
    const TIEMPO  = 5200;   // cuánto dura cada foto en pantalla (incluye el fundido)
    const FUNDIDO = 1400;   // cuánto tarda la foto nueva en aparecer

    hero.style.setProperty('--hero-tiempo', TIEMPO + 'ms');
    hero.style.setProperty('--hero-fundido', FUNDIDO + 'ms');

    const fija = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let actual = Math.max(0, slides.findIndex(s => s.classList.contains('is-active')));
    let timer = null;            // cambio a la siguiente foto
    let timerLimpiar = null;     // quita .is-prev cuando termina el fundido
    let avanzando = false;       // hay un cambio en curso (esperando que cargue la foto)
    let iniciado = false;        // ya terminó de cargar la página
    let enPantalla = true;
    let restante = TIEMPO;       // lo que le falta a la foto actual
    let inicioConteo = 0;

    /* ── Fotos ── */
    // Ruta completa (así la entiende igual el HTML que el CSS)
    const pintar = (slide) => {
        const url = new URL(slide.dataset.foto, document.baseURI).href;
        slide.style.setProperty('--foto', `url("${url}")`);
    };

    const cargar = (slide) => {
        if (slide._carga) return slide._carga;
        slide._carga = new Promise((resolve) => {
            const img = new Image();
            img.decoding = 'async';
            img.onload = () => {
                // Si en index.html no viene --ar, se calcula con el tamaño real de la foto
                if (!slide.style.getPropertyValue('--ar') && img.naturalHeight) {
                    slide.style.setProperty('--ar', (img.naturalWidth / img.naturalHeight).toFixed(3));
                }
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

    /* Reinicia el movimiento suave de una foto */
    const reiniciarMovimiento = (slide) => {
        slide.classList.add('reinicio');
        void slide.offsetWidth;       // fuerza al navegador a "olvidar" la animación anterior
        slide.classList.remove('reinicio');
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
        reiniciarMovimiento(nueva);
        nueva.classList.add('is-active');
        actual = indice;

        clearTimeout(timerLimpiar);
        timerLimpiar = setTimeout(() => anterior.classList.remove('is-prev'), FUNDIDO + 150);

        cargar(slides[siguienteDe(actual)]);   // va bajando la que sigue
    };

    /* ── Reloj: correr, pausar y reanudar ── */
    const debeCorrer = () => iniciado && !fija && enPantalla && !document.hidden;

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
        reiniciarMovimiento(slides[actual]);    // el movimiento de la 1.ª foto empieza cuando ya se ve
        restante = TIEMPO;
        actualizar();
        cargar(slides[actual]);                 // confirma la 1.ª (y su proporción si faltaba --ar)
        if (slides.length > 1 && !fija) cargar(slides[siguienteDe(actual)]);
    };
    // Espera lo mismo que la pantalla de carga (loader.js deja ver la llama ~1.25 s)
    const arrancarTrasCarga = () => setTimeout(arrancar, fija ? 0 : Math.max(0, 1300 - performance.now()));
    hero.classList.add('is-paused');
    if (document.readyState === 'complete') arrancarTrasCarga();
    else window.addEventListener('load', arrancarTrasCarga, { once: true });
})();
