/* =====================================================================
   DATOS — Todo lo que la web pública lee de Firebase (lo edita el admin).
   Mismas colecciones y mismas reglas que la web anterior:
     menuCategorias · menuPrincipal · menuPupusas · promociones
     menuBebidas · menuExtras · resenas · config/pupusas · config/fidelidad · tarjetas
   Si Firebase falla o está vacío, se usa el respaldo (la página nunca
   queda vacía). Sin where()/orderBy() en el servidor para platillos: un
   documento sin "orden" quedaría invisible; se ordena aquí.
   ===================================================================== */
import { crearConHora, donde, leer, listar } from './firestore-rest'
/* Fecha de Firestore leída por REST (misma forma que usaba el SDK) */
type Timestamp = { toMillis: () => number; toDate: () => Date }
import { url } from './sitio'

/* ── Tipos ─────────────────────────────────────────────────────────── */
export type Variante = { texto: string; precio: string }
export type Plato = {
  id?: string
  nombre: string
  categoria: string
  nota?: string
  descripcion?: string
  variantes?: Variante[]
  destacado?: boolean
  etiqueta?: string
  precioUnico?: string
  activo?: boolean
  orden?: number
  foto?: string
  carneModo?: 'eleccion' | 'fija' | 'ninguna'
  carneFija?: string
}
export type Carta = { categorias: string[]; platos: Plato[] }
export type Promo = { nombre: string; descripcion?: string; precio?: string; activa?: boolean; dias?: number[]; orden?: number; pideCarne?: boolean }
export type Bebida = { nombre: string; precio: string; grupo?: 'fria' | 'caliente'; activo?: boolean; orden?: number }
export type Extra = { nombre: string; precio: string; activo?: boolean; orden?: number }
export type Resena = { id: string; nombre: string; estrellas: number; comentario: string; respuesta?: string; creado?: Timestamp }

const ordenar = <T extends { orden?: number }>(l: T[]) => l.sort((a, b) => (a.orden ?? Infinity) - (b.orden ?? Infinity))

/* ── Respaldo (igual al de la web anterior) ─────────────────────────── */
const NORMALES = 'Pastor · Pollo pastor · Suadero · Mixta'
const ESPECIALES = 'Cochinita pibil · Birria · Mixta'
export const RESPALDO_MENU: Carta = {
  categorias: ['Tacos', 'Burrito', 'Tortas', 'Nachos', 'Quesadillas', 'Sopa de Tortilla', 'Lo nuevo'],
  platos: [
    { nombre: 'Tacos', categoria: 'Tacos', nota: 'Orden de 4', variantes: [{ texto: NORMALES, precio: '$4.99' }, { texto: ESPECIALES, precio: '$5.99' }] },
    { nombre: 'Burrito', categoria: 'Burrito', variantes: [{ texto: NORMALES, precio: '$4.99' }, { texto: ESPECIALES, precio: '$5.99' }] },
    { nombre: 'Tortas', categoria: 'Tortas', variantes: [{ texto: NORMALES, precio: '$4.99' }, { texto: ESPECIALES, precio: '$5.99' }] },
    { nombre: 'Nachos', categoria: 'Nachos', variantes: [{ texto: NORMALES, precio: '$4.50' }, { texto: ESPECIALES, precio: '$5.50' }] },
    { nombre: 'Quesadillas', categoria: 'Quesadillas', nota: 'Orden de 3', variantes: [{ texto: NORMALES, precio: '$4.99' }, { texto: ESPECIALES, precio: '$5.99' }] },
    { nombre: 'Sopa de Tortilla', categoria: 'Sopa de Tortilla', nota: 'Carne a elección', variantes: [{ texto: 'Media (16 oz)', precio: '$3.00' }, { texto: 'Entera (32 oz)', precio: '$5.00' }] },
    {
      nombre: 'Papa Asada', categoria: 'Lo nuevo', destacado: true, etiqueta: 'Lo nuevo', precioUnico: '$5.50', carneModo: 'eleccion',
      descripcion: 'Base de papa asada con mezcla de queso gratinado y cheddar, crema, tu carne a elección, pico de gallo y un toque de salsa de aguacate.',
    },
  ],
}
const RESPALDO_PUPUSAS: Carta = {
  categorias: ['Especialidades', 'Tradicionales', 'Con un toque mexicano'],
  platos: [
    ...['Ayote', 'Mora', 'Queso', 'Queso con loroco', 'Ajo', 'Pollo', 'Chicharrón con queso'].map((n) => ({ nombre: n, categoria: 'Especialidades', variantes: [{ texto: 'c/u', precio: '$1.00' }] })),
    ...['Frijol con queso', 'Revueltas'].map((n) => ({ nombre: n, categoria: 'Tradicionales', variantes: [{ texto: 'c/u', precio: '$0.35' }] })),
    { nombre: 'Birria con queso', categoria: 'Con un toque mexicano', variantes: [{ texto: 'Acompañada de su caldo, cilantro y cebolla', precio: '$1.50' }] },
    { nombre: 'Pollo pastor con queso y piña', categoria: 'Con un toque mexicano', variantes: [{ texto: 'Acompañada de cilantro y cebolla', precio: '$1.50' }] },
    { nombre: 'Pastor con queso y piña', categoria: 'Con un toque mexicano', variantes: [{ texto: '', precio: '$1.50' }] },
  ],
}
const RESPALDO_PROMOS: Promo[] = [
  { nombre: 'Combo Mega Quesadilla', descripcion: '1/2 Sopa de tortilla + Mega Quesadilla + Bebida.', precio: '$5.50', activa: true, dias: [2, 3, 4, 5], pideCarne: true },
  { nombre: 'Combo Mini Torta', descripcion: '1/2 Sopa de tortilla + Mini Torta + Bebida.', precio: '$5.50', activa: true, dias: [2, 3, 4, 5], pideCarne: true },
]
export const RESPALDO_BEBIDAS: Bebida[] = [
  { nombre: 'Latas (Uva, Mirinda)', precio: '$0.90', grupo: 'fria' },
  { nombre: 'Coca Cola lata', precio: '$1.00', grupo: 'fria' },
  { nombre: 'Salutaris (Limón, Naranja, Toronja, Simple)', precio: '$0.90', grupo: 'fria' },
  { nombre: 'Té Lipton (Durazno, Frambuesa, Limón)', precio: '$0.90', grupo: 'fria' },
  { nombre: 'Botella con agua', precio: '$0.70', grupo: 'fria' },
  { nombre: 'Café negro', precio: '$0.50', grupo: 'caliente' },
  { nombre: 'Café con leche', precio: '$0.75', grupo: 'caliente' },
  { nombre: 'Café con cremora', precio: '$0.75', grupo: 'caliente' },
  { nombre: 'Chocolate', precio: '$0.50', grupo: 'caliente' },
  { nombre: 'Chocolate con leche', precio: '$0.75', grupo: 'caliente' },
]
const RESPALDO_EXTRAS: Extra[] = [
  { nombre: 'Aguacate', precio: '$0.75' },
  { nombre: 'Queso fundido', precio: '$1.25' },
  { nombre: 'Piña', precio: '$0.75' },
  { nombre: 'Jalapeño toreado', precio: '$0.50' },
]

/* ── Lectores ──────────────────────────────────────────────────────── */
async function cargarCarta(tipo: 'principal' | 'pupusas'): Promise<Carta> {
  const respaldo = tipo === 'principal' ? RESPALDO_MENU : RESPALDO_PUPUSAS
  try {
    const [cats, platos] = await Promise.all([
      listar('menuCategorias'),
      listar(tipo === 'principal' ? 'menuPrincipal' : 'menuPupusas'),
    ])
    const categorias = ordenar(cats.map((d) => d.datos as { nombre: string; menu: string; orden?: number }).filter((c) => c.menu === tipo)).map((c) => c.nombre)
    const lista = ordenar(platos.map((d) => ({ id: d.id, ...(d.datos as Plato) })).filter((p) => p.activo !== false))
    if (!categorias.length || !lista.length) return respaldo
    return { categorias, platos: lista }
  } catch (err) {
    console.warn('[datos] No se pudo leer la carta, uso respaldo:', err)
    return respaldo
  }
}
export const cargarMenu = () => cargarCarta('principal')
export const cargarPupusas = () => cargarCarta('pupusas')

async function cargarLista<T extends { activo?: boolean; orden?: number }>(col: string, respaldo: T[]): Promise<T[]> {
  try {
    const items = ordenar((await listar(col)).map((d) => d.datos as T).filter((x) => x.activo !== false))
    return items.length ? items : respaldo
  } catch (err) {
    console.warn(`[datos] No se pudo leer ${col}, uso respaldo:`, err)
    return respaldo
  }
}
export const cargarBebidas = () => cargarLista<Bebida>('menuBebidas', RESPALDO_BEBIDAS)
export const cargarExtras = () => cargarLista<Extra>('menuExtras', RESPALDO_EXTRAS)

export async function cargarPromos(): Promise<Promo[]> {
  try {
    const l = ordenar((await listar('promociones')).map((d) => d.datos as Promo))
    return l.length ? l : RESPALDO_PROMOS
  } catch (err) {
    console.warn('[datos] No se pudieron leer las promociones, uso respaldo:', err)
    return RESPALDO_PROMOS
  }
}

/* ── Promos: ¿se muestra hoy? y texto de días ──────────────────────── */
const ORDEN_SEM = [1, 2, 3, 4, 5, 6, 0]
const NOMBRE_DIA: Record<number, string> = { 0: 'domingo', 1: 'lunes', 2: 'martes', 3: 'miércoles', 4: 'jueves', 5: 'viernes', 6: 'sábado' }
export function textoDias(dias?: number[]) {
  if (!Array.isArray(dias) || dias.length === 0 || dias.length >= 7) return 'todos los días'
  const arr = [...dias].sort((a, b) => ORDEN_SEM.indexOf(a) - ORDEN_SEM.indexOf(b))
  const idx = arr.map((d) => ORDEN_SEM.indexOf(d))
  const seguidos = idx.every((v, i) => i === 0 || v === idx[i - 1] + 1)
  if (seguidos && arr.length >= 3) return `${NOMBRE_DIA[arr[0]]} a ${NOMBRE_DIA[arr[arr.length - 1]]}`
  if (arr.length === 1) return NOMBRE_DIA[arr[0]]
  return arr.slice(0, -1).map((d) => NOMBRE_DIA[d]).join(', ') + ' y ' + NOMBRE_DIA[arr[arr.length - 1]]
}
export function seMuestraHoy(p: Promo, hoy = new Date().getDay()) {
  if (p.activa !== true) return false
  const dias = Array.isArray(p.dias) && p.dias.length ? p.dias : [0, 1, 2, 3, 4, 5, 6]
  return dias.includes(hoy)
}

/* ── Fotos de las tarjetas (720×450) ─────────────────────────────────
   Ley del consumidor: la foto no muestra más de lo que trae la orden
   (tacos: 4, quesadillas: 3). Si un platillo trae "foto" en Firebase,
   se usa esa (ruta desde la raíz del sitio). */
const FOTOS: Record<string, string> = {
  tacos: 'tacos/tacos-01-mesa-tarjeta.webp',
  burrito: 'burritos/burrito-03-abierto-tarjeta.webp',
  burritos: 'burritos/burrito-03-abierto-tarjeta.webp',
  torta: 'tortas/torta-01-cenital-tarjeta.webp',
  tortas: 'tortas/torta-01-cenital-tarjeta.webp',
  nachos: 'nachos/nachos-02-para-llevar-tarjeta.webp',
  quesadillas: 'quesadillas/quesadillas-01-para-llevar-centrada-tarjeta.webp',
  'sopa de tortilla': 'Sopas/sopa-de-tortilla-02-tazon-tarjeta.webp',
  'papa asada': 'papa-asada/papa-asada-01-mesa-sin-marca-tarjeta.webp',
}
const normal = (t?: string) => String(t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim()
export function fotoDe(p: Plato) {
  if (p.foto) return url(p.foto)
  const f = FOTOS[normal(p.nombre)] || FOTOS[normal(p.categoria)]
  return f ? url('Imagenes/fotos-de-platillos/' + f) : ''
}

/* ── Modelos 3D (Imagenes/modelos-3d/lista.json, la misma lista del Inicio) ──
   Clave del platillo -> archivo .glb. Sin entrada en la lista no hay botón 3D. */
const SLUG_3D: Record<string, string> = {
  tacos: 'tacos', burrito: 'burrito', burritos: 'burrito', torta: 'tortas', tortas: 'tortas', nachos: 'nachos',
  quesadillas: 'quesadillas', 'sopa de tortilla': 'sopa', 'papa asada': 'papa',
}
let promesaModelos: Promise<Record<string, string>> | null = null
export function cargarModelos3D() {
  if (!promesaModelos) promesaModelos = fetch(url('Imagenes/modelos-3d/lista.json'), { cache: 'no-cache' })
    .then((r) => (r.ok ? r.json() : {}))
    .then((j: { modelos?: Record<string, string> }) => Object.fromEntries(Object.entries(j.modelos || {}).map(([k, v]) => [k, url('Imagenes/modelos-3d/' + v)])))
    .catch(() => ({}))
  return promesaModelos
}
export const slug3D = (p: Plato) => SLUG_3D[normal(p.nombre)] || SLUG_3D[normal(p.categoria)] || ''

/* ── Interruptor de pupusas (config/pupusas por la API REST) ─────────── */
const CLAVE_PUPUSAS = 'hz_pupusas'
let promesaPupusas: Promise<boolean> | null = null
const cachePupusas = () => { try { return localStorage.getItem(CLAVE_PUPUSAS) === '1' } catch { return false } }
const marcarPupusas = (on: boolean) => document.documentElement.classList.toggle('pupusas-on', on)
marcarPupusas(cachePupusas())
export function pupusasActivas() {
  if (promesaPupusas) return promesaPupusas
  promesaPupusas = (async () => {
    try {
      const r = await fetch('https://firestore.googleapis.com/v1/projects/la-hornilla-de-zaid/databases/(default)/documents/config/pupusas?key=AIzaSyC6Dl3tFN7AqEnSDwd7wVmL0pmx_PN0WYg', { cache: 'no-store' })
      if (r.status === 404) return false
      if (!r.ok) throw new Error('HTTP ' + r.status)
      const d = await r.json()
      return d?.fields?.activo?.booleanValue === true
    } catch (err) {
      console.warn('[pupusas] Sin respuesta del interruptor, uso el último valor:', err)
      return cachePupusas()
    }
  })().then((on) => {
    try { localStorage.setItem(CLAVE_PUPUSAS, on ? '1' : '0') } catch { /* sin almacenamiento */ }
    marcarPupusas(on)
    return on
  })
  return promesaPupusas
}

/* ── Reseñas reales (solo las aprobadas; nunca inventadas) ───────────── */
export async function cargarResenas(): Promise<Resena[]> {
  try {
    /* El where() es obligatorio: las reglas solo dejan leer las aprobadas */
    return (await donde('resenas', 'estado', 'aprobada'))
      .map((d) => ({ id: d.id, ...(d.datos as Omit<Resena, 'id'>) }))
      .sort((a, b) => (b.creado?.toMillis?.() || 0) - (a.creado?.toMillis?.() || 0))
  } catch (err) {
    console.warn('[datos] No se pudieron leer las reseñas:', err)
    return []
  }
}
/** Llega como "pendiente"; se publica cuando se aprueba en el admin (Clientes). */
export async function enviarResena(r: { nombre: string; estrellas: number; comentario: string }) {
  await crearConHora('resenas', {
    nombre: r.nombre, estrellas: r.estrellas, comentario: r.comentario,
    estado: 'pendiente', aceptoPublicar: true,
  })
}

/* ── Tarjeta Hornilla (tarjeta de sellos) ─────────────────────────────
   • config/fidelidad: reglas que edita el admin (pestaña Clientes → Tarjeta).
   • tarjetas/{codigo}: se lee SOLO conociendo el código; trae primer nombre
     y conteo. Los sellos y canjes los pone únicamente el negocio (admin). */
export type ReglasTarjeta = { activo: boolean; meta: number; minimo: number; premio: string; condiciones: string }
export type DatosTarjeta = { codigo: string; nombre: string; sellos: number; premios: number; canjes: number }

/** Mismo formato que las reglas de Firestore: HZ- + 6 letras/números (sin I, L, O, 0, 1) */
export const CODIGO_TARJETA = /^HZ-[A-HJ-KM-NP-Z2-9]{6}$/

/** Acepta "hz k7m4qx", "HZ-K7M4QX" o solo "K7M4QX" y lo deja como HZ-K7M4QX */
export function normalizarCodigo(texto: string) {
  const t = String(texto || '').toUpperCase().replace(/[^A-Z0-9]/g, '')
  const cuerpo = t.startsWith('HZ') ? t.slice(2) : t
  return cuerpo ? 'HZ-' + cuerpo : ''
}

export async function cargarReglasTarjeta(): Promise<ReglasTarjeta | null> {
  try {
    const d = await leer('config', 'fidelidad')
    if (!d) return null
    const r = d.datos
    return {
      activo: r.activo === true,
      meta: Math.max(2, Number(r.meta) || 8),
      minimo: Math.max(0, Number(r.minimo) || 0),
      premio: String(r.premio || ''),
      condiciones: String(r.condiciones || ''),
    }
  } catch (err) {
    console.warn('[datos] No se pudieron leer las reglas de la tarjeta:', err)
    return null
  }
}

/** null = no existe esa tarjeta; lanza error solo si falla la conexión */
export async function cargarTarjeta(codigo: string): Promise<DatosTarjeta | null> {
  if (!CODIGO_TARJETA.test(codigo)) return null
  try {
    const d = await leer('tarjetas', codigo)
    if (!d) return null
    const t = d.datos
    return {
      codigo,
      nombre: String(t.nombre || ''),
      sellos: Math.max(0, Number(t.sellos) || 0),
      premios: Math.max(0, Number(t.premios) || 0),
      canjes: Math.max(0, Number(t.canjes) || 0),
    }
  } catch (err) {
    if ((err as { code?: string })?.code === 'permission-denied') return null
    throw err
  }
}
