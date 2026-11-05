/* =====================================================================
   VITE — Web pública de La Hornilla de Zaid (React + Tailwind v4 + Cult UI)
   ---------------------------------------------------------------------
   • Multipágina con las MISMAS rutas de siempre, para no romper enlaces,
     Google ni el canal de WhatsApp:
       HTML/menu.html · HTML/pedido.html · HTML/ubicacion.html · HTML/tarjeta.html
   • El build se escribe en la carpeta del sitio (una carpeta arriba):
       - reemplaza esas 5 páginas
       - deja el JS/CSS en  app/  (se borra y se vuelve a crear en cada build)
     No toca nada más: admin, mesero, cocina, historial, páginas legales,
     JS/, CSS/ e Imagenes/ se quedan como están.
   • base "./" = rutas relativas: funciona en GitHub Pages y en Live Server.
   ===================================================================== */
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'

const AQUI = path.dirname(fileURLToPath(import.meta.url))
const SITIO = path.resolve(AQUI, '..')

/* En "npm run dev", sirve las fotos, los JS viejos (cookies) y las
   páginas legales directo desde la carpeta del sitio. */
function servirSitio(): Plugin {
  const tipos: Record<string, string> = {
    '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
    '.svg': 'image/svg+xml', '.js': 'text/javascript', '.css': 'text/css', '.html': 'text/html',
  }
  const propias = new Set(['/HTML/menu.html', '/HTML/pedido.html', '/HTML/ubicacion.html', '/HTML/tarjeta.html'])
  return {
    name: 'servir-sitio-hornilla',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = decodeURIComponent((req.url || '').split('?')[0])
        if (propias.has(url) || !/^\/(Imagenes|JS|CSS|HTML)\//.test(url)) return next()
        const archivo = path.join(SITIO, url)
        if (!archivo.startsWith(SITIO) || !fs.existsSync(archivo)) return next()
        res.setHeader('Content-Type', tipos[path.extname(archivo).toLowerCase()] || 'application/octet-stream')
        fs.createReadStream(archivo).pipe(res)
      })
    },
  }
}

export default defineConfig({
  base: './',
  publicDir: false,
  plugins: [react(), tailwindcss(), servirSitio()],
  resolve: { alias: { '@': path.resolve(AQUI, 'src') } },
  build: {
    outDir: SITIO,
    emptyOutDir: false,
    assetsDir: 'app',
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        /* El Inicio (index.html de la raíz) ya NO sale de aquí: es una página
           estática con el motor scroll-craft (ver portada/). La versión React
           de Inicio se conserva en src/ por si se quiere volver a ella. */
        menu: path.resolve(AQUI, 'HTML/menu.html'),
        pedido: path.resolve(AQUI, 'HTML/pedido.html'),
        ubicacion: path.resolve(AQUI, 'HTML/ubicacion.html'),
        tarjeta: path.resolve(AQUI, 'HTML/tarjeta.html'),
      },
      output: {
        /* Librerías en archivos aparte: el navegador las guarda y las
           reutiliza entre páginas. Leaflet solo se baja al abrir el mapa. */
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (/[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'react'
          if (/[\\/](motion|framer-motion|motion-dom|motion-utils)[\\/]/.test(id)) return 'motion'
          if (/[\\/](firebase|@firebase)[\\/]/.test(id)) return 'firebase'
          if (/[\\/]leaflet[\\/]/.test(id)) return 'leaflet'
          return 'librerias'
        },
      },
    },
  },
})
