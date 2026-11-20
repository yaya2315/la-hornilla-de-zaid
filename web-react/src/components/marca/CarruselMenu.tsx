/* =====================================================================
   CarruselMenu — foto que va rotando por TODO el menú (portada del menú).
   • Debajo de la foto va la línea con los nombres de los platillos: el que
     está en pantalla se ilumina (con una barrita que se llena) y los demás
     se ven más oscuros. Tocar un nombre salta a ese platillo.
   • Cada platillo sale de la carta (Firebase o respaldo) y usa su foto
     oficial (fotoDe). El letrero de arriba es la nota del platillo
     ("Orden de 4", "Orden de 3"…), así la foto no promete más de lo que trae.
   • Rota SOLO, siempre: el reloj es de JavaScript (no depende de animaciones
     CSS), así funciona aunque el celular tenga "quitar animaciones" o ahorro
     de batería. Con "reducir movimiento" solo se quita el zoom: queda el
     fundido suave entre fotos y la barrita sigue avanzando.
   • La barrita muestra el tiempo; pausar (mouse encima, pestaña oculta)
     congela barra y cambio juntos.
   • Se pausa si la pestaña está oculta, el carrusel no se ve, o la persona
     le pasa el mouse encima / usa el teclado (tocar en celular no la pausa).
   ===================================================================== */
import { useEffect, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { fotoDe, type Plato } from '@/lib/datos'
import { cn } from '@/lib/utils'

const TIEMPO = 3800 // cuánto dura cada platillo

export function CarruselMenu({ platos }: { platos: Plato[] }) {
  const reducir = useReducedMotion()
  const raiz = useRef<HTMLDivElement>(null)
  const barra = useRef<HTMLSpanElement>(null)
  const transcurrido = useRef(0) // ms que lleva el platillo actual en pantalla

  /* Solo platillos con foto; si dos usan la misma foto, se muestra una vez */
  const items = useMemo(() => {
    const vistos = new Set<string>()
    return platos.flatMap((p) => {
      const foto = fotoDe(p)
      if (!foto || vistos.has(foto)) return []
      vistos.add(foto)
      return [{ nombre: p.nombre, nota: p.nota?.trim() || '', foto }]
    })
  }, [platos])

  const [indice, setActual] = useState(0)
  const [enPantalla, setEnPantalla] = useState(true)
  const [pestanaVisible, setPestanaVisible] = useState(true)
  const [raton, setRaton] = useState(false)   // mouse encima
  const [teclado, setTeclado] = useState(false) // foco de teclado dentro

  /* Si la carta cambia y el índice queda fuera, se usa el primero (sin esperar otro render) */
  const actual = indice < items.length ? indice : 0
  const ir = (i: number) => { transcurrido.current = 0; if (barra.current) barra.current.style.transform = 'scaleX(0)'; setActual(i) }

  useEffect(() => {
    const el = raiz.current
    const io = el && 'IntersectionObserver' in window
      ? new IntersectionObserver(([e]) => setEnPantalla(e.isIntersecting), { threshold: 0.2 })
      : null
    if (el && io) io.observe(el)
    const f = () => setPestanaVisible(!document.hidden)
    document.addEventListener('visibilitychange', f)
    return () => { io?.disconnect(); document.removeEventListener('visibilitychange', f) }
  }, [])

  const rota = items.length > 1 && enPantalla && pestanaVisible && !raton && !teclado

  /* Reloj: suma tiempo mientras no esté en pausa; al llegar a TIEMPO pasa al siguiente */
  useEffect(() => { transcurrido.current = 0; if (barra.current) barra.current.style.transform = 'scaleX(0)' }, [actual])
  useEffect(() => {
    if (!rota) return
    let antes = performance.now()
    const id = setInterval(() => {
      const ahora = performance.now()
      transcurrido.current += Math.min(ahora - antes, 250) // si el navegador se durmió, no salta de golpe
      antes = ahora
      if (transcurrido.current >= TIEMPO) {
        ir((actual + 1) % items.length)
      } else if (barra.current) {
        barra.current.style.transform = `scaleX(${transcurrido.current / TIEMPO})`
      }
    }, 80)
    return () => clearInterval(id)
  }, [rota, items.length, actual])

  /* Descarga con anticipación la foto que sigue */
  useEffect(() => {
    if (items.length < 2) return
    const img = new Image()
    img.src = items[(actual + 1) % items.length].foto
  }, [actual, items])

  if (!items.length) return null
  const it = items[Math.min(actual, items.length - 1)]

  return (
    <div
      ref={raiz}
      onPointerEnter={(e) => { if (e.pointerType === 'mouse') setRaton(true) }}
      onPointerLeave={(e) => { if (e.pointerType === 'mouse') setRaton(false) }}
      onFocus={(e) => { if (e.target.matches(':focus-visible')) setTeclado(true) }}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setTeclado(false) }}
      className="mx-auto w-full max-w-[480px]"
    >
      <figure className="relative rotate-2">
        <span aria-hidden="true" className="recorte-rasgado absolute inset-0 translate-x-2.5 translate-y-2.5 bg-noche-950" />
        <div className="recorte-rasgado relative bg-crema p-[clamp(7px,1.4vw,11px)]">
          <div className="relative aspect-[4/3.2] w-full overflow-hidden bg-noche-950">
            {items.map((x, i) => (
              <img
                key={x.foto}
                src={x.foto}
                alt={i === actual ? `${x.nombre} de La Hornilla de Zaid` : ''}
                aria-hidden={i === actual ? undefined : true}
                width={720}
                height={576}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className={cn(
                  'absolute inset-0 size-full object-cover transition-[opacity,transform,filter] duration-700 ease-out',
                  i === actual ? 'z-[1] scale-100 opacity-100' : cn('z-0 opacity-0 brightness-50', !reducir && 'scale-[1.04]'),
                )}
              />
            ))}
          </div>
        </div>
        {it.nota && (
          <span
            key={it.nota + actual}
            className="absolute -top-8 right-2 z-[2] -rotate-3 animate-[carruselNota_.5s_ease-out_both] font-sans text-base font-semibold text-lima italic"
          >
            {it.nota.toLowerCase()}
          </span>
        )}
      </figure>

      {/* Línea con todo el menú: el que está en pantalla se ilumina, los demás se oscurecen */}
      <nav aria-label="Platillos del menú" className="mt-9">
      <ul className="flex flex-wrap justify-center gap-x-1 gap-y-1.5">
        {items.map((x, i) => {
          const activo = i === actual
          return (
            <li key={x.foto}>
              <button
                type="button"
                onClick={() => ir(i)}
                aria-pressed={activo}
                aria-label={`Ver ${x.nombre}`}
                className={cn(
                  'relative min-h-9 cursor-pointer rounded-[6px] px-2.5 py-1.5 font-ui text-[0.8rem] font-bold tracking-[0.12em] uppercase transition-[color,opacity,text-shadow] duration-500 focus-visible:outline-2 focus-visible:outline-amarillo',
                  activo ? 'text-amarillo opacity-100 [text-shadow:0_0_14px_rgb(255_210_31/0.55)]' : 'text-crema opacity-40 hover:opacity-70',
                )}
              >
                {x.nombre}
                {activo && (
                  <span aria-hidden="true" className="absolute inset-x-2.5 bottom-0 h-[3px] overflow-hidden rounded-full bg-crema/15">
                    <span key={actual} ref={barra} className="block h-full origin-left bg-amarillo" style={{ transform: 'scaleX(0)' }} />
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ul>
      </nav>
      <style>{`
        @keyframes carruselNota { from { opacity: 0; transform: translateY(6px) rotate(-3deg) } to { opacity: 1; transform: translateY(0) rotate(-3deg) } }
      `}</style>
    </div>
  )
}
