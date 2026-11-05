/* =====================================================================
   Visor 3D de platillos. El visor (JS/vendor/model-viewer.min.js, ~250 KB
   comprimido) se descarga SOLO cuando alguien toca "Ver en 3D".
   El botón aparece solo si el platillo está en Imagenes/modelos-3d/lista.json.
   ===================================================================== */
import { useEffect, useRef, useState } from 'react'
import { cargarModelos3D, slug3D, type Plato } from '@/lib/datos'
import { medir, url } from '@/lib/sitio'

let promesaVisor: Promise<void> | null = null
function cargarVisor() {
  if (!promesaVisor) promesaVisor = new Promise((ok, ko) => {
    if (customElements.get('model-viewer')) return ok()
    const s = document.createElement('script')
    s.type = 'module'
    s.src = url('JS/vendor/model-viewer.min.js')
    s.onload = () => { customElements.whenDefined('model-viewer').then(() => ok()) }
    s.onerror = () => { promesaVisor = null; ko(new Error('visor')) }
    document.head.appendChild(s)
  })
  return promesaVisor
}

export function Boton3D({ plato, className }: { plato: Plato; className?: string }) {
  const [src, setSrc] = useState('')
  const [abierto, setAbierto] = useState(false)
  const [estado, setEstado] = useState<'cargando' | 'listo' | 'error'>('cargando')
  const dlg = useRef<HTMLDialogElement>(null)
  const slug = slug3D(plato)

  useEffect(() => {
    if (!slug) return
    let vivo = true
    cargarModelos3D().then((m) => { if (vivo && m[slug]) setSrc(m[slug]) })
    return () => { vivo = false }
  }, [slug])

  useEffect(() => {
    const d = dlg.current
    if (!d) return
    if (abierto && !d.open) {
      d.showModal()
      setEstado('cargando')
      cargarVisor().then(() => setEstado('listo')).catch(() => setEstado('error'))
      medir('ver_3d', { platillo: slug })
    }
    if (!abierto && d.open) d.close()
  }, [abierto, slug])

  if (!src) return null
  const reducir = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
  const mv = `<model-viewer src="${src}" alt="Modelo 3D aproximado de ${plato.nombre}" camera-controls touch-action="pan-y" ${reducir ? '' : 'auto-rotate rotation-per-second="18deg"'} shadow-intensity="0.9" exposure="1.05" ar ar-modes="webxr scene-viewer quick-look" interaction-prompt="none" style="width:100%;height:100%;background:radial-gradient(60% 60% at 50% 55%,#1d4b13,#0b2008)"></model-viewer>`

  return (
    <>
      <button
        type="button"
        onClick={() => setAbierto(true)}
        className={'inline-flex min-h-11 items-center gap-1.5 rounded-full bg-noche-900/85 px-3.5 font-ui text-[0.78rem] font-bold tracking-[0.14em] text-crema uppercase hover:bg-rojo focus-visible:outline-3 focus-visible:outline-amarillo ' + (className || '')}
      >
        Ver en 3D
      </button>
      <dialog
        ref={dlg}
        onClose={() => setAbierto(false)}
        aria-label={`${plato.nombre} en 3D`}
        className="m-auto h-[min(86vh,44rem)] w-[min(96vw,56rem)] overflow-hidden rounded-[18px] bg-noche-900 p-0 text-crema backdrop:bg-noche-950/80"
      >
        <div className="relative size-full">
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-3 py-3 pr-3.5 pl-5">
            <h3 className="font-ui text-lg font-bold tracking-[0.12em] uppercase">{plato.nombre} en 3D</h3>
            <button type="button" onClick={() => setAbierto(false)} aria-label="Cerrar vista 3D" className="size-11 rounded-full bg-crema text-xl text-tinta">×</button>
          </div>
          {estado === 'listo' && abierto
            ? <div className="size-full" dangerouslySetInnerHTML={{ __html: mv }} />
            : <p className="grid size-full place-items-center">{estado === 'error' ? 'No se pudo cargar el visor 3D.' : 'Cargando modelo…'}</p>}
          <p className="absolute inset-x-5 bottom-3.5 z-10 text-[0.82rem] text-texto-suave">Arrastra para girar. Modelo 3D aproximado, hecho con IA a partir de nuestra foto real; la porción es la que indica el menú.</p>
        </div>
      </dialog>
    </>
  )
}
