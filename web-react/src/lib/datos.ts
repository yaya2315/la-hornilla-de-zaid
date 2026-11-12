/* =====================================================================
   DATOS — Todo lo que la web pública lee de Firebase (lo edita el admin).
   Mismas colecciones y mismas reglas que la web anterior:
     menuCategorias · menuPrincipal · menuPupusas · promociones
     menuBebidas · menuExtras · resenas · config/pupusas · config/fidelidad · tarjetas
   Si Firebase falla o está vacío, se usa el respaldo (la página nunca
   queda vacía). Sin where()/orderBy() en el servidor para platillos: un
   documento sin "orden" quedaría invisible; se ordena aquí.
   ===================================================================== */
import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, where, type Timestamp } from 'firebase/firestore/lite'
import { db } from './firebase'
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

/* ── Respaldo ──────────────────────────────────────────────────────────
   Solo se usa si Firebase no responde o la colección está vacía. Debe
   coincidir con lo publicado en el admin (revisado en noviembre 2026):
   un precio viejo aquí sería un precio falso en la página. */
const porCarne = (normal: string, especial: string): Variante[] => [
  ...['Pastor', 'Pollo pastor', 'Suadero', 'Mixto'].map((texto) => ({ texto, precio: normal })),
  ...['Birria', 'Cochinita pibil', 'Mixto'].map((texto) => ({ texto, precio: especial })),
]
export const RESPALDO_MENU: Carta = {
  categorias: ['Tacos', 'Burrito', 'Tortas', 'Nachos', 'Quesadillas', 'Sopa de tortilla', 'Papa asada'],
  platos: [
    { nombre: 'Tacos', categoria: 'Tacos', nota: 'Orden de 4', variantes: porCarne('$4.00', '$5.00') },
    { nombre: 'Burrito', categoria: 'Burrito', variantes: porCarne('$4.00', '$5.00') },
    { nombre: 'Tortas', categoria: 'Tortas', variantes: porCarne('$4.00', '$5.00') },
    { nombre: 'Nachos', categoria: 'Nachos', variantes: porCarne('$4.00', '$5.00') },
    { nombre: 'Quesadillas', categoria: 'Quesadillas', nota: 'Orden de 3', variantes: porCarne('$4.00', '$5.00') },
    { nombre: 'Sopa de tortilla', categoria: 'Sopa de tortilla', nota: 'Carne a elección', carneModo: 'eleccion', variantes: [{ texto: 'Media (16 oz)', precio: '$3.00' }, { texto: 'Entera (32 oz)', precio: '$5.00' }] },
    { nombre: 'Papa asada', categoria: 'Papa asada', nota: 'Carne a elección', carneModo: 'eleccion', variantes: [{ texto: 'Carne a elección', precio: '$5.50' }] },
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
export const RESPALDO_BEBIDAS: Bebida[] = [
  { nombre: 'Mini botella de Pepsi', precio: '$0.50', grupo: 'fria' },
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
      getDocs(collection(db, 'menuCategorias')),
      getDocs(collection(db, tipo === 'principal' ? 'menuPrincipal' : 'menuPupusas')),
    ])
    const categorias = ordenar(cats.docs.map((d) => d.data() as { nombre: string; menu: string; orden?: number }).filter((c) => c.menu === tipo)).map((c) => c.nombre)
    /* Respaldo solo si la colección está VACÍA. Si el dueño desactivó
       platillos, se respeta: no se "reviven" con datos viejos. */
    if (!categorias.length || platos.empty) return respaldo
    const lista = ordenar(platos.docs.map((d) => ({ id: d.id, ...(d.data() as Plato) })).filter((p) => p.activo !== false))
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
    const snap = await getDocs(collection(db, col))
    /* Igual que la carta: lo que el dueño desactivó no vuelve a aparecer */
    if (snap.empty) return respaldo
    return ordenar(snap.docs.map((d) => d.data() as T).filter((x) => x.activo !== false))
  } catch (err) {
    console.warn(`[datos] No se pudo leer ${col}, uso respaldo:`, err)
    return respaldo
  }
}
export const cargarBebidas = () => cargarLista<Bebida>('menuBebidas', RESPALDO_BEBIDAS)
export const cargarExtras = () => cargarLista<Extra>('menuExtras', RESPALDO_EXTRAS)

export async function cargarPromos(): Promise<Promo[]> {
  try {
    const snap = await getDocs(collection(db, 'promociones'))
    return ordenar(snap.docs.map((d) => d.data() as Promo))
  } catch (err) {
    /* Sin respaldo a propósito: una promo que no se pudo confirmar no se anuncia */
    console.warn('[datos] No se pudieron leer las promociones:', err)
    return []
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
    const snap = await getDocs(query(collection(db, 'resenas'), where('estado', '==', 'aprobada')))
    return snap.docs
      .map((d) => ({ id: d.id, ...(d.data() as Omit<Resena, 'id'>) }))
      .sort((a, b) => (b.creado?.toMillis?.() || 0) - (a.creado?.toMillis?.() || 0))
  } catch (err) {
    console.warn('[datos] No se pudieron leer las reseñas:', err)
    return []
  }
}
/** Llega como "pendiente"; se publica cuando se aprueba en el admin (Clientes). */
export async function enviarResena(r: { nombre: string; estrellas: number; comentario: string }) {
  await addDoc(collection(db, 'resenas'), {
    nombre: r.nombre, estrellas: r.estrellas, comentario: r.comentario,
    estado: 'pendiente', aceptoPublicar: true, creado: serverTimestamp(),
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
    const d = await getDoc(doc(db, 'config', 'fidelidad'))
    if (!d.exists()) return null
    const r = d.data()
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
    const d = await getDoc(doc(db, 'tarjetas', codigo))
    if (!d.exists()) return null
    const t = d.data()
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
