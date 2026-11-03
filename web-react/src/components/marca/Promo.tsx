/* =====================================================================
   Tarjeta de promoción — FoldedCard de Cult UI (la esquina doblada es
   la "etiqueta doblada" de los flyers) sobre la banda verde, con el
   precio en etiqueta roja. Se usa en Menú y en Pedir (con controles).
   ===================================================================== */
import type { ReactNode } from 'react'
import { FoldedCard, FoldedCardBorder, FoldedCardFold } from '@/components/ui/folded-card'
import { NeumorphEyebrow } from '@/components/ui/neumorph-eyebrow'
import { EtiquetaPrecio } from './Piezas'
import { textoDias, type Promo } from '@/lib/datos'
import { dinero, leerPrecio } from '@/lib/sitio'

export function TarjetaPromo({ promo, children }: { promo: Promo; children?: ReactNode }) {
  return (
    <section aria-label={`Promoción: ${promo.nombre}`} className="drop-shadow-[0_14px_24px_rgb(0_0_0/0.35)]">
      <FoldedCard
        className="max-w-none bg-verde-banda [--accent:var(--color-amarillo)] [--border:rgb(246_236_210/0.35)] [--card:var(--color-verde-hoja)] [--muted:var(--color-verde-oscuro)]"
      >
        <FoldedCardBorder />
        <FoldedCardFold />
        <div className="semitono relative grid gap-6 px-[clamp(1.4rem,4vw,2.75rem)] py-[clamp(1.6rem,4vw,2.5rem)] [background-image:radial-gradient(80%_120%_at_0%_0%,rgb(214_231_166/0.2),transparent_60%),radial-gradient(circle,rgb(255_255_255/0.1)_1px,transparent_1.7px)] [background-size:100%_100%,16px_16px] md:grid-cols-[1fr_auto] md:items-center">
          <div className="text-center md:text-left">
            <NeumorphEyebrow intent="rojo">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-white motion-safe:animate-pulse" />
              Combo de la semana
            </NeumorphEyebrow>
            <p className="mt-3 font-ui text-[0.82rem] tracking-[0.14em] text-crema uppercase">Disponible: {textoDias(promo.dias)}</p>
            <h2 className="mt-1.5 font-titulo text-[clamp(2rem,6vw,3rem)] leading-none text-crema [text-shadow:3px_3px_0_var(--color-noche-700)]">{promo.nombre}</h2>
            {promo.descripcion && <p className="mx-auto mt-2.5 max-w-[46ch] text-white md:mx-0">{promo.descripcion}</p>}
          </div>
          <div className="justify-self-center md:justify-self-end">
            <EtiquetaPrecio rotulo="Precio" valor={dinero(leerPrecio(promo.precio))} />
          </div>
          {children && <div className="border-t border-dashed border-crema/35 pt-5 md:col-span-2">{children}</div>}
        </div>
      </FoldedCard>
    </section>
  )
}
