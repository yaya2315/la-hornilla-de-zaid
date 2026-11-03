/* Sirve la carpeta del sitio completa (como GitHub Pages) para revisar el
   build: node scripts/servir-sitio.mjs  →  http://localhost:4173/ */
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const SITIO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
const tipos = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.xml': 'application/xml', '.json': 'application/json' }
http.createServer((req, res) => {
  let url = decodeURIComponent(req.url.split('?')[0])
  if (url.endsWith('/')) url += 'index.html'
  const archivo = path.join(SITIO, url)
  if (!archivo.startsWith(SITIO) || !fs.existsSync(archivo) || fs.statSync(archivo).isDirectory()) { res.statusCode = 404; return res.end('No encontrado') }
  res.setHeader('Content-Type', tipos[path.extname(archivo).toLowerCase()] || 'application/octet-stream')
  fs.createReadStream(archivo).pipe(res)
}).listen(4173, () => console.log('Sitio en http://localhost:4173/'))
