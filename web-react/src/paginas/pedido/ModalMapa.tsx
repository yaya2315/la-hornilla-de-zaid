/* =====================================================================
   Marcar la ubicación de entrega en un mapa libre (Leaflet + OpenStreetMap,
   sin API de pago). Leaflet se descarga SOLO al abrir el mapa.
   Centro por defecto: Sonsonate / Sonzacate (zona de reparto).
   ===================================================================== */
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { MapPin, X } from 'lucide-react'
import type { Map as MapaL, Marker } from 'leaflet'
import { TextureButton } from '@/components/ui/texture-button'

type Punto = { lat: number; lng: number }
const CENTRO: [number, number] = [13.7225, -89.7215]

export function ModalMapa({ abierto, inicial, alCerrar, alConfirmar }: { abierto: boolean; inicial: Punto | null; alCerrar: () => void; alConfirmar: (p: Punto) => void }) {
  const caja = useRef<HTMLDivElement>(null)
  const tarjeta = useRef<HTMLDivElement>(null)
  const mapa = useRef<MapaL | null>(null)
  const marcador = useRef<Marker | null>(null)
  const [error, setError] = useState('')
  /* Se guardan en refs para que el mapa no se vuelva a crear en cada render */
  const cerrarRef = useRef(alCerrar)
  const inicialRef = useRef(inicial)
  cerrarRef.current = alCerrar
  inicialRef.current = inicial

  useEffect(() => {
    if (!abierto) return
    setError('')
    const previo = document.activeElement as HTMLElement | null
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && cerrarRef.current()
    const inicial = inicialRef.current
    addEventListener('keydown', esc)
    setTimeout(() => tarjeta.current?.querySelector<HTMLElement>('button')?.focus(), 80)
    let vivo = true
    ;(async () => {
      try {
        const [{ default: L }] = await Promise.all([import('leaflet'), import('leaflet/dist/leaflet.css')])
        if (!vivo || !caja.current) return
        const centro: [number, number] = inicial ? [inicial.lat, inicial.lng] : CENTRO
        const icono = L.divIcon({
          className: '',
          html: '<span style="display:block;width:30px;height:30px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:#d9201f;border:3px solid #f6ecd2;box-shadow:0 4px 10px rgba(0,0,0,.45)"></span>',
          iconSize: [30, 30],
          iconAnchor: [15, 30],
        })
        mapa.current = L.map(caja.current).setView(centro, inicial ? 16 : 14)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap', maxZoom: 19 }).addTo(mapa.current)
        marcador.current = L.marker(centro, { draggable: true, icon: icono, keyboard: true, title: 'Ubicación de entrega' }).addTo(mapa.current)
        mapa.current.on('click', (e) => marcador.current?.setLatLng(e.latlng))
        /* Sin pin guardado: intenta centrar donde está la persona */
        if (!inicial && navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((p) => {
            const c: [number, number] = [p.coords.latitude, p.coords.longitude]
            mapa.current?.setView(c, 16)
            marcador.current?.setLatLng(c)
          }, () => {}, { timeout: 4000 })
        }
      } catch {
        setError('No se pudo cargar el mapa. Revisa tu conexión.')
      }
    })()
    return () => {
      vivo = false
      removeEventListener('keydown', esc)
      mapa.current?.remove()
      mapa.current = null
      marcador.current = null
      previo?.focus()
    }
  }, [abierto])

  return (
    <AnimatePresence>
      {abierto && (
        <motion.div className="fixed inset-0 z-[2500] grid place-items-center p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div aria-hidden="true" className="absolute inset-0 bg-noche-950/75 backdrop-blur-[5px]" onClick={alCerrar} />
          <motion.div
            ref={tarjeta}
            role="dialog"
            aria-modal="true"
            aria-labelledby="tituloMapa"
            className="relative w-[min(460px,100%)] rounded-[22px] border-2 border-crema/16 bg-noche-800 px-6 pt-7 pb-6 shadow-[0_30px_70px_rgb(0_0_0/0.55)]"
            initial={{ y: 14, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 14, scale: 0.98 }}
          >
            <button type="button" onClick={alCerrar} aria-label="Cerrar" className="absolute top-4 right-4 grid size-10 place-items-center rounded-[10px] bg-crema/8 text-crema hover:bg-crema/15">
              <X aria-hidden="true" className="size-4" />
            </button>
            <div className="mb-5 text-center">
              <span aria-hidden="true" className="mb-3 inline-grid size-13 place-items-center rounded-full bg-rojo text-white shadow-[0_4px_0_var(--color-rojo-sombra)]"><MapPin className="size-6" /></span>
              <h2 id="tituloMapa" className="font-titulo text-[1.8rem] leading-tight text-crema [text-shadow:2px_2px_0_var(--color-rojo)]">Marcar ubicación</h2>
              <p className="mt-1.5 text-[0.85rem] text-texto-suave">Toca el mapa o arrastra el pin hasta tu dirección</p>
            </div>
            <div ref={caja} className="h-[280px] overflow-hidden rounded-[14px] border border-crema/14 bg-noche-900" aria-label="Mapa para marcar la ubicación" role="application" />
            {error && <p role="alert" className="mt-3 text-sm text-rojo-texto">{error}</p>}
            <TextureButton
              variant="rojo"
              size="lg"
              ancho="completo"
              className="mt-4"
              onClick={() => { const p = marcador.current?.getLatLng(); if (p) alConfirmar({ lat: p.lat, lng: p.lng }) }}
            >
              Usar esta ubicación
            </TextureButton>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
