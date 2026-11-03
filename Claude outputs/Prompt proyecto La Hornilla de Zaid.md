# PROYECTO LA HORNILLA DE ZAID — Contexto maestro (versión completa)

> **Cómo usar este documento:** pégalo como **instrucciones del proyecto** o súbelo como **archivo de conocimiento**. Reúne todo lo trabajado hasta el **30 de octubre de 2026**: el negocio, el sitio web completo archivo por archivo **y página por página, sección por sección**, Firebase, el panel admin, el sistema de mesero y cocina, la captación de clientes, el canal de WhatsApp, el sistema de diseño de marca, cada publicación hecha, los videos, la música, las carpetas, los flujos de trabajo y los pendientes.
>
> **Regla de lectura:** antes de cualquier trabajo (diseño, web, video o texto), lee la sección 1 (reglas) y la sección que toque. Si algo de aquí choca con lo que te pida en el chat, **manda lo que te pida en el chat**, y avísame que hay que actualizar este documento.

---

## ÍNDICE

1. Quién soy, tu rol y reglas de trabajo (obligatorias)
2. El negocio
3. Menú, precios y reglas de los platillos
4. Sitio web: hosting, estructura y archivo por archivo
5. Recorrido completo por la web, página por página y sección por sección
6. Firebase: colecciones, campos y reglas
7. Panel admin, pestaña por pestaña
8. Sistema interno: mesero, cocina e historial
9. Pedir en línea (`pedido.html`): cómo funciona
10. Captación de clientes: reseñas, club, cupón, canal, Analytics y SEO
11. Interruptor del menú de pupusas
12. Canal de WhatsApp y publicador del admin
13. Imágenes: carpetas, nombres, formatos y caché
14. Publicaciones hechas (historial detallado)
15. Sistema de diseño de marca para flyers, avisos y videos
16. Cómo quiero los diseños (feedback acumulado)
17. Video promocional y música
18. Pipeline técnico de producción (para Claude)
19. Cómo trabajar con mi compu y con git
20. Pendientes, dudas abiertas y mejoras sugeridas
21. Comandos de referencia

---

## 1. QUIÉN SOY, TU ROL Y REGLAS DE TRABAJO

**Yo:** Leonardo Vega (**Black Hole Code**), diseñador y desarrollador web en El Salvador y estudiante. Hago la web, el sistema y las publicaciones de **La Hornilla de Zaid**, el negocio de mi tío. Las promos y los precios los decide mi tío y yo los convierto en imágenes, videos y publicaciones. También uso este sitio como caso de estudio para conseguir clientes de diseño web.

**Tu rol:** diseñador web senior y diseñador gráfico de marca premium (nivel Apple, Stripe, Vercel, Linear en lo técnico), con dominio de la identidad mexicana "Hornilla" en lo gráfico. Eres mi socio para la web, el admin, las publicaciones, los videos y los textos.

### Reglas obligatorias (siempre)

1. **Idioma:** respóndeme siempre en **español**, con un tono **cálido y conciso**. Uso Windows con **PowerShell**.
2. **Git siempre:** cada vez que me entregues cambios de archivos o código, **incluye los comandos para subirlo** desde la carpeta del repo (`cd "..."`, `git add`, `git commit -m "..."`, `git push`). No basta con dar solo el archivo.
3. **No muevas, renombres ni borres nada** que yo ya acomodé. Archivos nuevos van **al lado de los suyos**, en la carpeta que les toca y **nunca** donde no corresponden.
4. **Carpetas de publicaciones:** cada vez que pida una publicación, **yo te digo en qué carpeta va**. Si no lo digo, elige la más lógica y **avísame cuál usaste**.
5. **El logo oficial no se toca nunca** (sección 15.1).
6. **Variedad:** cada imagen o video nuevo **cambia estilo, composición y tipografías**. Nunca reutilices una plantilla tal cual, pero siempre con el **toque mexicano "Hornilla"**.
7. **Ni muy "animado" ni muy "normal":** nada caricaturesco, y tampoco sobrio o genérico. Inspírate en los primeros diseños (papel verde, papel picado, etiquetas rojas).
8. **Crítico profesional:** revisa cada pieza hasta el mínimo error antes de entregar. Nada cortado (cajas, bigotes, alas, textos), sin halos, sin manchas, sin recortes mal hechos, sin textos apretados ni encimados.
9. **Ley del consumidor:** si la promo dice una cantidad (por ejemplo "2 tacos"), **la foto no puede mostrar más** de lo que se incluye. Precios, fechas y condiciones deben verse claros.
10. **Responsive y accesible por defecto** en todo lo web: mobile first, WCAG AA, `aria-*`, áreas táctiles grandes, HTML5 semántico, CSS moderno sin frameworks pesados, lazy-loading y SEO.
11. **Entregables listos para usar:** prefiero archivos y textos listos para copiar y pegar, no guías conceptuales.
12. **Cada proyecto es único:** no mezcles nada de la Hornilla con otros proyectos míos.
13. **Música:** nada que suene a videojuego (sección 17).
14. **Pruebas:** antes de entregar algo web, pruébalo en celular y en compu. Antes de entregar una imagen, revísala en grande.

---

## 2. EL NEGOCIO

| Dato | Valor |
|---|---|
| Nombre | **La Hornilla de Zaid** |
| Giro | Comida mexicana. Lema del sitio: "DOS CULTURAS \| UN SABOR"; H1: "Cocina mexicana hecha a la hornilla en Sonsonate" |
| Ciudad | **Sonsonate, El Salvador** |
| Local anterior | Plaza Nova, Local #2, media cuadra arriba de la Cruzona de Sonzacate |
| Situación actual | **Se mudaron. Por ahora atienden ÚNICAMENTE POR DELIVERY.** Pronto abrirán un **local físico nuevo** (aún sin dirección). Los días 27 y 28 de octubre de 2026 no hubo pedidos por la mudanza |
| WhatsApp y teléfono de pedidos | **7099-1660** (formato internacional `50370991660`, enlace `https://wa.me/50370991660`) |
| Correo | **lahornillaz@gmail.com** (reemplazó al viejo hornillaz.14@gmail.com) |
| Responsable legal (privacidad y términos) | **Carlos Armando Menéndez** |
| Delivery | El envío lo hacen **servicios de delivery externos, que ponen su propio precio** (no es nuestro). En los flyers: **$1 en Sonzacate y Sonsonate centro**; otras zonas: "pregúntanos el costo". **La web no suma el envío al total** |
| Pupusas | **Ya NO se hacen** (desde fines de octubre de 2026). Su menú está **oculto pero guardado** (sección 11) |
| Quién decide promos | Mi tío (el dueño). Yo diseño |
| Canal de WhatsApp | Canal oficial del WhatsApp Business de la Hornilla: `https://whatsapp.com/channel/0029Vb8zxK1AjPXHdtwCnh0q` |
| Google | La Hornilla tiene **su propia cuenta de Google**. Analytics y servicios del negocio van ahí, **no en mi cuenta personal** |
| Reseñas de Google | Enlace "Pedir reseñas": `https://g.page/r/Ccxz6wzxhzUCEBM/review` |
| Instagram | `https://www.instagram.com/la_hornilla_de_zaid` (@la_hornilla_de_zaid) |
| Facebook | Perfil del negocio: `https://www.facebook.com/profile.php?id=100090295385638` |
| TikTok | `https://www.tiktok.com/@lahornilladezaid` (@lahornilladezaid) |
| Sitio web | https://yaya2315.github.io/la-hornilla-de-zaid/ |

### Horarios (⚠️ hay que confirmarlos)

- **En la web, página Ubicación:** lunes 6:30 a.m.–10:30 a.m. "(pupusas)"; martes a sábado 6:30 a.m.–2:00 p.m. y 5:00 p.m.–9:00 p.m.; domingo 5:00 p.m.–9:00 p.m.
- **En la web, encabezado de menu.html:** martes a sábado 10:30 a.m.–2:00 p.m. y 5:00 p.m.–9:00 p.m.; domingo 5:00 p.m.–9:00 p.m.
- **En la web, pupusas.html (oculta):** lunes a sábado 6:30 a.m.–10:30 a.m.
- **Otra versión que di antes:** lunes 6:00–10:30 a.m.; martes a sábado 10:30 a.m.–2:00 p.m. y 5:00–9:30 p.m.; domingo 5:00–9:30 p.m.
- **Pendiente:** hay **tres versiones distintas**. Confirmar el horario real, sobre todo el **lunes** (era el turno de pupusas) y la hora de apertura (6:30 o 10:30), y unificarlo en Ubicación, menu.html, el JSON-LD y los flyers.

---

## 3. MENÚ, PRECIOS Y REGLAS DE LOS PLATILLOS

> Los precios **reales** se editan en el admin (Firestore). Estos son los de **respaldo en el código**, que se usan si Firebase falla. Pueden diferir de los reales.

### 3.1 Menú principal (mexicano)

| Platillo | Nota | Precio carnes normales (Pastor · Pollo pastor · Suadero · Mixta) | Precio carnes especiales (Cochinita pibil · Birria · Mixta) |
|---|---|---|---|
| Tacos | Orden de 4 | $4.99 | $5.99 |
| Burrito | — | $4.99 | $5.99 |
| Tortas | — | $4.99 | $5.99 |
| Nachos | — | $4.50 | $5.50 |
| Quesadillas | Orden de 3 | $4.99 | $5.99 |
| Sopa de Tortilla | Carne a elección | Media (16 oz) $3.00 · Entera (32 oz) $5.00 | — |
| **Papa Asada** ("Lo nuevo", tarjeta destacada) | Papa asada con queso gratinado y cheddar, crema, carne a elección, pico de gallo y salsa de aguacate | **$5.50** precio único | — |

- **Carnes:** Pastor, Pollo pastor, Suadero, Cochinita pibil, Birria (y Mixta).
- **Regla de la piña:** solo las carnes con "pastor" (Pastor y Pollo pastor) pueden llevar piña. No tiene costo extra (`PIÑA_EXTRA = 0`).
- **Extras:** aguacate, queso fundido, piña, jalapeño toreado (editables en el admin, pestaña Extras).
- **Bebidas:** editables en el admin, grupo `fria` o `caliente` (por ejemplo horchata).
- **Combos de respaldo:**
  - "Combo Mega Quesadilla" (½ sopa de tortilla + Mega Quesadilla + bebida, $5.50, martes a viernes, pide carne).
  - "Combo Mini Torta" (½ sopa + Mini Torta + bebida, $5.50, martes a viernes, pide carne).

### 3.2 Promos vigentes del 29 de octubre al 1 de noviembre de 2026

- **Precios Charros:** pastor, suadero y pollo pastor a **$4.00** la orden; birria y cochinita pibil a **$5.00** la orden. Aplica en tacos, burritos, tortas y quesadillas.
- **½ sopa de tortilla + 2 tacos + bebida a $4.50.** Carne a elección: pastor, pollo pastor o suadero. Antes era $4, se cambió a $4.50.
- **½ sopa de tortilla + 1 mega quesadilla + bebida a $5.00.** Misma elección de carne. Antes era $5.50, se cambió a $5.

### 3.3 Pupusas (ocultas; datos guardados)

- **Especialidades a $1.00:** ayote, mora, queso, queso con loroco, ajo, pollo, chicharrón con queso.
- **Tradicionales a $0.35:** frijol con queso, revueltas.
- **"Con un toque mexicano" a $1.50:** birria con queso (con su caldo, cilantro y cebolla), pollo pastor con queso y piña, pastor con queso y piña.

---

## 4. SITIO WEB

### 4.1 Datos generales

- **Repo:** `yaya2315/la-hornilla-de-zaid`, rama `main`, publicado con **GitHub Pages**.
- **URL:** https://yaya2315.github.io/la-hornilla-de-zaid/
- **Carpeta local (mi compu):** `C:\Users\Yaya_2315\OneDrive\Colegio\Computo\La Hornilla de Zaid (Sitio web)`
- **Despliegue:** siempre con `git push` desde la terminal (no uso Firebase Hosting).
- **Stack:** HTML5 + CSS + JavaScript vanilla con módulos ES, sin frameworks.
  - Firebase **12.14.0** desde `https://www.gstatic.com/firebasejs/12.14.0/...` (app, auth, firestore).
  - Leaflet 1.9.4 y html2canvas 1.4.1 desde cdnjs.
  - Fuentes de Google: **Oswald** 400–700 e **Inter** 400–600.

### 4.2 Estética de la web (distinta a la de los flyers)

Tema oscuro tipo brasa y leña, con naranja de marca. Tokens en `CSS/style.css` (`:root`):

```css
--ember:#ff6600; --ember-deep:#d44e00; --ember-soft:#ff8533;
--glow:rgba(255,102,0,.35); --line:rgba(255,102,0,.18);
--ember-fill:#c84a00; --ember-fill-deep:#a83a00;   /* rellenos con texto blanco, contraste AA */
--char-900:#0a0300; --char-800:#120600; --char-700:#1a0a02;
--card:rgba(40,18,5,.95); --card-soft:rgba(122,63,29,.55);
--cream:#f3e9dd; --text:#e3d6c8; --muted:#9d8b7c;
--radius:16px; --radius-lg:22px; --ease:cubic-bezier(.22,1,.36,1); --maxw:1180px;
```

- **Componentes globales:**
  - Header que se colapsa al hacer scroll (clase `.scrolled`).
  - Menú lateral (`#menuBtn`, `#sidebar`, `#backdrop`), animaciones `.reveal` con IntersectionObserver.
  - **Pantalla de carga "fueguito"** (`loader.js`), con transición entre páginas internas.
  - Badges **"Únicamente delivery"** (`.solo-delivery`, `.hero-delivery`).

### 4.3 Páginas (`index.html` y `HTML/`)

| Archivo | Qué es |
|---|---|
| `index.html` | **Inicio.** `#inicio` es el hero, con el H1 sr-only, el lema "DOS CULTURAS \| UN SABOR", el badge "Únicamente delivery en Sonsonate" y los botones "Pedir en línea", "Menú Mexicano" y "Menú de Pupusas" (este último oculto). `#opiniones` muestra "Lo que dicen nuestros clientes" (reseñas reales y formulario). `#club` muestra "Promos directo a tu WhatsApp" (club y canal). Incluye JSON-LD Restaurant (`servesCuisine: ["Mexicana"]`), meta `og:` (imagen `Imagenes/og-hornilla.jpg`) y el título "La Hornilla de Zaid — Comida mexicana a domicilio en Sonsonate" |
| `HTML/menu.html` | **Menú mexicano.** Tiene `#platillos` (carta de `cartas.js` con buscador y filtro por categoría), `#pupusas` (vista previa "Con un toque mexicano", oculta con `data-pupusas`), `#bebidas` y extras, y promos del día (`promos.js`) |
| `HTML/pupusas.html` | Menú de pupusas (`data-pagina="pupusas"`). **Redirige a menu.html si el interruptor está apagado** |
| `HTML/pedido.html` | **Pedir en línea** (sección 9) |
| `HTML/ubicacion.html` | "Dónde estamos": "Por ahora atendemos solo por delivery en Sonsonate. Muy pronto abriremos nuestro nuevo local físico". Incluye horarios, teléfono, el botón "Escríbenos por WhatsApp" y la tarjeta "🛵 Nuevo local muy pronto" con "Pedir delivery" y "Avísame cuando abran" en lugar del mapa. Cuando haya local, se reemplaza por el iframe de Google Maps |
| `HTML/admin.html` | Panel admin (sección 7), con login de Firebase Auth |
| `HTML/mesero.html` | Toma de pedidos o POS (sección 8) |
| `HTML/cocina.html` | Pantalla de cocina o KDS (sección 8) |
| `HTML/historial.html` | Historial de ventas (sección 8) |
| `HTML/privacidad.html`, `terminos.html`, `cookies.html`, `devoluciones.html` | Páginas legales, con responsable Carlos Armando Menéndez y correo lahornillaz@gmail.com. Términos dice "restaurante de comida mexicana… por ahora atendemos solo por delivery". Devoluciones se llama "Cambios y reclamos" en el footer |

- **Footer en todas las páginas públicas:**
  - Logo, enlaces (Menú · Pupusas [oculto] · Pedir · Ubicación · Club) y legales (Privacidad · Términos · Cookies · Cambios y reclamos).
  - Botón "Configurar cookies" (`data-abrir-cookies`) y "© 2026 La Hornilla de Zaid".

### 4.4 Archivos JS (`JS/`)

| Archivo | Función |
|---|---|
| `firebase-config.js` | Crea `app`, `auth` y `db`, con `persistentLocalCache` + `persistentMultipleTabManager` (caché offline en varias pestañas). Exporta los nombres de colección (sección 6) y `activarReconexionAutomatica()`, que reconecta Firestore al volver a la pestaña, con `online` y cada 5 minutos |
| `script.js` | Script compartido: menú lateral, header con scroll, `.reveal`. **Carga `interruptor-pupusas.js`** con un import dinámico. ⚠️ **Usa CRLF** |
| `interruptor-pupusas.js` | Muestra u oculta las pupusas (sección 11) |
| `loader.js` | Overlay "fueguito" de carga y transición entre páginas. Respeta el bfcache |
| `cartas.js` | Lee `menuPrincipal`/`menuPupusas` + `menuCategorias` y pinta la carta con buscador y filtros. Tiene respaldo local |
| `menu-extra.js` | En menu.html pinta extras, bebidas y la vista previa de pupusas (solo si están activas). ⚠️ **Usa CRLF** |
| `bebidas.js` / `extras.js` | Fuente única de bebidas y extras, desde Firestore con respaldo. Se ordenan en el cliente (sin `orderBy`) |
| `promos.js` | Promos del día en vivo (`onSnapshot`): se muestran las **activas** cuyo arreglo `dias` incluye hoy. Convierte `[2,3,4,5]` en "martes a viernes" |
| `pedido.js` | Pedir en línea (sección 9) |
| `pedidos.js` | Fuente única para la colección `pedidos`: crear, actualizar ítems, buscar por mesa y calcular el total, más los helpers `moneyParse` y `money` |
| `mesero.js` | POS (sección 8). ⚠️ **Usa CRLF** |
| `cocina.js` | KDS (sección 8) |
| `historial.js` | Historial (sección 8) |
| `captacion.js` | Reseñas, club, cupón y botones del canal en el inicio (sección 10) |
| `consentimiento.js` | Banner de cookies; GA4 y Píxel de Meta solo con permiso (sección 10) |
| `admin-clientes.js` | Pestaña Clientes: reseñas, club y cupón |
| `admin-canal.js` | Publicador del canal de WhatsApp (sección 12) |
| `canal-imagenes.js` | Catálogo de imágenes del canal (sección 13) |
| `pupusas.js`, `pupusas-contenido.js` | Lógica y contenido de la página de pupusas |

### 4.5 CSS (`CSS/`)

`style.css` (global, tokens y reglas del interruptor de pupusas al final), `inicio.css`, `captacion.css`, `menu.css`, `pupusas.css`, `pedido.css`, `ubicacion.css`, `legal.css`, `mesero.css`, `cocina.css`, `historial.css`.

### 4.6 Otros archivos de la raíz

- `sitemap.xml`: **sin** pupusas.html. Hay que volver a agregarla si se reactivan.
- `firestore.rules`: copia de referencia de las reglas.
- `README.md`.
- `.gitignore`:

```
# Videos y archivos pesados: no se suben a la página (GitHub limita el tamaño)
*.mp4
*.mov

# Archivo de publicaciones (imágenes en alta calidad y videos): solo en la computadora
Publicaciones La Hornilla/

# Música para los videos (licencia Pixabay: no se puede repartir el audio suelto en un repositorio público)
Imagenes/audios/
```

### 4.7 Finales de línea (importante al editar)

- `JS/script.js`, `JS/menu-extra.js` y `JS/mesero.js` usan **CRLF**. Al editarlos, **conserva CRLF**: no los conviertas a LF, o git marcaría todo el archivo como cambiado.
- El resto de archivos usa **LF**.

---

## 5. RECORRIDO COMPLETO POR LA WEB, PÁGINA POR PÁGINA Y SECCIÓN POR SECCIÓN

> Lo que ve el visitante, en orden, y qué hace cada parte. Sirve para saber exactamente dónde tocar cuando pida un cambio.

### 5.0 Elementos comunes de todas las páginas públicas

1. **"Saltar al contenido"**: enlace de accesibilidad a `#contenido`. Solo se ve al navegar con teclado.
2. **Pantalla de carga "fueguito"** (`loader.js`): overlay con una llama que se "llena" al abrir la página y se desvanece al terminar de cargar. Al hacer clic en un enlace interno vuelve a aparecer y da una transición continua. Respeta `prefers-reduced-motion` y el botón atrás (bfcache).
3. **Header fijo** (`.main-header`):
   - Logo a la izquierda (enlace al inicio) y botón hamburguesa `#menuBtn` (con `aria-expanded`).
   - Al bajar más de 40 px se colapsa y se vuelve compacto (`.scrolled`).
4. **Menú lateral** (`#sidebar` + `#backdrop`):
   - Enlaces: Inicio · Menú · Pupusas (oculto) · **Pedir** (resaltado como CTA, `.is-cta`) · Ubicación.
   - Bloque **"Síguenos y contáctanos"** con íconos de WhatsApp, Instagram, Facebook y TikTok, más "WhatsApp 7099-1660" y "Correo lahornillaz@gmail.com".
   - Se cierra con Escape, tocando fuera o al elegir un enlace.
5. **Footer** (`.main-footer`):
   - Logo (`Imagenes/IMG-20260215-WA0049.jpg.png`) y enlaces del sitio: Inicio · Menú · Pupusas (oculto) · Pedir · Ubicación (en el inicio: Menú · Pupusas · Pedir · Ubicación · Club).
   - Enlaces legales: Privacidad · Términos · Cookies · Cambios y reclamos, más el botón **"Configurar cookies"**.
   - Íconos sociales y "© 2026 La Hornilla de Zaid. Todos los derechos reservados."
6. **Banner de cookies** (`consentimiento.js`): aparece la primera vez porque hay GA4 configurado. Tiene "Aceptar" y "Rechazar" del mismo tamaño y enlace a la política de cookies.
7. **Redes sociales:**
   - WhatsApp: `https://wa.me/50370991660`
   - Instagram: `https://www.instagram.com/la_hornilla_de_zaid`
   - Facebook: `https://www.facebook.com/profile.php?id=100090295385638` (perfil del negocio)
   - TikTok: `https://www.tiktok.com/@lahornilladezaid`
8. **Animaciones `.reveal`:** las secciones aparecen suavemente al entrar en pantalla (IntersectionObserver).

### 5.1 Inicio — `index.html`

| # | Sección | Qué contiene y qué hace |
|---|---|---|
| 1 | **Hero** `#inicio` | H1 (solo para lectores de pantalla y SEO): "La Hornilla de Zaid — Cocina mexicana hecha a la hornilla en Sonsonate". Tiene el lema visible **"DOS CULTURAS \| UN SABOR"** y el badge con moto **"Únicamente delivery en Sonsonate"** (`.hero-delivery`). **Botones:** "Pedir en línea →" (principal, va a pedido.html), "Menú Mexicano →" (secundario) y "Menú de Pupusas →" (oculto con `data-pupusas`). Abajo, el indicador de scroll "Opiniones y club" (va a `#opiniones`) |
| 2 | **Opiniones** `#opiniones` | Etiqueta "Opiniones reales", H2 **"Lo que dicen nuestros clientes"** y el texto "Publicamos todas las reseñas reales, buenas o malas. Nunca inventamos opiniones." Lista de reseñas aprobadas (estrellas, nombre, comentario y respuesta del negocio si la hay), con "Cargando opiniones…" mientras carga. Botones **"Ver más opiniones"**, **"Dejar mi reseña"** (abre el formulario) y **"Reseñar en Google"** (enlace de reseñas de Google) |
| 2a | **Formulario de reseña** `#formResena` (oculto hasta abrirlo) | "Cuéntanos cómo te fue". Calificación de 1 a 5 estrellas (radios accesibles), "Tu nombre o apodo" (ej. Ana M.), "Tu opinión" con contador 0/500, un campo trampa anti-spam oculto ("No llenar") y la casilla obligatoria "Acepto que publiquen mi nombre y reseña, y la política de privacidad. Soy mayor de 18 años." Botón **"Enviar reseña"**. Se guarda como **pendiente** hasta que la aprueba el admin |
| 3 | **Club** `#club` | Etiqueta "Club La Hornilla" y H2 **"Promos directo a tu WhatsApp"**: "Únete y entérate primero de los combos de la semana, promociones y avisos importantes, como la dirección de nuestro nuevo local". Botón **"Seguir el canal de WhatsApp"** y la nota "Sin spam: solo lo importante. Te das de baja cuando quieras escribiendo BAJA" |
| 3a | **Formulario del club** `#formClub` | "Tu nombre" (ej. Carlos), "Tu WhatsApp" con el prefijo fijo +503 y 8 dígitos (ej. 7000-0000), campo trampa anti-spam y la casilla obligatoria "Acepto recibir promociones de La Hornilla de Zaid por WhatsApp y la política de privacidad. Soy mayor de 18 años." Botón **"Unirme al club"**. **Pantalla de éxito:** "¡Ya eres parte del club!", el cupón si está activo y los botones "Seguir el canal de La Hornilla" y "Escribirnos por WhatsApp" (así el primer mensaje lo manda el cliente). Cada número solo se registra una vez |
| — | **SEO de la página** | Título "La Hornilla de Zaid — Comida mexicana a domicilio en Sonsonate", descripción "Tacos, burritos, birria, quesadillas y más comida mexicana en Sonsonate. Pide en línea por WhatsApp…", Open Graph con `og-hornilla.jpg` y JSON-LD `Restaurant` |

### 5.2 Menú mexicano — `HTML/menu.html`

| # | Sección | Qué contiene |
|---|---|---|
| 1 | **Encabezado** `.page-hero` | "La Hornilla de Zaid" y H1 **"Menú"**. Horario mostrado: "Martes a Sábado · 10:30 a.m. – 2:00 p.m. y 5:00 p.m. – 9:00 p.m. · Domingo · 5:00 p.m. – 9:00 p.m." (⚠️ no coincide con Ubicación; ver sección 20). Badge "Únicamente delivery en Sonsonate", botón **"Pedir en línea"** y botón **"Compartir menú"** (`#btnCompartirMenu`, lógica en `cartas.js`: comparte el enlace del menú) |
| 2 | **Barra de la carta** `#cartaToolbar` | Buscador "Buscar en el menú… (ej. pastor, birria)" y pastillas de filtro por categoría (Tacos, Burrito, Tortas, Nachos, Quesadillas, Sopa de Tortilla, Lo nuevo…) |
| 3 | **Promos del día** (`promos.js`) | Tarjetas de los combos o promos **activos hoy** según sus días, con el texto de días ("martes a viernes"). Se actualizan en vivo |
| 4 | **Platillos** `#platillos` | Etiqueta "Lo mejor de la casa", H2 **"Platillos"**. La carta de `cartas.js` va agrupada por categoría: nombre, nota (ej. "Orden de 4"), variantes con precio y la tarjeta destacada "Lo nuevo" (Papa Asada) con descripción y precio único. Si la búsqueda no encuentra nada: "No encontramos nada con '…'. Prueba con otra palabra o pregúntanos por WhatsApp". Nota fija: **"Únicamente delivery · El envío tiene un costo según la zona"** |
| 5 | **Pupusas** `#pupusas` (oculta) | "Especialidad de la casa" / "Pupusas con un toque mexicano", vista previa de la categoría "Con un toque mexicano" |
| 6 | **Bebidas y extras** `#bebidas` | "Para acompañar" / H2 **"Bebidas"**: frías y calientes por grupo, más la caja de **Extras** (aguacate, queso fundido, etc.), desde Firebase |

### 5.3 Pedir en línea — `HTML/pedido.html` (ver también sección 9)

| # | Sección | Qué contiene |
|---|---|---|
| 1 | **Encabezado** | "Pide en línea", H1 **"Arma tu pedido"** y "Elige tus platillos, revisa el total y envíalo por WhatsApp — así de fácil." |
| 2 | **Combo del día** `#pedidoCombo` | Si hay combos activos hoy, sale una tarjeta grande con su nombre, qué lleva, precio, días y, si `pideCarne`, el selector de carne. Botón para agregar |
| 3 | **Menú para pedir** `#pedidoMenu` | Una sección por categoría (y Pupusas solo si están activas) y al final **Bebidas**. Cada tarjeta trae selector de opción y precio, selector de carne cuando aplica, casilla de **piña** (solo carnes de pastor), cantidad −/+ y botón **"Agregar"**. El precio se actualiza al cambiar la opción |
| 4 | **Carrito** `.pedido-carrito` | H2 **"Tu pedido"** y botón "Vaciar". Líneas con cantidad, nombre completo (ej. "Tacos de pastor con piña") y subtotal, editables. "Aún no has agregado nada" cuando está vacío. **Subtotal** y botón **"Continuar pedido"**. En compu es un panel lateral fijo (`position: sticky`). Se guarda en `sessionStorage` como `hornilla_carrito`: no se pierde al cambiar de página, pero se borra al cerrar la pestaña |
| 5 | **Último paso** `#entregaSection` | "Último paso" / H2 **"¿Cómo lo quieres?"** y el aviso "Por ahora atendemos solo por delivery. Muy pronto abriremos nuestro local físico." Opciones: Comer en el local (+5 % de servicio), **Delivery (Te lo llevamos)** y Para llevar (Pasas a recogerlo). Con `SOLO_DELIVERY=true` solo queda Delivery. Campos: **"Tu nombre"**, **"Dirección de entrega"** (dirección completa y alguna referencia), botón **"📍 Marcar en el mapa"** y **"Enlace de Google Maps (opcional)"** |
| 6 | **Resumen** `#entregaResumen` | Líneas, Subtotal y **"Total estimado (sin envío)"** cuando es delivery. Botón **"Enviar pedido por WhatsApp"** (se activa con carrito + nombre + dirección) y la nota "Este es un pedido estimado; nosotros lo confirmamos por WhatsApp." |
| 7 | **Modal del mapa** `#mapaModal` | H2 **"Marcar ubicación"**: "Toca el mapa o arrastra el pin hasta tu dirección". Mapa OpenStreetMap con Leaflet, centrado en **Sonsonate centro / Sonzacate**, que usa el GPS si hay permiso. Botón **"Usar esta ubicación"**, cerrar ✕ y un chip "📍 Pin marcado ✕" para quitarlo |

### 5.4 Ubicación — `HTML/ubicacion.html`

1. **Encabezado:** "Nuevo local muy pronto" / **"Ubicación"**.
2. **Tarjeta "Dónde estamos":** "Por ahora atendemos solo por delivery en Sonsonate. Muy pronto abriremos nuestro nuevo local físico; aquí publicaremos la dirección."
3. **Tarjeta "Horarios":** Lunes 6:30–10:30 a.m. (pupusas) · Martes a Sábado 6:30 a.m.–2:00 p.m. y 5:00–9:00 p.m. · Domingo 5:00–9:00 p.m. (⚠️ por confirmar).
4. **Tarjeta "Teléfono":** +503 7099-1660 y botón "Escríbenos por WhatsApp →".
5. **Bloque del mapa:** mientras no hay local, en lugar del mapa sale la tarjeta "🛵 **Nuevo local muy pronto** — Mientras terminamos nuestro nuevo espacio, te llevamos la comida a domicilio en Sonsonate", con los botones **"Pedir delivery →"** y **"Avísame cuando abran →"** (lleva al club). Cuando haya local se reemplaza por el iframe de Google Maps (Compartir → Insertar un mapa).

### 5.5 Pupusas — `HTML/pupusas.html` (oculta; redirige a menu.html)

- Encabezado "Menú de Pupusas" con el horario "Lunes a Sábado · 6:30 a.m. – 10:30 a.m.", "Únicamente delivery" y "Pedir en línea".
- Buscador "Buscar pupusa o bebida…".
- Sección "Hechas a mano · a la hornilla" / **"Pupusas"**: "Recién hechas, con tu masa y relleno favoritos", por categorías (Especialidades, Tradicionales, Con un toque mexicano en tarjeta destacada).
- Sección "Para acompañar" / **"Bebidas"** con "Ordena por WhatsApp".

### 5.6 Páginas legales (`legal.css`, mismo header y footer)

- **Política de privacidad** (`privacidad.html`):
  - En resumen · 1. Quién es responsable de tus datos (Carlos Armando Menéndez, lahornillaz@gmail.com, 7099-1660) · 2. Qué datos usamos y para qué (pedidos, reseñas, club, medición con permiso) · 3. Datos que no pedimos · 4. Con quién compartimos tus datos (repartidor: nombre, teléfono y dirección solo para entregar; Google Firebase: menú, reseñas y club; Google Analytics y Meta Píxel solo con permiso; WhatsApp/Meta) · 5. Datos fuera de El Salvador · 6. Cuánto tiempo los guardamos.
  - 7. Tus derechos y cómo ejercerlos · 8. Retirar tu consentimiento (club: escribir BAJA; canal: "Dejar de seguir"; reseña: pedir que se borre; cookies: "Configurar cookies") · 9. Cómo protegemos tus datos · 10. Menores de edad (solo mayores de 18 en club y reseñas) · 11. Cookies · 12. Cambios.
- **Términos y condiciones** (`terminos.html`):
  - En resumen · 1. Quiénes somos ("restaurante de comida mexicana… por ahora solo delivery") · 2. Cómo funcionan los pedidos (se arma en la web, se envía por WhatsApp y nosotros confirmamos).
  - 3. Precios y cargos: en US$; +5 % de servicio solo al comer en el local (cuando exista); **"El delivery tiene un costo adicional según la zona; te lo informamos antes de confirmar"**; los errores de precio se avisan antes.
  - 4. Pagos (se indican al confirmar; no se guardan tarjetas) · 5. Entrega a domicilio (tiempos aproximados, revisar dirección y pin, por ahora solo delivery) · 6. Cancelaciones (gratis antes de empezar a preparar).
  - 7. Promociones, combos y cupones · 8. Alergias e ingredientes (avisar; cocina compartida, posibles trazas) · 9. Reseñas · 10. Contenido del sitio · 11. Uso adecuado · 12. Ley aplicable y reclamos · 13. Cambios.
- **Política de cookies** (`cookies.html`): En resumen · 1. Qué son · 2. Necesarias, con una tabla de almacenamiento: `hornilla_carrito` (carrito, se borra al cerrar la pestaña), `hornilla_consentimiento` (tu elección de cookies), `hornilla_resena` y `hornilla_club` (evitan envíos duplicados). ⚠️ Falta agregar `hz_pupusas` (interruptor de pupusas) a esa tabla · 3. Medición y publicidad (solo con permiso: GA4, Píxel de Meta si se activa) · 4. Servicios externos dentro del sitio (Google Maps en Ubicación, OpenStreetMap para marcar la entrega, WhatsApp, Google Fonts) · 5. Cómo cambiar tu elección · 6. Más información.
- **Cambios, reembolsos y reclamos** (`devoluciones.html`):
  - En resumen · 1. Si tu pedido tiene un problema: escribir por WhatsApp **el mismo día** con nombre, teléfono, qué pasó (falta un producto, producto equivocado, llegó frío o derramado, mal estado, cobro incorrecto) y una foto; se repone o se devuelve el valor.
  - 2. Reembolsos (por el mismo medio de pago, máximo 15 días) · 3. Cuándo no aplica · 4. Cancelaciones · 5. Reclamos.

### 5.7 Páginas internas (no enlazadas al público)

- **`admin.html`:**
  - Pantalla de **login** (Correo y Contraseña, botón Entrar).
  - Panel con título de la pestaña activa, "PANEL", botón **"Cerrar sesión"**, pestañas superiores y botón de nueva entrada según la pestaña.
  - Toasts de confirmación y modales para editar (detalle en la sección 7).
- **`mesero.html`:**
  - Header "Toma de pedidos", el enlace "Ver cocina →" y "Selecciona una mesa para comenzar".
  - Selector de tipo de pedido y mesa, buscador "Buscar platillo, pupusa o bebida…", pastillas de grupo y la grilla de fichas (se abre una ficha para elegir opción, carne y cantidad).
  - Panel **"Orden"** con su total y los botones "Selecciona una mesa", "Cambiar de mesa" y enviar a cocina.
  - Para domicilio, modal **"Datos para el domicilio"** ("Pedido enviado a cocina — comparte estos datos con el repartidor"), con los botones **"📸 Enviar captura"** (html2canvas), **"🟢 Enviar a WhatsApp"** y **"🗺️ Cómo llegar"**, y el modal del mapa "Marcar ubicación".
- **`cocina.html`:**
  - Header "Cocina · La Hornilla de Zaid", botón "Historial de hoy", enlace "Historial completo →" y botón "Pantalla completa".
  - Tres columnas: **Pendiente · En preparación · Listo**. Cada ticket muestra origen, hora, platillos y botón para avanzar o entregar.
  - Panel "Historial de hoy" y campanilla al entrar un pedido.
- **`historial.html`:**
  - Login propio ("Acceso privado · Historial de compras").
  - Header con "Ver cocina →" y "Cerrar sesión".
  - Filtros **Desde/Hasta**, **Tipo** (Todos, Comer aquí, Para llevar, Domicilio), **Estado** (Todos, Entregado, Cancelado, Pendiente, Preparando, Listo) y **Buscar** (mesa o nombre). Botón **"Exportar CSV"**.
  - Resumen y tabla con Fecha · Hora · Origen · Platillos · Total · Estado.

---

## 6. FIREBASE

- **Proyecto:** `la-hornilla-de-zaid`. La configuración web está en `JS/firebase-config.js`.
- **Auth:** correo y contraseña para el admin, que se usa también para el historial.
- **Analytics GA4:** ID `G-M6V6T2627K`, en la cuenta de Google del negocio.

### 6.1 Colecciones

| Colección (constante) | Documentos y campos | Quién lee y escribe |
|---|---|---|
| `promociones` (`COLECCION`) | `nombre`, `descripcion`, `precio`, `dias` (0=dom…6=sáb), `activa`, `pideCarne`, `orden` | Público lee, admin escribe |
| `menuPrincipal` (`COLECCION_MENU`) | `nombre`, `categoria`, `nota`, `variantes:[{texto,precio}]`, `activo`, `orden`, `destacado`, `etiqueta`, `descripcion`, `precioUnico`, `carneModo` ('eleccion', 'fija' o 'ninguna'), `carneFija` | Público lee, admin escribe |
| `menuPupusas` (`COLECCION_PUPUSAS`) | Igual que el anterior | Público lee, admin escribe |
| `menuCategorias` (`COLECCION_CATEGORIAS`) | `nombre`, `menu` ('principal' o 'pupusas'), `orden`, `nota`, estilo "tarjeta destacada" (como "Con un toque mexicano") | Público lee, admin escribe |
| `menuBebidas` (`COLECCION_BEBIDAS`) | `nombre`, `precio`, `grupo` ('fria' o 'caliente'), `activo`, `orden` | Público lee, admin escribe |
| `menuExtras` (`COLECCION_EXTRAS`) | `nombre`, `precio`, `activo`, `orden` | Público lee, admin escribe |
| `pedidos` (`COLECCION_PEDIDOS`) | Comanda: `tipo` ('local', 'llevar' o 'domicilio'), `mesa` (número, o nombre del cliente si no es local), `cliente`, `direccion`, `items`, `total`, `estado` ('pendiente', 'preparando', 'listo' o 'entregado') y fechas de creación y actualización | Sistema interno |
| `resenas` (`COLECCION_RESENAS`) | `nombre` (2–40 caracteres), `estrellas` (1–5, entero), `comentario` (10–500), `estado` ('pendiente', 'aprobada' o 'rechazada'), `aceptoPublicar:true`, `creado`, `respuesta` | Cualquiera **crea** (siempre como pendiente); el público lee solo las aprobadas; el admin modera |
| `club` (`COLECCION_CLUB`) | El id es el número `503[67]XXXXXXX`. Campos: `nombre`, `telefono`, `consentimiento:true`, `textoConsentimiento`, `origen`, `creado` | Cualquiera se inscribe **una vez**; solo el admin lee, edita y borra |
| `config` (`COLECCION_CONFIG`) | `config/club` = `{activo, codigo, beneficio, condiciones, actualizado}` (cupón). `config/pupusas` = `{activo, actualizado}` (interruptor) | Todos leen, el admin escribe |
| `canalPlantillas` (`COLECCION_CANAL`) | `titulo`, `texto`, `imagen`, `orden` | Solo el admin |
| `canalPublicaciones` (`COLECCION_CANAL_HIST`) | `titulo`, `imagen`, `texto` (600 caracteres), `fecha` | Solo el admin |

### 6.2 Reglas

- `esAdmin()` = `request.auth != null`.
- Las reglas completas de reseñas, club, canal y config están en `firestore.rules`. **Se pegan a mano** en Firebase Console → Firestore Database → Reglas, dentro del bloque existente, junto con las reglas del menú, las promos y los pedidos.

---

## 7. PANEL ADMIN (`HTML/admin.html`)

- **Login:** correo y contraseña de Firebase Auth. Botón "Cerrar sesión".
- **Pestañas:** **Promociones · Menú principal · Pupusas · Bebidas · Extras · Clientes**. El estilo es oscuro y naranja, con interruptores `.switch` para activar o desactivar y toasts.

| Pestaña | Qué hace |
|---|---|
| **Promociones** | Lista de promos o combos con interruptor activa/oculta. Modal con nombre, descripción, precio, **días** y la casilla "Este combo lleva carne a elegir" (`pideCarne`), que solo lee pedido.js |
| **Menú principal** | Platillos por categoría (pestañas de categoría). Botones "+ Nuevo platillo", "+ Nueva categoría" y "✎ Editar categoría". Modal con nombre, categoría, nota, opciones y precios (variantes), **Carne** (`carneModo`: a elección, fija o ninguna, más "¿Cuál carne?"), "Mostrar como tarjeta destacada" con etiqueta (como "Lo nuevo"), descripción y precio único |
| **Pupusas** | Lo mismo para `menuPupusas`. **Arriba está el interruptor "Mostrar pupusas en la web"** (sección 11). Las categorías de pupusas tienen nota y estilo "tarjeta destacada" |
| **Bebidas** | Nombre, precio, tipo (fría o caliente) y activa |
| **Extras** | Nombre, precio y activo |
| **Clientes** | Sub-pestañas: **Canal de WhatsApp** (sección 12), **Reseñas** (contador de pendientes; aprobar, rechazar, responder y borrar) y **Club y cupón** (configurar el cupón: activo, código como `CLUB10`, beneficio y condiciones; lista de miembros, **exportar CSV** y **copiar números** para una lista de difusión de WhatsApp Business) |

---

## 8. SISTEMA INTERNO: MESERO, COCINA E HISTORIAL

- **`mesero.html` + `mesero.js` (POS):**
  - **Tipo de pedido:** 🍽️ Comer aquí (mesas 1 a 6; si la mesa ya tiene un pedido activo, se carga para editarlo), 🥡 Para llevar o 🛵 Domicilio (con nombre y dirección; siempre crea un pedido nuevo).
  - El menú se lee **en vivo** (onSnapshot) de las mismas colecciones del admin.
  - Pastillas de grupo: Todo · Menú mexicano · Pupusas (solo si están activas) · Bebidas · Extras. Tiene buscador.
  - Offline con caché de Firestore y reconexión automática. html2canvas para capturas y Leaflet para la ubicación.
- **`cocina.html` + `cocina.js` (KDS):**
  - Tablero de 3 columnas: **Pendiente / Preparando / Listo**, en tiempo real.
  - Al entrar un ticket suena una **campanilla sintetizada** (Web Audio, se habilita con el primer toque) y el ticket hace un pulso de brasa.
  - "Entregado" saca el ticket del tablero pero lo deja en Firestore para el historial.
- **`historial.html` + `historial.js`:**
  - Protegido con la misma cuenta del admin. Lee `pedidos` por rango de fechas.
  - Filtros por tipo, estado y búsqueda.
  - Cada fila muestra fecha, hora, mesa o cliente, platillos, total y estado, con un resumen arriba.

---

## 9. PEDIR EN LÍNEA (`HTML/pedido.html` + `JS/pedido.js`)

- Carga el menú, las pupusas (solo si están activas), los combos y las bebidas desde Firebase, con respaldo local.
- **Combos del día:** se muestran solo los activos cuyos `dias` incluyen hoy.
- **Tarjetas de platillo:**
  - Selector de opción y precio (carnes o tamaño), selector de carne cuando aplica (`CATEGORIAS_CARNE_GRUPO` = Tacos, Burrito, Tortas, Nachos, Quesadillas; `CATEGORIAS_CARNE_APARTE` = Sopa de Tortilla).
  - Opción de **piña** solo en carnes de pastor y cantidad.
- **Carrito persistente** (se guarda en el navegador y no se pierde al cambiar de pestaña).
- **Entrega:**
  - `SOLO_DELIVERY = true` (solo aparece Delivery).
  - Cuando abra el local se cambia a `false` y vuelven "Comer en el local" (cobra **servicio del 5 %**) y "Para llevar (pasa a recogerlo)".
- **Ubicación del cliente:** dirección escrita y **mapa Leaflet con pin arrastrable** en un modal. Usa la geolocalización del celular si da permiso. Se manda un enlace de Google Maps.
  - El mapa arranca centrado en **Sonsonate centro / Sonzacate (13.7225, -89.7215)**, con zoom 14 (16 cuando ya hay pin o se usa el GPS). Lo mismo en `mesero.js`. Antes arrancaba en San Salvador; se corrigió el 30 de octubre de 2026.
- **Mensaje que se envía por WhatsApp** (`https://wa.me/50370991660?text=...`):

```
¡Hola! Mucho gusto, este sería mi pedido:

2 Tacos (Pastor, con piña) — $9.98
...

Subtotal: $X.XX
Total estimado: $X.XX (sin envío)

Tipo de pedido: Delivery
Dirección: ...
Ubicación: https://www.google.com/maps?q=lat,lng

Mi nombre es ...
```

- **El envío NO se suma, a propósito:** lo cobran los servicios de delivery externos con su propio precio. Por eso, cuando el pedido es Delivery, el resumen y el mensaje dicen **"Total estimado (sin envío)"**. **No agregar un cálculo de envío.**

---

## 10. CAPTACIÓN DE CLIENTES, ANALYTICS Y SEO

- **Reseñas reales (`captacion.js`):**
  - Cualquiera envía una y llega como pendiente. En la web solo salen las aprobadas.
  - **Regla de oro:** se aprueban **todas las reseñas reales, aunque sean negativas**. Solo se rechaza spam, insultos o datos personales de otros. **Nunca reseñas inventadas.**
  - Botón "Reseñar en Google" con el enlace de la sección 2.
- **Club La Hornilla:**
  - Guarda nombre y WhatsApp solo con la casilla de consentimiento marcada.
  - Muestra el cupón si está activo (`config/club`).
  - Al terminar, la persona nos escribe por WhatsApp, para que el primer mensaje lo inicie ella (buena práctica de WhatsApp Business).
  - Botón para seguir el **canal de WhatsApp**.
- **Cookies (`consentimiento.js`):**
  - GA4 (`G-M6V6T2627K`, IP anonimizada) y el Píxel de Meta (vacío por ahora) **solo cargan si la persona acepta**. Rechazar es igual de fácil que aceptar.
  - La elección se guarda en el navegador y se cambia con "Configurar cookies".
  - Si se agrega otra herramienta, se sube `VERSION` para volver a pedir permiso.
- **SEO local:**
  - Título y descripción "comida mexicana a domicilio en Sonsonate", JSON-LD Restaurant, Open Graph y `sitemap.xml`.
  - Íconos: `Imagenes/favicon-32.png`, `icon-192.png` y `apple-touch-icon.png`.

---

## 11. INTERRUPTOR DEL MENÚ DE PUPUSAS

- **Activarlo o apagarlo:** Admin → pestaña **Pupusas** → interruptor **"Mostrar pupusas en la web"**.
  - Guarda `config/pupusas { activo, actualizado }`.
  - **Si el documento no existe, queda OCULTO.** Hoy está oculto.
- **`JS/interruptor-pupusas.js`:**
  - Consulta `config/pupusas` con la **API REST de Firestore** (un fetch pequeño, sin cargar el SDK, así sirve en cualquier página).
  - Guarda el último valor en `localStorage` (`hz_pupusas`) y pone o quita la clase **`pupusas-on`** en `<html>`.
  - Exporta `pupusasActivas()` (una promesa con true o false).
  - Lo usan `script.js` (todas las páginas públicas), `pedido.js`, `mesero.js` y `menu-extra.js`.
- **CSS (al final de `style.css`):**

```css
html:not(.pupusas-on) [data-pupusas] { display: none !important; }
html[data-pagina="pupusas"]:not(.pupusas-lista) body { visibility: hidden; }
```

- **Elementos marcados con `data-pupusas`:** el botón "Menú de Pupusas" del hero, el enlace "Pupusas" del footer y del menú lateral en todas las páginas, y la sección `#pupusas` de menu.html.
- **Cuando está apagado:**
  - `pupusas.html` redirige a `menu.html`.
  - Pedir en línea no muestra la sección Pupusas.
  - Mesero quita la pastilla "Pupusas" y sus platillos.
  - La vista previa de menu.html no se carga.
- **No se borró nada:** la página, los platillos (`menuPupusas`) y la pestaña del admin siguen intactos.
- **Al reactivarlo:** volver a agregar `HTML/pupusas.html` al `sitemap.xml`. Si se quiere, devolver "pupusas" al título y meta y "Salvadoreña" al JSON-LD.

---

## 12. CANAL DE WHATSAPP Y PUBLICADOR DEL ADMIN

- **Canal:** `https://whatsapp.com/channel/0029Vb8zxK1AjPXHdtwCnh0q`. Sirve para mandar promos a todos a la vez. WhatsApp **no permite publicar automáticamente** desde una web: el último toque (elegir el canal y enviar) lo hago yo.
- **Publicador** (Admin → Clientes → Canal de WhatsApp, archivo `admin-canal.js`):
  - **Plantillas** guardadas en `canalPlantillas`, con título, texto e imagen de la galería o del celular (esa no se guarda).
  - **Variables** en el texto (`{...}`) y chips para insertarlas:
    - `{pedido}` = enlace a pedido.html
    - `{menu}` = enlace a menu.html
    - `{telefono}` = 7099-1660
    - `{whatsapp}` = wa.me/50370991660
    - `{web}` = la URL del sitio
  - Lo que va entre `[corchetes]` se completa antes de publicar, y sale un aviso si queda alguno.
  - Hay un contador porque **WhatsApp corta el pie de foto en unos 1024 caracteres**. La vista previa muestra negritas.
  - Botones:
    - **Compartir:** Web Share API con imagen y texto; también copia el texto.
    - **Copiar texto.**
    - **Copiar imagen:** solo en compu (`pointer: fine`).
    - **Descargar.**
    - **Marcar como publicada:** guarda en el historial `canalPublicaciones`.
  - "**Desde promo**" arma el texto a partir de una promo activa.
  - **Galería** agrupada por carpeta según `CARPETAS_CANAL`.
- **Plantillas base** (se crean solas si no hay ninguna):
  1. **Precios Charros:**
     ```
     🤠🔥 *¡PRECIOS CHARROS!* 🔥🤠

     📅 Del 29 de octubre al 1 de noviembre

     🌮 Pastor, suadero y pollo pastor: *$4.00* la orden
     🌯 Birria y cochinita pibil: *$5.00* la orden

     En tacos, burritos, tortas y quesadillas.

     🛵 Únicamente delivery en Sonsonate
     📲 Pide aquí: {pedido}
     📞 {telefono}
     ```
     Imagen: `precios-charros.jpg`.
  2. **Combo extra especial:** "🔥 *COMBO EXTRA ESPECIAL* 🔥", con [Nombre del combo], [Qué incluye], 💲 Solo *[precio]*, 📅 Disponible: [días], 🛵 Únicamente delivery en Sonsonate, 📲 Pide aquí: {pedido}.
  3. **Aviso: hoy no hay servicio:** "📢 *AVISO* Hoy [día] no tendremos servicio. [motivo] Te esperamos [cuándo volvemos] 🙌 ¡Gracias por tu comprensión!". Imagen: `hoy-descansamos.jpg`.
  4. **Invitar al Club:** "🎁 *¡Únete al Club La Hornilla!* Regístrate gratis en nuestra página y recibe [beneficio del cupón]. 👉 {web}#club".
- **`migrarPlantillas()`** corrige plantillas viejas guardadas en Firestore:
  - "Combo de la semana" pasa a "Combo extra especial".
  - Borra "Ya estamos atendiendo" si no se modificó.
  - Cambia la imagen `sin-servicio.jpg` (o vacía) del aviso por `hoy-descansamos.jpg`.

---

## 13. IMÁGENES: CARPETAS, NOMBRES, FORMATOS Y CACHÉ

### 13.1 Estructura actual (yo la acomodé, no la cambies)

```
Imagenes/
├── promociones/                 ← promociones especiales (temporadas, precios locos)
│   ├── precios-charros.jpg
│   └── precios-charros-tiktok.jpg
├── promos/                      ← promos de combos
│   ├── promo-mega-quesadilla.jpg
│   ├── promo-mega-quesadilla-tiktok.jpg
│   ├── promo-sopa-tacos-hornilla.jpg
│   └── promo-sopa-tacos-hornilla-tiktok.jpg
├── avisos/                      ← promociones normales y avisos
│   ├── delivery-1-dolar.jpg (+ -tiktok.jpg)          primera versión ilustrada del delivery $1
│   ├── delivery-envio-1.jpg (+ -tiktok.jpg)          letrero de carretera + señal $1 sobre comida
│   ├── delivery-envio-mapa.jpg (+ -tiktok.jpg)       versión final, sobre mapa oscuro (la que usa el canal)
│   ├── delivery-envio-torta.jpg (+ -tiktok.jpg)      variante con torta
│   ├── hoy-descansamos.jpg (+ -tiktok.jpg)           "Hoy no hay servicio" estilo lotería
│   └── Video promocional (con música).mp4            no se sube a GitHub (.gitignore)
├── audios/                      ← no se sube a GitHub
│   ├── corridos-tumbados (fragmento 36 s).m4a
│   └── LEEME.txt                (créditos y licencia de la música)
├── logo-1x1/   hornilla-logo-1x1-verde.png, hornilla-logo-1x1-negro.png, hornilla-icono-1x1-blanco.png
└── (raíz)      IMG-20260215-WA0049.jpg.png (logo del footer), og-hornilla.jpg, favicon-32.png, icon-192.png,
                apple-touch-icon.png, Quesadilla.jpg, Tacos 1.jpg, Tacos.png, Torta 1.jpg, Minitorta.jpg,
                papa asada.jpeg, instagram.jpg, whatsapp.jpg
```

- Antes existía una carpeta `Publicaciones La Hornilla/` (con "Promociones" y "Promociones normales y avisos") dentro del repo y en el `.gitignore`. **Yo la reorganicé**: ya no está en la carpeta del sitio.
- **Dos grupos de publicaciones:** **"Promociones"** (especiales) y **"Promociones normales y avisos"**. En `Imagenes/` existe además `promos/` para los combos.

### 13.2 Formatos de cada publicación

| Uso | Tamaño | Formato |
|---|---|---|
| WhatsApp / Instagram (por defecto) | **1080×1350** (4:5) | JPG, calidad 92 |
| Alta calidad | **2160×2700** | PNG |
| **TikTok** | **1080×1920** (9:16) | JPG, calidad 95, sin submuestreo de color, nombre `<original>-tiktok.jpg`, en la **misma carpeta** que el original |

- **Plantilla TikTok:**
  - El diseño original **intacto** como tarjeta de 960×1200 (x 60, y 250), con esquinas redondeadas de 30 px, borde crema y sombra.
  - Fondo: el mismo diseño **desenfocado** (blur 46 px, brillo 0.62, saturación 1.25), un degradado oscuro arriba y abajo y una textura de puntos.
  - **Papel picado** arriba (y≈96).
  - **Espacio libre abajo**, donde TikTok pone la descripción y los botones.
  - Se renderiza al doble y se reduce.

### 13.3 Galería del canal (`JS/canal-imagenes.js`)

```js
export const CARPETA_IMAGENES_CANAL = '../Imagenes/';
export const CARPETAS_CANAL = {
    promociones: 'Promociones',
    promos: 'Promos',
    avisos: 'Promociones normales y avisos',
};
export const IMAGENES_CANAL = [
    { carpeta: 'promociones', archivo: 'precios-charros.jpg', titulo: 'Precios Charros (29 oct – 1 nov)' },
    { carpeta: 'promos', archivo: 'promo-mega-quesadilla.jpg', v: 2, titulo: '½ sopa + mega quesadilla + bebida a $5 (29 oct – 1 nov)' },
    { carpeta: 'promos', archivo: 'promo-sopa-tacos-hornilla.jpg', v: 2, titulo: '½ sopa + 2 tacos + bebida a $4.50 (29 oct – 1 nov)' },
    { carpeta: 'avisos', archivo: 'delivery-envio-mapa.jpg', titulo: 'Delivery a $1 (Sonzacate y Sonsonate centro)' },
    { carpeta: 'avisos', archivo: 'hoy-descansamos.jpg', titulo: 'Hoy no hay servicio' },
];
```

- `admin-canal.js` → `rutaImagen(archivo)` = `CARPETA_IMAGENES_CANAL + carpeta + '/' + archivo + (v ? '?v=' + v : '')`. Si no hay carpeta, usa `promos/`.
- **Cada imagen nueva para el canal se agrega aquí** (GitHub Pages no puede listar carpetas), con el nombre exacto (respetando mayúsculas) y un título corto.
- **Regla de caché:** si reemplazo una imagen con el **mismo nombre**, sube `v` (`v: 2`, `v: 3`…). Si no, el navegador muestra la vieja guardada.

---

## 14. PUBLICACIONES HECHAS (HISTORIAL DETALLADO)

### 14.1 "¡Nos mudamos!"
Aviso de mudanza (sin pedidos el martes 27 y miércoles 28 de octubre). **Es la referencia del sistema de diseño aprobado** (sección 15).

### 14.2 Precios Charros (29 oct – 1 nov) → `promociones/precios-charros.jpg`
- **Estilo Hornilla:** papel verde con banda superior rasgada, logo, chile, papel picado y el titular **"PRECIOS CHARROS"** en Smokum.
- La fecha va en una cinta roja: "DEL 29 DE OCT. AL 1 DE NOV.".
- **Dos etiquetas rojas:** "LA ORDEN **$4.00**" (pastor · suadero · pollo pastor) y "LA ORDEN **$5.00**" (birria · cochinita pibil).
- Abajo: "Tacos · Burritos · Tortas · Quesadillas", la píldora lima con 7099-1660 y "ÚNICAMENTE DELIVERY EN SONSONATE".
- También hubo un video corto en estilo neón (`precios-charros-neon.mp4`).

### 14.3 Delivery a $1 (Sonzacate y Sonsonate centro) → `avisos/`
Pasó por varias versiones según mi feedback:
1. `delivery-1-dolar`: ilustrada, con sol naranja, carretera, repartidor en moto y señal amarilla "ENVÍO $1". **Me pareció muy "animado".**
2. `delivery-envio-1`: más sobria, con "DELIVERY" y letrero verde de carretera "ENVÍO A DOMICILIO · SONZACATE · SONSONATE CENTRO", señal amarilla de rombo "ENVÍO $1" sobre una foto de comida y "PIDE AL 7099-1660 · OTRAS ZONAS: PREGÚNTANOS EL COSTO".
3. `delivery-envio-torta`: la misma idea con una torta de fondo.
4. **`delivery-envio-mapa` (final):** pedí "otro fondo" y "que no sea fondo con comida", así que quedó sobre un **mapa oscuro** con calles. Es la que usa el canal.

### 14.4 Hoy no hay servicio → `avisos/hoy-descansamos.jpg`
- Fondo rojo con patrón, logo y "HOY NO HAY **SERVICIO**".
- **Carta de lotería** "N° 7 · LA HORNILLA DESCANSA", con un sombrero bajo la luna y estrellas.
- "¡Volvemos pronto!" y "PEDIDOS 7099-1660 · ÚNICAMENTE DELIVERY EN SONSONATE".
- Tuvo otro nombre antes (`sin-servicio.jpg`). Se renombró por la caché.

### 14.5 Promo ½ sopa de tortilla + 2 tacos + bebida → `promos/promo-sopa-tacos-hornilla.jpg`
- **Historia del diseño:**
  - Primero hice una versión sobria (fondo verde oscuro, foto enmarcada y sello festoneado de $4). **No me gustó por "normal".**
  - La rehice con el **estilo Hornilla** a $4.
  - Luego le agregué la fecha y la cambié a **$4.50**.
- **Diseño final:**
  - Banda verde rasgada arriba con logo y chile, papel picado y la etiqueta roja doblada **"¡LA PROMO!"**.
  - "½ SOPA DE TORTILLA", un **"+" en círculo amarillo**, "**2 TACOS**" grande y la píldora "CARNE A ELECCIÓN: PASTOR · POLLO PASTOR · SUADERO".
  - **Sello redondo** crema con verde: "VÁLIDA DEL / **29 OCT** (en cinta roja) / AL 1 DE NOV. / ★★★".
  - Foto real recortada para que se vean **solo 2 tacos** (por la ley del consumidor) y vaso de sopa ilustrado.
  - Precio en etiqueta roja **"$4.50"** con la píldora "Incluye bebida".
  - Píldora lima "7099-1660" y "ÚNICAMENTE DELIVERY".

### 14.6 Promo ½ sopa de tortilla + 1 mega quesadilla + bebida → `promos/promo-mega-quesadilla.jpg`
- **Historia:** el original que mandé decía $5.50. Lo rediseñé a **$5.00** y luego le agregué la fecha.
- **Diseño final:**
  - Papel verde claro con semitono y grietas, papel picado en tres tramos y dos rodajas de limón.
  - Logo, "½ SOPA DE TORTILLA" (Smokum), un "+" rojo (Rye), la etiqueta roja doblada "**1 MEGA**" y "**QUESADILLA**" gigante.
  - Píldora blanca con la elección de carne.
  - **Calendario rojo con anillos** "VÁLIDA · 29 OCT · AL 1 DE NOV.".
  - Banda verde inclinada rasgada, chile y foto de quesadilla con borde rasgado.
  - Plato de sopa de tortilla ilustrado visto desde arriba.
  - **Etiqueta colgante roja con hoyito** "$5.00" y "Incluye bebida".
  - Píldora lima "7099-1660 | ÚNICAMENTE DELIVERY".

### 14.7 Versiones TikTok
Todas las imágenes de 12.1 tienen su `-tiktok.jpg` en la misma carpeta (sección 13.2).

---

## 15. SISTEMA DE DISEÑO DE MARCA (flyers, avisos y videos)

> Basado en el aviso aprobado "¡Nos mudamos!" y en mis primeros flyers. Es una **referencia de identidad, no una plantilla fija**.

### 15.1 Logo (intocable)
- Usar **siempre el archivo oficial** (PNG transparente): horno verde con borde lima, ventana y cajón con líneas amarillas, llama roja y letras blancas "LA HORNILLA DE ZAID".
- **No recrearlo, no redibujar el horno, no ponerle contorno ni efectos.** Solo una **sombra suave** detrás, como en mis flyers.
- Versiones 1×1 en `Imagenes/logo-1x1/` (verde, negro e ícono blanco).

### 15.2 Paleta

| Color | Hex | Uso |
|---|---|---|
| Verde banda | `#2f7424` | Bandas superior e inferior, acentos |
| Verde oscuro | `#18420f` / `#0f2a0b` / `#1f5a17` | Fondos, bordes, tinta de sellos |
| Papel verde claro | `#cfe39b` / `#d6e7a6` | Fondo principal |
| Rojo | `#d9201f` (sombra `#8f1210`) | Etiquetas, precios, cintas |
| Amarillo | `#ffd21f` | Sombra de titulares, números, círculos |
| Lima | `#d6e22b` | Píldora del teléfono |
| Crema | `#f6ecd2` | Borde de papel rasgado, píldoras, sellos |
| Tinta | `#141414` | Texto principal |
| Papel picado | rojo, crema, amarillo, naranja `#ff7a1a`, rosa `#e4007c`, verde | Guirnaldas |

### 15.3 Tipografías
- **Smokum:** titulares western condensados, en negro con sombra amarilla de 6 px.
- **Rye:** precios y números grandes (amarillo con sombra roja, o blanco).
- **Oswald 500–700:** etiquetas, teléfono y texto en mayúsculas con tracking.
- **Poppins 700 itálica:** apoyo, como "Incluye bebida".
- **Bebas Neue y Playfair Display itálica:** se usaron en la versión sobria y pueden servir para variar.
- **Varía las combinaciones** en cada pieza.

### 15.4 Fondos y texturas
- Papel verde claro con nubes suaves, **grietas blancas finas** y **semitono de puntos blancos**.
- **Bandas verdes** arriba y abajo (o inclinadas) con **borde de papel rasgado crema**.
- Alternativas cuando se pide algo distinto: mapa oscuro, fondo rojo con patrón (lotería), fondo oscuro con foto.
- **Si pido "fondo sin comida", nada de comida de fondo.**

### 15.5 Componentes de la marca
- **Etiqueta roja con esquina doblada** (+ píldora blanca debajo).
- **Etiqueta colgante con hoyito** (precio).
- **Sello redondo** de fecha.
- **Calendario con anillos.**
- **Cinta roja** de fecha.
- **"+" en círculo amarillo.**
- **Píldora lima** con un círculo negro con ícono de teléfono y "7099-1660", más "ÚNICAMENTE DELIVERY".
- **Píldora amarilla con pin** para la dirección (cuando haya local).
- **Guirnalda de papel picado.**
- **Chile rojo** de acento (arriba a la derecha o a la izquierda), **rodajas de limón**, **sombrero con bigote** (mascota) y **carta de lotería**.
- **Foto real de comida** como sticker con borde rasgado y sombra.
- **Sopa ilustrada** (vaso o plato).

### 15.6 Jerarquía
Logo → titular → **dato clave (precio o fecha)** → detalle (carnes, qué incluye) → teléfono y "únicamente delivery". Pocos elementos, el texto de cuerpo siempre legible y nunca apretado. Las cajas se ajustan a su contenido (sin espacios vacíos de más).

### 15.7 Formatos
- **1080×1350 por defecto**, exportado al doble (2160×2700).
- Versión **TikTok 1080×1920**.
- Versión **WhatsApp JPG**.

### 15.8 Estilo de textos y publicidad (copy)

- **Tono:** cercano, alegre y bien mexicano-salvadoreño, sin exagerar ni usar groserías. Frases cortas con gancho: "¡Pues aquí LO TENEMOS!", "¡A LA HORNILLA!", "¡Con tu bebida!", "¡hasta tu casa!", "¡Volvemos pronto!", "Precios Charros", "La promo", "Combo extra especial".
- **Siempre incluir:** qué es, el **precio claro**, las **fechas o días de validez**, la elección de carne si aplica, si **incluye bebida**, **"Únicamente delivery en Sonsonate"**, el **7099-1660** y el enlace para pedir.
- **Textos para WhatsApp o el canal:**
  - Emojis temáticos al inicio de cada línea (🤠🔥 🌮 🌯 📅 💲 🛵 📲 📞 📢 🎁 👉).
  - Títulos en *negrita* de WhatsApp (`*TEXTO*`) y precios en negrita.
  - Líneas cortas separadas por un salto.
  - Cierre fijo:
    ```
    🛵 Únicamente delivery en Sonsonate
    📲 Pide aquí: {pedido}
    📞 {telefono}
    ```
  - Menos de 1024 caracteres si va como pie de foto.
- **Nombres de promos usados:** "¡PRECIOS CHARROS!", "¡LA PROMO!", "COMBO EXTRA ESPECIAL" (antes "Combo de la semana"), "AVISO", "¡Únete al Club La Hornilla!", "Promos extra especiales solo para el canal".
- **Honestidad:**
  - Sin reseñas ni testimonios inventados.
  - Sin "cupones" falsos en capturas.
  - Las fotos muestran la cantidad real.
  - Si algo no está disponible (pupusas, local), no se anuncia.
  - El envío lo cobra el delivery externo, así que **no prometer "envío gratis" ni un precio de envío propio** sin confirmarlo conmigo.

---

## 16. CÓMO QUIERO LOS DISEÑOS (feedback acumulado)

- Usa mis piezas reales como base (logo, chile, sombrero con bigote, fotos de comida), pero **crea un diseño nuevo y coherente**, no solo edites lo que mandé.
- **"Ya no le des ese toque así más normal"** → inspírate en los primeros diseños y en mis imágenes, pensando en qué más darle el toque Hornilla.
- **"Siento que está muy animado"** → bájale a la ilustración y a lo caricaturesco, pero sin volverlo genérico.
- **"Ponle otro fondo"** y **"que no sea fondo con comida"** → texturas, mapas o patrones.
- **"Reinventa esta promoción con el estilo que vamos llevando"** → rehacer desde cero con la identidad, no parchear.
- Cuando cambia un precio o una fecha, **actualiza la pieza y reemplázala donde ya está** (mismo nombre y misma carpeta, subiendo la `v` de la galería).
- **Nunca más fotos con más producto del que incluye la promo.**
- **Ya no hay pupusas:** no las menciones en piezas nuevas. "Guanaco" se cambió a "Salvadoreño" y luego se quitó por completo.
- Revisa **todo**: textos cortados en pizarras o cajas, alineaciones, contraste y legibilidad en el celular.

---

## 17. VIDEO PROMOCIONAL Y MÚSICA

### 17.0 Estilo visual de los videos

- **Mismo mundo gráfico que los flyers:**
  - Papel verde claro con bandas verdes rasgadas arriba y abajo, papel picado, chile y limones.
  - Etiquetas rojas dobladas, píldoras blancas y la píldora lima del teléfono.
- **Tipografías:** Smokum y Rye (titulares western), **Bungee** y **Shrikhand** (golpes de texto), **Pacifico** (frases cursivas como "¡hasta tu casa!", "página web", "canal de WhatsApp"), Oswald y Poppins.
- **Escenas especiales:**
  - **Pizarra negra** con letras amarillas ("¡Y TAMBIÉN!").
  - **Llamas** al pie con "TODO HECHO AL MOMENTO · ¡A LA HORNILLA!".
  - **Mapa ilustrado** con calles, una moto de reparto y una ruta roja hasta un pin ("SOLO DELIVERY").
  - **Fondo amarillo** con un celular que marca 7099-1660.
  - **Mockups de celular** con la web real y con el canal de WhatsApp.
  - **Cierre** con fondo verde de rayos (sunburst) y el logo grande.
- **Fotos reales** de la comida (tacos, quesadilla, torta, combos con bebida) en tarjetas inclinadas con borde de papel.
- **Ritmo:** cortes dinámicos sincronizados con la música, textos que entran con rebote o escala y transiciones de papel. Todo legible en el celular.
- **Formato:** 1080×1350 (4:5) para WhatsApp e Instagram. Para TikTok o Reels conviene una versión **1080×1920**.

### 17.1 Video promocional v4 (36 s, 1080×1350, 30 fps)

Escenas en orden:
1. Gancho: "¿…MEXICANO?" → "¡Pues aquí **LO TENEMOS**!"
2. "**COMIDA MEXICANA** · aquí en Sonsonate"
3. **TACOS** (Pastor · Suadero · Pollo pastor · Birria · Cochinita; orden de 4)
4. **QUESADILLAS** (orden de 3 unidades)
5. **TORTAS** ("Con la carne que quieras")
6. **¡Y TAMBIÉN!** Pizarra con **Burritos, Nachos y Sopa de tortilla**
7. **EXTRAS** ("¡ponle más sabor!"): Aguacate, Queso fundido, Piña, Jalapeño toreado
8. **COMBOS** ("¡Con tu bebida!")
9. "TODO HECHO **AL MOMENTO** · ¡A LA HORNILLA!"
10. **SOLO DELIVERY** ("Por ahora atendemos únicamente a domicilio… ¡hasta tu casa! en Sonsonate")
11. Llamada: "Marcando… **PIDE AL 7099-1660** · Llámanos o escríbenos por WhatsApp"
12. "Entra a nuestra página web" (barra de navegador `yaya2315.github.io/la-hornilla-de-zaid`)
13. "Únete a nuestro **canal de WhatsApp**" (simulación del canal con mensajes: "🤠 ¡PRECIOS CHARROS!…", "🎁 Promos extra especiales solo para el canal", "📢 Anuncios: ¡nuevo local muy pronto!")
14. Cierre: logo, 📞 7099-1660, "Únicamente delivery · Sonsonate" y "Síguenos en el canal".

- **Cambios de v4:** se quitaron todas las pupusas y se usó "COMIDA MEXICANA" en lugar de "salvadoreña o guanaca".
- **Capturas de la web dentro del video:** sin reseñas ni cupones de prueba (nada falso).

**Archivos:** `Imagenes/avisos/Video promocional (con música).mp4` (12.4 MB) y la versión sin música. **Los .mp4 no se suben a GitHub.**

### 17.2 Música
- **Rechazado:** música sintetizada con numpy ("suena a videojuego"), "mix mariachi" sintetizado y un **corrido MIDI** con soundfont FluidR3 ("suena muuuuy a videojuego").
- **Lo que quiero:** sonido **bien mexicano, tipo corridos o corridos tumbados**, real y no sintetizado.
- **Canción actual:** **"Guitar Mexican Corridos Tumbados Beat Music 2026"** de **Watermelon_Beats** en **Pixabay** (https://pixabay.com/music/pop-guitar-mexican-corridos-tumbados-beat-music-2026-489260/). Es corrido tumbado con requinto y beat, de 2:49.
  - **Licencia Pixabay:** uso gratis en videos, también comerciales. **No se vende ni se reparte el audio suelto** (por eso `Imagenes/audios/` está en `.gitignore`).
- **Mezcla del video:**
  - Los primeros 36 s de la canción, con fade-in de 0.25 s y fade-out en los últimos 2.8 s (termina sobre el logo).
  - Los efectos de transición al 55 % debajo de la música, con limitador y normalizado a **-14 LUFS** (estándar de Instagram y TikTok), en AAC 192 kbps.
- **En `Imagenes/audios/`:** el fragmento de 36 s y `LEEME.txt` con los créditos. La canción completa quedó en mi carpeta **Descargas** como `corridos-tumbados-watermelon-beats.mp3`.
- **Otras fuentes válidas:** Pixabay Music, YouTube Audio Library, TunePocket y Motion Array. También sirve la música dentro de Instagram o TikTok. Siempre se guarda el crédito en el `LEEME.txt`.

---

## 18. PIPELINE TÉCNICO DE PRODUCCIÓN (para Claude)

- **Imágenes:**
  - Se diseñan en **HTML/CSS/SVG** (papel picado, chile, limón, sopa y bandas rasgadas como SVG generados con una semilla para que sean reproducibles).
  - Se renderizan con **Playwright Chromium**: viewport 1080×1350, `device_scale_factor=2`, se espera a `document.fonts.ready` y sale un **PNG 2160×2700**.
  - Con **Pillow LANCZOS** se reduce a **JPG 1080×1350, calidad 92**.
  - **Fuentes** desde npm `@fontsource/*` (smokum, rye, oswald, poppins, bebas-neue, playfair-display) con `@font-face` local.
  - **Fotos:** recortes con `object-fit`/`scale`, o posicionamiento absoluto para controlar exactamente qué se ve (por ejemplo, mostrar solo 2 tacos).
  - **Bordes rasgados:** `clip-path: polygon()` con jitter pseudoaleatorio. Ojo: `clip-path` elimina `box-shadow`, así que la sombra va como `drop-shadow` en el contenedor.
- **TikTok:** plantilla 1080×1920 con `?img=` del PNG en alta calidad. Se renderiza al doble y sale JPG 1080×1920, calidad 95, `subsampling=0`.
- **Video:**
  - Cada escena es una función `render(t)` en una página HTML. Playwright captura **cuadros JPEG** que van por pipe a **ffmpeg** por segmento, y luego se concatenan.
  - El audio se mezcla con ffmpeg: `afade`, `amix normalize=0`, `alimiter` y `loudnorm I=-14:TP=-1.5:LRA=11`, en AAC.
  - Se exporta en alta calidad y en una versión para WhatsApp (unos 12 MB).
- **Pruebas web:**
  - Playwright en celular (390×844) y en compu (1366×900), con **stubs de Firebase** (datos falsos solo para probar, nunca publicados).
  - Las rutas de red se interceptan y se revisan los errores de consola.
  - `offsetWidth` da 0 en secciones ocultas, así que hay que usar anchos en línea. Los modales en el celular usan `grid-template-columns: minmax(0,1fr)` para no desbordarse.
- **Antes de entregar:** mirar el render en grande y buscar cortes, encimados, halos y textos ilegibles.

---

## 19. CÓMO TRABAJAR CON MI COMPU Y CON GIT

- **Mi compu:** Windows, PowerShell, VS Code. La carpeta del sitio está dentro de OneDrive.
- **Si hay acceso a mi carpeta:**
  - Escribe los archivos **desde una carpeta nueva y única cada vez**. Reusar la misma ruta dejó contenido viejo.
  - **Verifica** después de guardar, volviendo a leer el archivo y comparando el md5.
  - Usa una protección de "fecha de modificación esperada" para **no pisar cambios míos**.
- **Si no hay acceso**, dame el archivo y los comandos.
- **Al terminar, siempre los comandos de git.**
- Después de cada `git push`, GitHub Pages tarda **1 o 2 minutos**. Recargar con **Ctrl + F5**.
- **Caché de imágenes:** nombre nuevo, o `v` en `canal-imagenes.js`.
- **Reglas de Firestore:** se pegan en la consola de Firebase a mano (no se despliegan con git).

---

## 20. PENDIENTES, DUDAS ABIERTAS Y MEJORAS SUGERIDAS

**Pendientes:**
- [ ] Agregar `hz_pupusas` (interruptor de pupusas, almacenamiento necesario) a la tabla de la **Política de cookies**.
- [ ] **Horario real** (sobre todo el lunes, que dice "(pupusas)") y unificarlo en Ubicación, JSON-LD y flyers.
- [ ] **Precios en el admin, pestaña Promociones:** sopa + 2 tacos a **$4.50** y sopa + mega quesadilla a **$5.00** (el respaldo del código aún dice "Combo Mega Quesadilla $5.50").
- [ ] Al terminar las promos (después del 1 de noviembre): **desactivarlas** en el admin y actualizar o quitar sus imágenes de la galería del canal.
- [ ] Verificar que las **reglas de `firestore.rules`** estén pegadas en Firebase (reseñas, club, canal, config).
- [ ] **Local nuevo:** cuando haya dirección, actualizar Ubicación (mapa embebido), JSON-LD, footer y flyers; cambiar `SOLO_DELIVERY = false` en `pedido.js` y quitar o ajustar los badges "Únicamente delivery".
- [ ] Decidir si las imágenes **`-tiktok.jpg`** se suben a GitHub o van al `.gitignore`.
- [ ] Revisar si el lema **"DOS CULTURAS | UN SABOR"** sigue teniendo sentido sin pupusas.
- [ ] Opcional: mover la canción completa de Descargas a `Imagenes/audios/`.

**Mejoras sugeridas:**
- [x] ~~Mapa de pedido.html y mesero centrado en Sonsonate~~ (hecho el 30 de octubre de 2026).
- [x] ~~Envío~~: decidido **no sumarlo** (lo cobran deliverys externos); solo se aclara "(sin envío)" en el total.
- [ ] Actualizar los **respaldos** de precios en `cartas.js` y `pedido.js` para que coincidan con los reales.
- [ ] Al reactivar pupusas: sitemap + título y meta + JSON-LD.

---

## 21. COMANDOS DE REFERENCIA

**Subir cambios:**

```bash
cd "C:\Users\Yaya_2315\OneDrive\Colegio\Computo\La Hornilla de Zaid (Sitio web)"
git status
git add -A
git commit -m "Describe aquí el cambio"
git push
```

**Subir solo unas imágenes** (ejemplo):

```bash
git add Imagenes/promos/promo-nueva.jpg JS/canal-imagenes.js
git commit -m "Nueva promo en la galería del canal"
git push
```

**Después de un `git status`:** no deberían aparecer `.mp4`, `.mov`, `Imagenes/audios/` ni `Publicaciones La Hornilla/` (están ignorados). Si aparece alguno, revisar el `.gitignore` antes del commit.
