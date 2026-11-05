/* =====================================================================
   Firestore por REST (sin el SDK de Firebase: ~150 KB menos por página).
   Solo lo que usa la web pública: leer colecciones, leer un documento,
   una consulta "campo == valor" y crear una reseña pendiente.
   Mismas reglas de seguridad de siempre (firestore.rules).
   ===================================================================== */
const PROYECTO = 'la-hornilla-de-zaid'
const CLAVE = 'AIzaSyC6Dl3tFN7AqEnSDwd7wVmL0pmx_PN0WYg' // clave pública (la misma de JS/firebase-config.js)
const BASE = `https://firestore.googleapis.com/v1/projects/${PROYECTO}/databases/(default)/documents`

type Valor = Record<string, unknown>
export class ErrorFirestore extends Error {
  constructor(public estado: number) { super('Firestore ' + estado) }
}

function leerValor(x: Valor | undefined): unknown {
  if (!x) return null
  if ('stringValue' in x) return x.stringValue
  if ('integerValue' in x) return Number(x.integerValue)
  if ('doubleValue' in x) return x.doubleValue
  if ('booleanValue' in x) return x.booleanValue
  if ('timestampValue' in x) {
    const t = String(x.timestampValue)
    return { toMillis: () => Date.parse(t), toDate: () => new Date(t) }
  }
  if ('nullValue' in x) return null
  if ('arrayValue' in x) return (((x.arrayValue as Valor).values as Valor[]) || []).map(leerValor)
  if ('mapValue' in x) return leerCampos(((x.mapValue as Valor).fields as Record<string, Valor>) || {})
  return null
}
function leerCampos(f: Record<string, Valor>) {
  const o: Record<string, unknown> = {}
  for (const k in f) o[k] = leerValor(f[k])
  return o
}
export type DocREST = { id: string; datos: Record<string, unknown> }
const aDoc = (d: { name: string; fields?: Record<string, Valor> }): DocREST => ({ id: d.name.split('/').pop() || '', datos: leerCampos(d.fields || {}) })

async function pedir(ruta: string, init?: RequestInit) {
  const r = await fetch(`${BASE}${ruta}${ruta.includes('?') ? '&' : '?'}key=${CLAVE}`, init)
  if (!r.ok) throw new ErrorFirestore(r.status)
  return r.json()
}

export async function listar(coleccion: string): Promise<DocREST[]> {
  const out: DocREST[] = []
  let token = ''
  do {
    const j = await pedir(`/${coleccion}?pageSize=300${token ? '&pageToken=' + encodeURIComponent(token) : ''}`)
    for (const d of j.documents || []) out.push(aDoc(d))
    token = j.nextPageToken || ''
  } while (token)
  return out
}

/** null si no existe o si las reglas no dejan leerlo */
export async function leer(coleccion: string, id: string): Promise<DocREST | null> {
  try { return aDoc(await pedir(`/${coleccion}/${encodeURIComponent(id)}`)) } catch (e) {
    if (e instanceof ErrorFirestore && (e.estado === 404 || e.estado === 403)) return null
    throw e
  }
}

export async function donde(coleccion: string, campo: string, igualA: string): Promise<DocREST[]> {
  const q = { structuredQuery: { from: [{ collectionId: coleccion }], where: { fieldFilter: { field: { fieldPath: campo }, op: 'EQUAL', value: { stringValue: igualA } } } } }
  const filas = await pedir(':runQuery', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(q) })
  return (filas as { document?: { name: string; fields?: Record<string, Valor> } }[]).filter((f) => f.document).map((f) => aDoc(f.document!))
}

/** Crea un documento con "creado" = hora del servidor (lo exigen las reglas de reseñas) */
export async function crearConHora(coleccion: string, campos: Record<string, string | number | boolean>) {
  const id = Array.from(crypto.getRandomValues(new Uint8Array(10)), (b) => b.toString(16).padStart(2, '0')).join('')
  const fields: Record<string, Valor> = {}
  for (const [k, v] of Object.entries(campos)) {
    fields[k] = typeof v === 'boolean' ? { booleanValue: v } : typeof v === 'number' ? { integerValue: String(Math.round(v)) } : { stringValue: v }
  }
  const nombre = `projects/${PROYECTO}/databases/(default)/documents/${coleccion}/${id}`
  await pedir(':commit', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ writes: [{ update: { name: nombre, fields }, updateTransforms: [{ fieldPath: 'creado', setToServerValue: 'REQUEST_TIME' }], currentDocument: { exists: false } }] }),
  })
}
