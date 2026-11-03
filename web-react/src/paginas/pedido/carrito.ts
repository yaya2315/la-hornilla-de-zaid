/* =====================================================================
   Carrito — mismo formato y misma clave de sessionStorage que la web
   anterior ('hornilla_carrito'), así un pedido a medio armar no se pierde.
   ===================================================================== */
import { useCallback, useEffect, useState } from 'react'

export type Linea = { id: number; nombre: string; precioUnitario: number; cantidad: number }
const CLAVE = 'hornilla_carrito'

function leer(): Linea[] {
  try { const r = sessionStorage.getItem(CLAVE); return r ? (JSON.parse(r) as Linea[]) : [] } catch { return [] }
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
