/* =====================================================================
   Piezas de marca reutilizables (construidas con los tokens del tema).
   ===================================================================== */
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { NeumorphEyebrow } from '@/components/ui/neumorph-eyebrow'
import { IconoMoto } from './Iconos'

/** Píldora crema "Únicamente delivery en Sonsonate" */
export function AvisoDelivery({ className }: { className?: string }) {
  return (
    <p className={cn('mx-auto flex w-fit max-w-full items-center gap-2.5 whitespace-nowrap rounded-full bg-crema px-4 py-2 font-ui text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-tinta shadow-dura sm:text-sm', className)}>
      <IconoMoto className="size-[18px] shrink-0 text-rojo" />
      <span>Únicamente delivery en Sonsonate</span>
    </p>
  )
}

/** Precio en Rye amarillo, con los centavos en superíndice */
export function Precio({ valor, className }: { valor: string; className?: string }) {
  const m = /^\$?(\d+)[.,](\d{2})$/.exec(valor.trim())
  if (!m) return <span className={cn('font-precio text-amarillo', className)}>{valor}</span>
  return (
    <span className={cn('font-precio whitespace-nowrap text-amarillo', className)}>
      ${m[1]}<sup className="ml-px align-[0.45em] text-[0.55em]">.{m[2]}</sup>
    </span>
  )
}

/** Etiqueta roja con esquina doblada (precio de promos y destacados) */
export function EtiquetaPrecio({ valor, rotulo, className }: { valor: string; rotulo?: string; className?: string }) {
  return (
    <div className={cn('relative inline-block -rotate-2 drop-shadow-[0_8px_12px_rgb(0_0_0/0.35)]', className)}>
      <div className="esquina-doblada bg-gradient-to-b from-[#e6332c] to-rojo px-5 pt-2.5 pb-3 text-left">
        {rotulo && <span className="block font-ui text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-white">{rotulo}</span>}
        <Precio valor={valor} className="text-[2.4rem] leading-none [text-shadow:2px_2px_0_var(--color-rojo-sombra)]" />
      </div>
      <span aria-hidden="true" className="absolute top-0 right-0 size-[14px] bg-rojo-sombra [clip-path:polygon(0_0,100%_100%,0_100%)]" />
    </div>
  )
}

/** Encabezado de sección: eyebrow (Cult UI) + título Smokum con sombra roja */
export function EncabezadoSeccion({ eyebrow, titulo, texto, id, className }: { eyebrow: string; titulo: string; texto?: ReactNode; id?: string; className?: string }) {
  return (
    <div className={cn('mx-auto mb-10 flex max-w-2xl flex-col items-center text-center', className)}>
      <NeumorphEyebrow intent="lima">{eyebrow}</NeumorphEyebrow>
      <h2 id={id} className="mt-4 font-titulo text-[clamp(2.5rem,8vw,3.8rem)] leading-none text-crema [text-shadow:3px_3px_0_var(--color-rojo)]">
        {titulo}
      </h2>
      {texto && <p className="mt-4 text-texto-suave">{texto}</p>}
    </div>
  )
}

/** Encabezado de página interna (Menú, Pedir, Ubicación) */
export function PaginaHero({ eyebrow, titulo, children }: { eyebrow: string; titulo: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-noche-800 px-5 pt-[calc(8.25rem+clamp(0.75rem,3vw,2.5rem))] pb-[clamp(3.25rem,7vw,4.75rem)] text-center [background-image:radial-gradient(70%_90%_at_50%_0%,rgb(47_116_36/0.45),transparent_70%),radial-gradient(circle,rgb(214_231_166/0.06)_1px,transparent_1.6px)] [background-size:100%_100%,18px_18px]">
      <span aria-hidden="true" className="papel-picado absolute inset-x-0 top-[5.75rem] opacity-90" />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center">
        <NeumorphEyebrow intent="lima">{eyebrow}</NeumorphEyebrow>
        <h1 className="mt-4 font-titulo text-[clamp(3.2rem,13vw,6rem)] leading-[0.95] text-crema [text-shadow:4px_4px_0_var(--color-rojo)]">{titulo}</h1>
        {children}
      </div>
      {/* Borde de papel rasgado hacia el contenido */}
      <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-5 bg-noche-700 drop-shadow-[0_-2px_0_rgb(246_236_210/0.85)] [mask:var(--rasgado-a)_0_0/320px_100%_repeat-x] [-webkit-mask:var(--rasgado-a)_0_0/320px_100%_repeat-x]" />
    </section>
  )
}
