# web-react — Web pública de La Hornilla de Zaid (React + Cult UI)

Aquí vive el **código fuente** de las 4 páginas públicas:

| Página    | Archivo publicado        | Código                       |
|-----------|--------------------------|------------------------------|
| Inicio    | `index.html`             | `src/paginas/Inicio.tsx`     |
| Menú      | `HTML/menu.html`         | `src/paginas/Menu.tsx`       |
| Pedir     | `HTML/pedido.html`       | `src/paginas/Pedido.tsx`     |
| Ubicación | `HTML/ubicacion.html`    | `src/paginas/Ubicacion.tsx`  |

Las demás (admin, mesero, cocina, historial, pupusas y legales) **no usan React**:
siguen igual, con `CSS/style.css`, `CSS/marca.css` y `JS/firebase-config.js`.

## Importante

- **No edites a mano** `index.html`, `HTML/menu.html`, `HTML/pedido.html`,
  `HTML/ubicacion.html` ni la carpeta `app/` de la raíz: se **generan** con `npm run build`.
- Los datos (menú, promos, bebidas, extras, reseñas, interruptor de pupusas) se siguen
  editando en el **admin**, como siempre. Solo hay que construir cuando cambias el diseño o el código.
- El envío **no se suma** al total ("Total estimado (sin envío)"), `SOLO_DELIVERY = true`
  está en `src/lib/sitio.ts` y las pupusas siguen ocultas con el interruptor del admin.

## Cómo trabajar (Windows / PowerShell, Node 20 o más nuevo)

```powershell
cd "C:\Users\Yaya_2315\OneDrive\Colegio\Computo\La Hornilla de Zaid (Sitio web)\web-react"
npm install        # solo la primera vez (crea node_modules, que NO se sube a GitHub)
npm run dev        # vista previa en vivo: abre la dirección que te muestra (http://localhost:5173)
npm run build      # genera las 4 páginas y la carpeta app/ en la raíz del sitio
npm run preview    # sirve el sitio ya construido en http://localhost:4173, igual que GitHub Pages
```

Después de `npm run build`, revisa que al final diga **"✓ built"**. Si sale un error,
**no subas nada** (la página se quedaría sin su carpeta `app/`): copia el error y pásamelo.
Si todo salió bien, sube todo desde la raíz del sitio:

```powershell
cd ..
git add -A   # incluye app/ y las páginas generadas
git commit -m "Describe aquí el cambio"
git push
```

GitHub Pages tarda 1 o 2 minutos; recarga con **Ctrl + F5**.

## Dónde está cada cosa

- `src/estilos/app.css` — tokens de marca (colores, tipografías, sombras), texturas
  (papel rasgado, papel picado, semitono, esquina doblada) y el aviso de cookies.
- `src/components/ui/` — componentes de **Cult UI** adaptados a la marca
  (TextureButton, TextureCard, NeumorphEyebrow, DirectionAwareTabs, TextAnimate,
  FoldedCard, RollingNumber, TextureOverlay). Licencia MIT en `CULT-UI-LICENCIA.md`.
- `src/components/marca/` — piezas propias: encabezado, menú lateral, pie, precio,
  etiqueta roja, aviso delivery, tarjeta de promo, iconos y el fueguito de carga.
- `src/lib/sitio.ts` — teléfono, WhatsApp, correo, horarios, redes, enlaces.
- `src/lib/datos.ts` — lectura de Firestore, datos de respaldo y fotos de cada platillo.
- `src/paginas/pedido/` — carrito (misma clave `hornilla_carrito`) y mapa del pedido.

## Agregar un componente de Cult UI

Copia el componente desde https://www.cult-ui.com a `src/components/ui/`, conserva el
encabezado de licencia y cambia sus colores por los tokens de `app.css`
(`bg-rojo`, `text-crema`, `bg-noche-700`, `font-ui`, `font-titulo`, `font-precio`…).
