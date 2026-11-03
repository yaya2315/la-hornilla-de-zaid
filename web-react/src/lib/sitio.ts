/* =====================================================================
   SITIO — Datos fijos del negocio y rutas (una sola fuente para todo).
   Si cambia el teléfono, el canal o un enlace, se cambia AQUÍ.
   ===================================================================== */

/** Raíz del sitio, calculada desde donde vive este código (carpeta app/). */
export const RAIZ = new URL(/* @vite-ignore */ '../', import.meta.url).href

/** Ruta absoluta a cualquier archivo del sitio: url('Imagenes/logo.png') */
export const url = (ruta: string) => new URL(ruta, RAIZ).href

export const PAGINAS = {
  inicio: url('index.html'),
  menu: url('HTML/menu.html'),
  pupusas: url('HTML/pupusas.html'),
  pedido: url('HTML/pedido.html'),
  ubicacion: url('HTML/ubicacion.html'),
  privacidad: url('HTML/privacidad.html'),
  terminos: url('HTML/terminos.html'),
  cookies: url('HTML/cookies.html'),
  devoluciones: url('HTML/devoluciones.html'),
}

export const NEGOCIO = {
  nombre: 'La Hornilla de Zaid',
  lema: 'Dos culturas | Un sabor',
  telefono: '7099-1660',
  telefonoIntl: '+50370991660',
  whatsapp: '50370991660',
  correo: 'lahornillaz@gmail.com',
  canal: 'https://whatsapp.com/channel/0029Vb8zxK1AjPXHdtwCnh0q',
  resenasGoogle: 'https://g.page/r/Ccxz6wzxhzUCEBM/review',
  zona: 'Sonsonate',
}

export const REDES = [
  { nombre: 'WhatsApp', href: `https://wa.me/${NEGOCIO.whatsapp}` },
  { nombre: 'Instagram', href: 'https://www.instagram.com/la_hornilla_de_zaid' },
  { nombre: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100090295385638&locale=es_LA' },
  { nombre: 'TikTok', href: 'https://www.tiktok.com/@lahornilladezaid' },
] as const

/* OJO (pendiente): el horario aún no está confirmado y había dos versiones.
   Se dejan como estaban en cada página hasta que el dueño lo confirme. */
export const HORARIO_MENU = [
  'Martes a Sábado · 10:30 a.m. – 2:00 p.m. y 5:00 p.m. – 9:00 p.m.',
  'Domingo · 5:00 p.m. – 9:00 p.m.',
]
export const HORARIO_UBICACION = [
  'Lunes · 6:30 a.m. – 10:30 a.m.',
  'Martes a Sábado · 6:30 a.m. – 2:00 p.m. y 5:00 p.m. – 9:00 p.m.',
  'Domingo · 5:00 p.m. – 9:00 p.m.',
]

/** SOLO DELIVERY: mientras no abra el local nuevo. Al abrir, pásalo a false. */
export const SOLO_DELIVERY = true

export const LOGO = url('Imagenes/IMG-20260215-WA0049.jpg.png')

/* Medición (solo si la persona aceptó cookies; la pone JS/consentimiento.js) */
declare global {
  interface Window {
    hornillaTrack?: (nombre: string, params?: Record<string, unknown>) => void
    hornillaCookies?: { abrir: () => void }
  }
}
export function medir(nombre: string, params: Record<string, unknown> = {}) {
  try { window.hornillaTrack?.(nombre, params) } catch { /* la medición nunca bloquea nada */ }
}
export const abrirCookies = () => window.hornillaCookies?.abrir()

export const dinero = (n: number) => '$' + n.toFixed(2)
export const leerPrecio = (t = '') => {
  const n = parseFloat(String(t).replace(/[^0-9.]/g, ''))
  return Number.isFinite(n) ? n : 0
}
