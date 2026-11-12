/* =====================================================================
   Carrito — mismo formato y misma clave de sessionStorage que la web
   anterior ('hornilla_carrito'), así un pedido a medio armar no se pierde.
   ===================================================================== */
import { useCallback, useEffect, useState } from 'react'

export type Linea = { id: number; nombre: string; precioUnitario: number; cantidad: number }
const CLAVE = 'hornilla_carrito'

function leer(): Linea[] {
  try {
    const r: unknown = JSON.parse(sessionStorage.getItem(CLAVE) || '[]')
    if (!Array.isArray(r)) return []
    /* Solo líneas bien formadas: un dato dañado no debe romper el total */
    return r.filter((x): x is Linea => !!x && typeof x.id === 'number' && typeof x.nombre === 'string'
      && Number.isFinite(x.precioUnitario) && x.precioUnitario >= 0 && Number.isInteger(x.cantidad) && x.cantidad > 0)
  } catch { return [] }
}

export function usarCarrito() {
  const [lineas, setLineas] = useState<Linea[]>(leer)
  useEffect(() => { try { sessionStorage.setItem(CLAVE, JSON.stringify(lineas)) } catch { /* no crítico */ } }, [lineas])

  /* Si ya hay una línea igual (mismo nombre y precio), solo suma la cantidad */
  const agregar = useCallback((nombre: string, precioUnitario: number, cantidad: number) => {
    setLineas((l) => {
      const i = l.findIndex((x) => x.nombre === nombre && x.precioUnitario === precioUnitario)
      if (i >= 0) return l.map((x, j) => (j === i ? { ...x, cantidad: x.cantidad + cantidad } : x))
      const id = l.reduce((m, x) => Math.max(m, x.id), 0) + 1
      return [...l, { id, nombre, precioUnitario, cantidad }]
    })
  }, [])
  const quitar = useCallback((id: number) => setLineas((l) => l.filter((x) => x.id !== id)), [])
  const vaciar = useCallback(() => setLineas([]), [])
  const subtotal = lineas.reduce((s, x) => s + x.precioUnitario * x.cantidad, 0)
  const piezas = lineas.reduce((s, x) => s + x.cantidad, 0)
  return { lineas, agregar, quitar, vaciar, subtotal, piezas }
}

/* ── Reglas del pedido (iguales a la web anterior) ─────────────────── */
export const CATEGORIAS_CARNE_GRUPO = ['Tacos', 'Burrito', 'Tortas', 'Nachos', 'Quesadillas']
export const CATEGORIAS_CARNE_APARTE = ['Sopa de Tortilla']
export const CARNES = ['Pastor', 'Pollo pastor', 'Suadero', 'Cochinita pibil', 'Birria']
/** La piña solo va con carnes "pastor" (Pastor, Pollo pastor) y no cuesta extra */
export const llevaPina = (carne = '') => carne.toLowerCase().includes('pastor')

/* Tacos y quesadillas se venden por orden: "1 Orden de tacos de birria" */
export const CATEGORIAS_POR_ORDEN = ['Tacos', 'Quesadillas']
const minus = (t: string) => t.charAt(0).toLowerCase() + t.slice(1)
export const nombreOrden = (plato: string, carne: string, extra = '') => `Orden de ${minus(plato)} de ${carne.toLowerCase()}${extra}`

/* Promo de tacos sueltos (ej. "Tacos a $0.99"): la línea dice "5 tacos mixtos" */
export const TACOS_SUELTOS = 'tacos mixtos'
export const esPromoTacosSueltos = (nombre: string, precio: number) => /taco/i.test(nombre) && precio > 0 && precio < 1

/* Texto de la línea con su cantidad, en singular o plural */
export function textoLinea(cantidad: number, nombre: string) {
  let n = nombre
  if (cantidad > 1) n = n.replace(/^Orden de /, 'Órdenes de ')
  else if (n === TACOS_SUELTOS) n = 'taco mixto'
  return `${cantidad} ${n}`
}
