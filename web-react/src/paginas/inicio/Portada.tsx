/* =====================================================================
   Portada — fotos de platillos a pantalla completa con fundido cruzado.
   • Compu / tablet acostada: fotos horizontales ("ancha").
   • Celular / tablet parada: fotos verticales ("alta").
   • La foto nueva aparece ENCIMA de la anterior (nunca se ve negro).
   • Cada foto se descarga justo antes de mostrarse.
   • Se pausa sola si la pestaña está oculta o la portada no se ve.
   • Con "reducir movimiento": queda fija la primera foto.
   • Sin botón de pausa (así lo pidió el dueño del sitio).
   Para cambiar fotos: edita la lista FOTOS (rutas desde la raíz del sitio).
   ===================================================================== */
import { useEffect, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { url } from '@/lib/sitio'
import { cn } from '@/lib/utils'

type Foto = { src: string; vista: 'ancha' | 'alta'; pos?: string }

const D = 'Imagenes/fotos-de-platillos/'
export const FOTOS: Foto[] = [
  { vista: 'ancha', src: D + 'tacos/tacos-01-mesa-portada.webp', pos: '50% 50%' },
  { vista: 'ancha', src: D + 'tortas/torta-01-cenital-portada.webp', pos: '50% 55%' },
  { vista: 'ancha', src: D + 'tortas/minitorta-01-con-bebida-portada.webp', pos: '50% 60%' },
  { vista: 'ancha', src: D + 'tortas/minitorta-02-mesa-portada.webp', pos: '50% 70%' },
  { vista: 'alta', src: D + 'tacos/tacos-02-con-pina-portada.webp', pos: '50% 50%' },
  { vista: 'alta', src: D + 'burritos/burrito-03-abierto-portada.webp', pos: '50% 50%' },
  { vista: 'alta', src: D + 'quesadillas/quesadillas-03-cenital-portada.webp', pos: '52% 50%' },
  { vista: 'alta', src: D + 'quesadillas/quesadillas-02-plato-portada.webp', pos: '41% 50%' },
]

const TIEMPO = 5200   // cuánto dura cada foto (incluye el fundido)
const FUNDIDO = 1400  // cuánto tarda en aparecer la nueva

const cargadas = new Map<string, Promise<boolean>>()
function precargar(src: string) {
  if (!cargadas.has(src)) {
    cargadas.set(src, new Promise((ok) => {
      const img = new Image()
      img.decoding = 'async'
      img.onload = () => (img.decode ? img.decode() : Promise.resolve()).then(() => ok(true), () => ok(true))
      img.onerror = () => { console.warn('[portada] No se encontró la foto:', src); ok(false) }
      img.src = src
    }))
  }
  return cargadas.get(src)!
}

function usarVista() {
  const mq = useMemo(() => matchMedia('(min-aspect-ratio: 1/1)'), [])
  const [ancha, setAncha] = useState(mq.matches)
  useEffect(() => {
    const f = () => setAncha(mq.matches)
    mq.addEventListener('change', f)
    return () => mq.removeEventListener('change', f)
  }, [mq])
  return ancha ? 'ancha' : 'alta'
}

export function Portada({ contenedor }: { contenedor: React.RefObject<HTMLElement | null> }) {
  const vista = usarVista()
  const reducir = useReducedMotion()
  const fotos = useMemo(() => FOTOS.filter((f) => f.vista === vista).map((f) => ({ ...f, src: url(f.src) })), [vista])
  const [actual, setActual] = useState(0)
  const [anterior, setAnterior] = useState<number | null>(null)
  const [rotas, setRotas] = useState<Set<number>>(new Set())
  const [visible, setVisible] = useState(true)
  const turno = useRef(0)

  /* Al cambiar de vista (girar el celular) se empieza por la primera */
  useEffect(() => { setActual(0); setAnterior(null); setRotas(new Set()); turno.current++ }, [vista])

  /* Pausa si la pestaña se oculta o la portada sale de la pantalla */
  useEffect(() => {
    const el = contenedor.current
    let enPantalla = true
    const actualizar = () => setVisible(enPantalla && !document.hidden)
    const io = el && 'IntersectionObserver' in window
      ? new IntersectionObserver(([e]) => { enPantalla = e.isIntersecting; actualizar() }, { threshold: 0.1 })
      : null
    if (el && io) io.observe(el)
    document.addEventListener('visibilitychange', actualizar)
    return () => { io?.disconnect(); document.removeEventListener('visibilitychange', actualizar) }
  }, [contenedor])

  /* Reloj: cambia a la siguiente foto cuando ya está descargada */
  useEffect(() => {
    if (reducir || !visible || fotos.length < 2) return
    const miTurno = turno.current
    const siguiente = (i: number) => {
      for (let p = 1; p <= fotos.length; p++) {
        const j = (i + p) % fotos.length
        if (!rotas.has(j)) return j
      }
      return i
    }
    const sig = siguiente(actual)
    precargar(fotos[sig].src)
    const t = setTimeout(async () => {
      const ok = await precargar(fotos[sig].src)
      if (miTurno !== turno.current) return
      if (!ok) { setRotas((r) => new Set(r).add(sig)); return }
      setAnterior(actual)
      setActual(sig)
    }, TIEMPO)
    return () => clearTimeout(t)
  }, [actual, fotos, visible, reducir, rotas])

  /* Quita la foto de abajo cuando termina el fundido */
  useEffect(() => {
    if (anterior === null) return
    const t = setTimeout(() => setAnterior(null), FUNDIDO + 150)
    return () => clearTimeout(t)
  }, [anterior])

  return (
    <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden bg-noche-900">
      {fotos.map((f, i) => {
        const esActual = i === actual
        const esAnterior = i === anterior
        if (!esActual && !esAnterior) return null
        return (
          <div
            key={vista + i}
            className={cn('absolute inset-0', esActual ? 'z-[2] animate-[portadaEntra_var(--f)_cubic-bezier(.4,0,.2,1)_both]' : 'z-[1]')}
            style={{ ['--f' as string]: `${anterior === null && i === 0 ? 0 : FUNDIDO}ms` }}
          >
            {/* Zoom muy lento (1 → 1.05), para que no se "meta" en la comida */}
            <div
              className={cn('absolute inset-0 bg-cover bg-no-repeat', !reducir && 'animate-[portadaZoom_6.6s_linear_both]')}
              style={{ backgroundImage: `url("${f.src}")`, backgroundPosition: f.pos, animationPlayState: visible ? 'running' : 'paused' }}
            />
          </div>
        )
      })}
      <style>{`
        @keyframes portadaEntra { from { opacity: 0 } to { opacity: 1 } }
        @keyframes portadaZoom { from { transform: scale(1) } to { transform: scale(1.05) } }
      `}</style>
    </div>
  )
}
