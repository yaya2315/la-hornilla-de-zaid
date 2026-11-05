/* =====================================================================
   INICIO.JS — La Hornilla de Zaid (portada estática)
   ---------------------------------------------------------------------
   • Menú como colección: tarjetas con los precios del admin (Firestore,
     lectura REST sin cargar Firebase). Si falla, usa el respaldo de abajo.
   • Ticket (interacción firma): cada "Lo quiero" imprime una línea. Usa el
     MISMO carrito que la página Pedir (sessionStorage "hornilla_carrito"),
     con los mismos nombres de línea ("1 Orden de tacos de birria").
   • Reseñas reales aprobadas y formulario (llega como "pendiente").
   • Visor 3D: solo si existe Imagenes/modelos-3d/<platillo>.glb, y el
     visor (JS/vendor/model-viewer.min.js) se baja únicamente al usarlo.
   ===================================================================== */
(function () {
  'use strict'

  var WHATSAPP = '50370991660'
  var FS = 'https://firestore.googleapis.com/v1/projects/la-hornilla-de-zaid/databases/(default)/documents'
  var CLAVE_API = 'AIzaSyC6Dl3tFN7AqEnSDwd7wVmL0pmx_PN0WYg' // misma clave pública de JS/firebase-config.js
  var CLAVE_CARRITO = 'hornilla_carrito'
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches

  /* ── Platillos: fotos, slug y modelo 3D ─────────────────────────── */
  var F = 'Imagenes/fotos-de-platillos/'
  var INFO = {
    tacos:       { slug: 'tacos',       foto: F + 'tacos/tacos-01-mesa-tarjeta.webp', alt: 'Orden de cuatro tacos con cilantro, cebolla y limón' },
    burrito:     { slug: 'burrito',     foto: F + 'burritos/burrito-03-abierto-tarjeta.webp', alt: 'Burrito abierto relleno de carne y vegetales' },
    tortas:      { slug: 'tortas',      foto: F + 'tortas/torta-01-cenital-tarjeta.webp', alt: 'Torta partida a la mitad vista desde arriba' },
    quesadillas: { slug: 'quesadillas', foto: F + 'quesadillas/quesadillas-01-para-llevar-centrada-tarjeta.webp', alt: 'Tres quesadillas en caja para llevar con salsas' },
    nachos:      { slug: 'nachos',      foto: F + 'nachos/nachos-02-para-llevar-tarjeta.webp', alt: 'Nachos con carne, queso, crema y pico de gallo' },
    'sopa de tortilla': { slug: 'sopa', foto: F + 'Sopas/sopa-de-tortilla-02-tazon-tarjeta.webp', alt: 'Tazón de sopa de tortilla con queso, cilantro y limón' },
    'papa asada': { slug: 'papa',       foto: F + 'papa-asada/papa-asada-01-mesa-sin-marca-tarjeta.webp', alt: 'Papa asada con queso gratinado, carne y salsa de aguacate' },
  }
  /* Modelos 3D: se leen de Imagenes/modelos-3d/lista.json (la misma lista
     la usan Menú y Pedir). Si un platillo no está en la lista, no se muestra
     el botón 3D y no se pide ningún archivo. */
  var MODELO = {}
  var listaModelos = null
  function cargarListaModelos() {
    if (!listaModelos) listaModelos = fetch('Imagenes/modelos-3d/lista.json', { cache: 'no-cache' }).then(function (r) { return r.ok ? r.json() : {} })
      .then(function (j) { var m = (j && j.modelos) || {}; for (var k in m) MODELO[k] = 'Imagenes/modelos-3d/' + m[k]; return MODELO }).catch(function () { return MODELO })
    return listaModelos
  }
  var POR_ORDEN = ['tacos', 'quesadillas']
  var CARNE_GRUPO = ['tacos', 'burrito', 'tortas', 'nachos', 'quesadillas']
  var CARNE_APARTE = ['sopa de tortilla']
  var CARNES = ['Pastor', 'Pollo pastor', 'Suadero', 'Cochinita pibil', 'Birria']

  /* Respaldo = lo que tiene el admin hoy (si Firestore no responde) */
  function V(lista, normal, especial) {
    return lista.map(function (t, i) { return { texto: t, precio: i < 4 ? normal : especial } })
  }
  var CARNES_V = ['Pastor', 'Pollo pastor', 'Suadero', 'Mixto', 'Birria', 'Cochinita pibil', 'Mixto']
  var RESPALDO = [
    { nombre: 'Tacos', categoria: 'Tacos', nota: 'Orden de 4', orden: 1, variantes: V(CARNES_V, '$4.99', '$5.99') },
    { nombre: 'Burrito', categoria: 'Burrito', orden: 2, variantes: V(CARNES_V, '$4.99', '$5.99') },
    { nombre: 'Tortas', categoria: 'Tortas', orden: 3, variantes: V(CARNES_V, '$4.99', '$5.99') },
    { nombre: 'Nachos', categoria: 'Nachos', orden: 4, variantes: V(CARNES_V, '$4.50', '$5.50') },
    { nombre: 'Quesadillas', categoria: 'Quesadillas', nota: 'Orden de 3', orden: 5, variantes: V(CARNES_V, '$4.99', '$5.99') },
    { nombre: 'Sopa de tortilla', categoria: 'Sopa de tortilla', nota: 'Carne a elección', orden: 6, carneModo: 'eleccion',
      variantes: [{ texto: 'Media (16 oz)', precio: '$3.00' }, { texto: 'Entera (32 oz)', precio: '$5.00' }] },
    { nombre: 'Papa asada', categoria: 'Lo nuevo', destacado: true, etiqueta: 'Lo nuevo', precioUnico: '$5.50', carneModo: 'eleccion', orden: 7, nota: 'Carne a elección',
      descripcion: 'Papa asada con queso gratinado y cheddar, crema, tu carne, pico de gallo y salsa de aguacate.' },
  ]

  /* ── Utilidades ─────────────────────────────────────────────────── */
  var $ = function (s, r) { return (r || document).querySelector(s) }
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)) }
  var dinero = function (n) { return '$' + n.toFixed(2) }
  var leerPrecio = function (t) { var n = parseFloat(String(t || '').replace(/[^0-9.]/g, '')); return isFinite(n) ? n : 0 }
  var minus = function (t) { return t.charAt(0).toLowerCase() + t.slice(1) }
  var llevaPina = function (c) { return String(c || '').toLowerCase().indexOf('pastor') >= 0 }
  var esc = function (t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] }) }
  var medir = function (n, p) { try { window.hornillaTrack && window.hornillaTrack(n, p || {}) } catch (e) {} }
  var clave = function (p) { return String(p.categoria || p.nombre || '').toLowerCase().trim() }
  function infoDe(p) { return INFO[clave(p)] || INFO[String(p.nombre || '').toLowerCase().trim()] || { slug: clave(p).replace(/\W+/g, '-'), foto: '', alt: p.nombre } }
  function tipoDe(p) {
    if (p.destacado) return 'destacado'
    var c = clave(p)
    if (CARNE_GRUPO.indexOf(c) >= 0) return 'carne-grupo'
    if (CARNE_APARTE.indexOf(c) >= 0) return 'carne-aparte'
    return 'simple'
  }

  /* ── Carrito (mismo formato que Pedir) ──────────────────────────── */
  function leerCarrito() { try { var r = sessionStorage.getItem(CLAVE_CARRITO); return r ? JSON.parse(r) : [] } catch (e) { return [] } }
  function guardarCarrito(l) { try { sessionStorage.setItem(CLAVE_CARRITO, JSON.stringify(l)) } catch (e) {} }
  var carrito = leerCarrito()
  function agregar(nombre, precio, cantidad) {
    var i = carrito.findIndex(function (x) { return x.nombre === nombre && x.precioUnitario === precio })
    if (i >= 0) carrito[i].cantidad += cantidad
    else carrito.push({ id: Date.now() + Math.random(), nombre: nombre, precioUnitario: precio, cantidad: cantidad })
    guardarCarrito(carrito)
    pintarTicket(nombre)
  }
  function quitar(i) { carrito.splice(i, 1); guardarCarrito(carrito); pintarTicket() }
  function subtotal() { return carrito.reduce(function (s, x) { return s + x.precioUnitario * x.cantidad }, 0) }
  function piezas() { return carrito.reduce(function (s, x) { return s + x.cantidad }, 0) }
  function textoLinea(c, n) {
    if (c > 1) n = n.replace(/^Orden de /, 'Órdenes de ')
    else if (n === 'tacos mixtos') n = 'taco mixto'
    return c + ' ' + n
  }
  var verLinea = function (t) { return t.replace(/ — /g, ' · ') } // en pantalla, sin rayas largas

  function mensajeWhatsApp() {
    if (!carrito.length) return '¡Hola! Quiero hacer un pedido.'
    var p = ['¡Hola! Mucho gusto, este sería mi pedido:', '']
    carrito.forEach(function (l) { p.push(textoLinea(l.cantidad, l.nombre) + ' — ' + dinero(l.precioUnitario * l.cantidad)) })
    p.push('', 'Subtotal: ' + dinero(subtotal()), 'Total estimado: ' + dinero(subtotal()) + ' (sin envío)', '', 'Tipo de pedido: Delivery', '', 'Te paso mi nombre y mi dirección por aquí.')
    return p.join('\n')
  }
  function enlaceWhatsApp() { return 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(mensajeWhatsApp()) }

  /* ── Ticket fijo + ticket del cierre ────────────────────────────── */
  var ticket = $('#ticketFijo'), cabeza = $('#ticketCabeza'), cuerpo = $('#ticketCuerpo')
  function htmlLineas(recien) {
    return '<ul class="ticket-lineas">' + carrito.map(function (l, i) {
      return '<li class="ticket-linea' + (l.nombre === recien ? ' recien' : '') + '"><span>' + esc(verLinea(textoLinea(l.cantidad, l.nombre))) + '</span>' +
        '<span class="precio">' + dinero(l.precioUnitario * l.cantidad) + '</span>' +
        '<button type="button" data-quitar="' + i + '" aria-label="Quitar ' + esc(verLinea(l.nombre)) + '">×</button></li>'
    }).join('') + '</ul>' +
      '<div class="ticket-total"><span>Total estimado</span><span class="precio">' + dinero(subtotal()) + '</span></div>' +
      '<p class="ticket-nota">Sin envío: lo cobra el servicio de delivery aparte.</p>'
  }
  function htmlAcciones() {
    return '<div class="ticket-acciones"><a class="btn btn--rojo" target="_blank" rel="noopener" data-whatsapp href="' + esc(enlaceWhatsApp()) + '">Pedir por WhatsApp</a>' +
      '<a class="enlace" href="HTML/pedido.html">o termina tu pedido en Pedir, con mapa</a></div>'
  }
  function pintarTicket(recien) {
    var n = piezas()
    ticket.classList.toggle('esta-vacio', n === 0)
    $('#ticketResumen').textContent = n ? 'Tu pedido · ' + n + (n === 1 ? ' cosa' : ' cosas') : 'Tu pedido'
    $('#ticketSubtotal').textContent = dinero(subtotal())
    cuerpo.innerHTML = n ? htmlLineas(recien) + htmlAcciones() : ''
    var cierre = $('#cierreContenido')
    cierre.innerHTML = n ? htmlLineas() + htmlAcciones()
      : '<p class="cierre__vacio">Aún no elegiste nada. Escríbenos y te ayudamos a escoger, o arma tu pedido en el menú.</p>' + htmlAcciones()
    $$('[data-whatsapp]').forEach(function (a) { a.href = enlaceWhatsApp() })
    if (recien && !reduce) { abrirTicket(true) }
  }
  function abrirTicket(abrir) {
    ticket.classList.toggle('esta-abierto', abrir)
    cabeza.setAttribute('aria-expanded', String(abrir))
    cuerpo.hidden = !abrir
  }
  cabeza.addEventListener('click', function () { abrirTicket(cabeza.getAttribute('aria-expanded') !== 'true') })
  document.addEventListener('click', function (e) {
    var q = e.target.closest && e.target.closest('[data-quitar]')
    if (q) { quitar(+q.getAttribute('data-quitar')); return }
    var w = e.target.closest && e.target.closest('[data-whatsapp]')
    if (w) medir('pedido_whatsapp', { origen: 'inicio', piezas: piezas(), value: Number(subtotal().toFixed(2)), currency: 'USD' })
    var m = e.target.closest && e.target.closest('[data-medir]')
    if (m) medir(m.getAttribute('data-medir'), { origen: 'inicio' })
  })
  /* El ticket fijo se esconde cuando el ticket del cierre está en pantalla */
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { ticket.classList.toggle('en-cierre', es[0].isIntersecting) }, { threshold: 0.25 }).observe($('#cierre'))
  }

  /* ── Tarjetas del menú ──────────────────────────────────────────── */
  function opcionesDe(p, tipo) {
    if (tipo === 'destacado') return [{ texto: '', precio: leerPrecio(p.precioUnico) }]
    var vs = (p.variantes && p.variantes.length) ? p.variantes : [{ texto: '', precio: '0' }]
    return vs.map(function (v) { return { texto: v.texto, precio: leerPrecio(v.precio) } })
  }
  function rango(op) {
    var ps = op.map(function (o) { return o.precio }).filter(function (x) { return x > 0 })
    var a = Math.min.apply(null, ps), b = Math.max.apply(null, ps)
    return { min: a, max: b }
  }
  function tarjeta(p, i) {
    var tipo = tipoDe(p), info = infoDe(p), op = opcionesDe(p, tipo), r = rango(op), id = 'p-' + info.slug
    var pideCarne = tipo === 'carne-aparte' || ((tipo === 'destacado' || tipo === 'simple') && p.carneModo === 'eleccion')
    var datos = []
    if (p.nota && p.nota !== 'Carne a elección') datos.push(esc(p.nota))
    if (tipo === 'carne-grupo') datos.push('Desde <span class="precio">' + dinero(r.min) + '</span>' + (r.max > r.min ? ' · birria o cochinita <span class="precio">' + dinero(r.max) + '</span>' : ''))
    else if (tipo === 'carne-aparte') datos.push(op.map(function (o) { return esc(o.texto) + ' <span class="precio">' + dinero(o.precio) + '</span>' }).join(' · '))
    else datos.push('<span class="precio">' + dinero(r.min) + '</span>')
    if (p.descripcion) datos.push(esc(p.descripcion))
    if (pideCarne) datos.push('Carne a elección')
    var sel = ''
    if (op.length > 1) {
      sel += '<label class="rot" for="' + id + '-o">' + (tipo === 'carne-aparte' ? 'Tamaño' : tipo === 'carne-grupo' ? 'Carne' : 'Opción') + '</label>' +
        '<select id="' + id + '-o" data-campo="opcion">' + op.map(function (o, k) { return '<option value="' + k + '">' + esc(o.texto) + ' · ' + dinero(o.precio) + '</option>' }).join('') + '</select>'
    }
    if (pideCarne) {
      sel += '<label class="rot" for="' + id + '-c">Carne</label><select id="' + id + '-c" data-campo="carne">' + CARNES.map(function (c) { return '<option>' + c + '</option>' }).join('') + '</select>'
    }
    return '<article class="plato" id="plato-' + info.slug + '" data-slug="' + info.slug + '" data-i="' + i + '" style="--i:' + i + '" aria-labelledby="' + id + '-t">' +
      '<div class="plato__foto">' + (info.foto ? '<img src="' + info.foto + '" width="720" height="450" loading="lazy" decoding="async" alt="' + esc(info.alt) + '">' : '') +
      '<button class="boton-3d plato__3d" type="button" data-ver3d="' + info.slug + '" data-nombre="' + esc(p.nombre) + '" hidden>Ver en 3D</button></div>' +
      '<div class="plato__cuerpo"><h3 id="' + id + '-t">' + esc(p.nombre) + '</h3><p class="plato__datos">' + datos.join('<br>') + '</p>' +
      '<div class="plato__controles">' + sel +
      '<label class="pina" hidden><input type="checkbox" data-campo="pina"> Con piña</label>' +
      '<div class="plato__fila"><div class="contador" role="group" aria-label="Cantidad de ' + esc(p.nombre) + '">' +
      '<button type="button" data-paso="-1" aria-label="Quitar uno">−</button><output aria-live="polite">1</output><button type="button" data-paso="1" aria-label="Agregar uno">+</button></div>' +
      '<button class="btn btn--rojo plato__quiero" type="button" data-quiero>Lo quiero</button></div></div></div></article>'
  }

  var carta = RESPALDO.slice()
  var platos = $('#platos')
  function pintarCarta(lista) {
    carta = lista
    platos.innerHTML = lista.map(tarjeta).join('')
    $$('.plato').forEach(prepararTarjeta)
    actualizarPreciosSueltos()
    marcarModelos()
  }
  function prepararTarjeta(el) {
    var p = carta[+el.getAttribute('data-i')], tipo = tipoDe(p), op = opcionesDe(p, tipo)
    var pideCarne = tipo === 'carne-aparte' || ((tipo === 'destacado' || tipo === 'simple') && p.carneModo === 'eleccion')
    var selO = $('[data-campo="opcion"]', el), selC = $('[data-campo="carne"]', el), pina = $('.pina', el), chk = $('[data-campo="pina"]', el)
    var out = $('output', el), cant = 1
    function carneActual() { return pideCarne ? selC.value : tipo === 'carne-grupo' ? op[selO ? +selO.value : 0].texto : (p.carneModo === 'fija' ? p.carneFija || '' : '') }
    function revisarPina() { var ok = llevaPina(carneActual()); pina.hidden = !ok; if (!ok) chk.checked = false }
    if (selO) selO.addEventListener('change', revisarPina)
    if (selC) selC.addEventListener('change', revisarPina)
    revisarPina()
    $$('[data-paso]', el).forEach(function (b) {
      b.addEventListener('click', function () { cant = Math.max(1, Math.min(20, cant + +b.getAttribute('data-paso'))); out.textContent = cant })
    })
    $('[data-quiero]', el).addEventListener('click', function (e) {
      var o = op[selO ? +selO.value : 0], c = carneActual(), extra = (llevaPina(c) && chk.checked) ? ' con piña' : ''
      var n
      if (tipo === 'carne-grupo' && POR_ORDEN.indexOf(clave(p)) >= 0) n = 'Orden de ' + minus(p.nombre) + ' de ' + c.toLowerCase() + extra
      else if (tipo === 'carne-grupo') n = p.nombre + ' de ' + c + extra
      else if (tipo === 'carne-aparte') n = p.nombre + ' — ' + o.texto + ' — de ' + c + extra
      else if (c) n = p.nombre + ' de ' + c + extra
      else n = o.texto ? p.nombre + ' — ' + o.texto : p.nombre
      agregar(n, o.precio, cant)
      medir('agregar_inicio', { platillo: p.nombre, cantidad: cant })
      var b = e.currentTarget; b.textContent = '¡Al ticket!'; setTimeout(function () { b.textContent = 'Lo quiero' }, 900)
      cant = 1; out.textContent = 1
    })
  }
  function actualizarPreciosSueltos() {
    var t = carta.find(function (p) { return clave(p) === 'tacos' })
    if (!t) return
    var r = rango(opcionesDe(t, 'carne-grupo'))
    $$('[data-precio-desde="tacos"], [data-precio-normal="tacos"]').forEach(function (e) { e.textContent = dinero(r.min) })
    $$('[data-precio-especial="tacos"]').forEach(function (e) { e.textContent = dinero(r.max) })
  }

  /* Lectura REST de Firestore (sin cargar el SDK de Firebase) */
  function valor(x) {
    if (!x) return null
    if ('stringValue' in x) return x.stringValue
    if ('integerValue' in x) return +x.integerValue
    if ('doubleValue' in x) return x.doubleValue
    if ('booleanValue' in x) return x.booleanValue
    if ('timestampValue' in x) return x.timestampValue
    if ('arrayValue' in x) return (x.arrayValue.values || []).map(valor)
    if ('mapValue' in x) { var o = {}, f = x.mapValue.fields || {}; for (var k in f) o[k] = valor(f[k]); return o }
    return null
  }
  function documento(d) { var o = {}, f = d.fields || {}; for (var k in f) o[k] = valor(f[k]); return o }
  function cargarCarta() {
    return fetch(FS + '/menuPrincipal?pageSize=100&key=' + CLAVE_API).then(function (r) { if (!r.ok) throw r.status; return r.json() }).then(function (j) {
      var l = (j.documents || []).map(documento).filter(function (p) { return p.activo !== false })
      l.sort(function (a, b) { return (a.orden == null ? 1e9 : +a.orden) - (b.orden == null ? 1e9 : +b.orden) })
      return l.length ? l : null
    }).catch(function () { return null })
  }

  /* ── Saltos del índice al platillo dentro del riel ──────────────── */
  var engine = null
  function irAPlato(slug, enfocar) {
    var act = $('#menu'), riel = $('#riel'), el = $('#plato-' + slug)
    if (!act || !el) return
    var top = act.getBoundingClientRect().top + scrollY, alto = act.offsetHeight, vh = innerHeight
    var over = riel.scrollWidth - innerWidth
    if (reduce || over <= 0 || getComputedStyle(riel).transform === 'none' && reduce) { el.scrollIntoView({ block: 'center', inline: 'center' }); return }
    var x = el.offsetLeft - (innerWidth - el.offsetWidth) / 2
    var p = Math.max(0, Math.min(1, x / (over * 1.04)))
    window.scrollTo({ top: Math.round(top + p * Math.max(alto - vh, 1)), behavior: enfocar ? 'instant' : 'smooth' })
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-salto]')
    if (!a) return
    e.preventDefault()
    irAPlato(a.getAttribute('data-salto'))
    history.replaceState(null, '', '#plato-' + a.getAttribute('data-salto'))
  })
  /* Teclado dentro del riel: lleva la tarjeta enfocada a la vista */
  document.addEventListener('focusin', function (e) {
    var t = e.target.closest && e.target.closest('.plato')
    if (!t) return
    var r = t.getBoundingClientRect()
    if (r.left < 0 || r.right > innerWidth) irAPlato(t.getAttribute('data-slug'), true)
  })

  /* ── Barra sólida al dejar el héroe ─────────────────────────────── */
  var barra = $('#barra')
  function revisarBarra() { barra.classList.toggle('es-solida', scrollY > innerHeight * 0.5) }
  addEventListener('scroll', revisarBarra, { passive: true }); revisarBarra()

  /* ── Vapor: pausar cuando no se ve ──────────────────────────────── */
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      es.forEach(function (x) { $$('.vapor-hebra', x.target).forEach(function (h) { h.style.animationPlayState = x.isIntersecting ? 'running' : 'paused' }) })
    }).observe($('.heroe'))
  }

  /* ── 3D: solo si el archivo existe ──────────────────────────────── */
  function hayModelo(slug) { return cargarListaModelos().then(function () { return !!MODELO[slug] }) }
  var visorListo = null
  function cargarVisor() {
    if (!visorListo) visorListo = new Promise(function (ok, ko) {
      if (window.customElements && customElements.get('model-viewer')) return ok()
      var s = document.createElement('script'); s.type = 'module'; s.src = 'JS/vendor/model-viewer.min.js'
      s.onload = function () { customElements.whenDefined('model-viewer').then(ok) }; s.onerror = ko
      document.head.appendChild(s)
    })
    return visorListo
  }
  function marcarModelos() {
    $$('[data-ver3d]').forEach(function (b) { hayModelo(b.getAttribute('data-ver3d')).then(function (ok) { b.hidden = !ok }) })
  }
  var dlg3d = $('#visor3d')
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-ver3d]')
    if (!b) return
    var slug = b.getAttribute('data-ver3d')
    $('#visor3dTitulo').textContent = b.getAttribute('data-nombre') + ' en 3D'
    var lienzo = $('#visor3dLienzo')
    lienzo.innerHTML = '<p style="display:grid;place-items:center;height:100%;margin:0">Cargando modelo…</p>'
    dlg3d.showModal()
    medir('ver_3d', { platillo: slug })
    cargarVisor().then(function () {
      lienzo.innerHTML = '<model-viewer src="' + MODELO[slug] + '" alt="Modelo 3D aproximado de ' + esc(b.getAttribute('data-nombre')) + '" camera-controls touch-action="pan-y" ' +
        (reduce ? '' : 'auto-rotate rotation-per-second="18deg" ') + 'shadow-intensity="0.9" exposure="1.05" ar ar-modes="webxr scene-viewer quick-look" interaction-prompt="none"></model-viewer>'
    }).catch(function () { lienzo.innerHTML = '<p style="display:grid;place-items:center;height:100%;margin:0">No se pudo cargar el visor 3D.</p>' })
  })
  $$('dialog [data-cerrar]').forEach(function (b) { b.addEventListener('click', function () { b.closest('dialog').close() }) })
  dlg3d.addEventListener('close', function () { $('#visor3dLienzo').innerHTML = '' })

  /* El pico: si hay modelo de tacos, gira con el scroll */
  var giroAct = $('#giro'), giroIniciado = false
  function iniciarGiro() {
    if (giroIniciado) return; giroIniciado = true
    hayModelo('tacos').then(function (ok) {
      if (!ok) return
      cargarVisor().then(function () {
        var escena = $('#giroEscena'), foto = $('#giroFoto')
        var mv = document.createElement('model-viewer')
        mv.setAttribute('src', MODELO.tacos); mv.setAttribute('alt', 'Modelo 3D aproximado de la orden de tacos')
        mv.setAttribute('interaction-prompt', 'none'); mv.setAttribute('disable-zoom', ''); mv.setAttribute('shadow-intensity', '1')
        mv.setAttribute('exposure', '1.05'); mv.setAttribute('camera-orbit', '-30deg 72deg auto'); mv.setAttribute('loading', 'eager')
        mv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%'
        mv.addEventListener('load', function () {
          foto.style.transition = 'opacity 400ms'; foto.style.opacity = '0'
          $('#giroNota').textContent = 'Modelo 3D aproximado, hecho con IA a partir de nuestra foto real.'
          var ultimo = -1
          ;(function vuelta() {
            var p = parseFloat(getComputedStyle(giroAct).getPropertyValue('--sc-p')) || 0
            if (Math.abs(p - ultimo) > 0.001) { ultimo = p; mv.cameraOrbit = (-30 + p * 360).toFixed(1) + 'deg ' + (74 - p * 12).toFixed(1) + 'deg auto' }
            requestAnimationFrame(vuelta)
          })()
        })
        escena.appendChild(mv)
      })
    })
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { if (es[0].isIntersecting) iniciarGiro() }, { rootMargin: '120% 0px' }).observe(giroAct)
  }

  /* ── Reseñas reales ─────────────────────────────────────────────── */
  var resenasCargadas = false
  function cargarResenas() {
    if (resenasCargadas) return; resenasCargadas = true
    var q = { structuredQuery: { from: [{ collectionId: 'resenas' }], where: { fieldFilter: { field: { fieldPath: 'estado' }, op: 'EQUAL', value: { stringValue: 'aprobada' } } } } }
    fetch(FS + ':runQuery?key=' + CLAVE_API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(q) })
      .then(function (r) { return r.ok ? r.json() : [] })
      .then(function (filas) {
        var l = (filas || []).filter(function (f) { return f.document }).map(function (f) { return documento(f.document) })
        l.sort(function (a, b) { return String(b.creado || '').localeCompare(String(a.creado || '')) })
        pintarResenas(l.slice(0, 3))
      }).catch(function () { pintarResenas([]) })
  }
  function pintarResenas(l) {
    var ul = $('#resenas')
    $('#resenasVacio').hidden = l.length > 0
    ul.innerHTML = l.map(function (r) {
      var n = Math.max(1, Math.min(5, +r.estrellas || 5))
      return '<li class="resena"><figure style="margin:0"><span class="resena__estrellas" role="img" aria-label="' + n + ' de 5 estrellas">' + '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n) + '</span>' +
        '<blockquote>' + esc(r.comentario) + '</blockquote><figcaption>' + esc(r.nombre) + '</figcaption>' +
        (r.respuesta ? '<p class="resena__respuesta">Respuesta de La Hornilla: ' + esc(r.respuesta) + '</p>' : '') + '</figure></li>'
    }).join('')
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { if (es[0].isIntersecting) cargarResenas() }, { rootMargin: '60% 0px' }).observe($('.confianza'))
  } else cargarResenas()

  /* Formulario de reseña: llega como "pendiente" (mismas reglas de Firestore) */
  var dlgR = $('#dialogoResena'), formR = $('#formResena'), estadoR = $('#estadoResena')
  $('#abrirResena').addEventListener('click', function () { estadoR.textContent = ''; dlgR.showModal() })
  formR.addEventListener('submit', function (e) {
    e.preventDefault()
    var d = new FormData(formR), nombre = String(d.get('nombre') || '').trim(), comentario = String(d.get('comentario') || '').trim(), estrellas = +d.get('estrellas')
    if (nombre.length < 2) { estadoR.textContent = 'Escribe tu nombre (mínimo 2 letras).'; return }
    if (comentario.length < 10) { estadoR.textContent = 'Cuéntanos un poco más (mínimo 10 letras).'; return }
    estadoR.textContent = 'Enviando…'
    var id = Array.from(crypto.getRandomValues(new Uint8Array(10)), function (b) { return ('0' + b.toString(16)).slice(-2) }).join('')
    var nombreDoc = 'projects/la-hornilla-de-zaid/databases/(default)/documents/resenas/' + id
    var cuerpo = { writes: [{
      update: { name: nombreDoc, fields: { nombre: { stringValue: nombre }, estrellas: { integerValue: String(estrellas) }, comentario: { stringValue: comentario }, estado: { stringValue: 'pendiente' }, aceptoPublicar: { booleanValue: true } } },
      updateTransforms: [{ fieldPath: 'creado', setToServerValue: 'REQUEST_TIME' }],
      currentDocument: { exists: false },
    }] }
    fetch(FS + ':commit?key=' + CLAVE_API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(cuerpo) })
      .then(function (r) {
        if (!r.ok) throw r.status
        estadoR.textContent = '¡Gracias! Tu reseña se publicará cuando la revisemos.'
        formR.reset(); medir('resena_enviada', {})
        setTimeout(function () { dlgR.close() }, 1800)
      })
      .catch(function () { estadoR.textContent = 'No se pudo enviar. Intenta de nuevo o escríbenos por WhatsApp.' })
  })

  /* ── Arranque ───────────────────────────────────────────────────── */
  pintarCarta(RESPALDO)
  pintarTicket()
  engine = window.ScrollCraft ? ScrollCraft.mount(document.body) : null
  if (location.hash.indexOf('#plato-') === 0) setTimeout(function () { irAPlato(location.hash.slice(7), true) }, 60)
  cargarCarta().then(function (l) {
    if (!l) return
    pintarCarta(l)
    if (engine) engine.layout()
  })
})()
