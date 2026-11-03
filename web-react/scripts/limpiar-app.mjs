/* Borra SOLO la carpeta app/ del sitio (el JS/CSS del build anterior),
   para que no se acumulen archivos viejos. No toca nada más. */
import { rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
const app = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'app')
rmSync(app, { recursive: true, force: true })
console.log('Carpeta limpia:', app)
