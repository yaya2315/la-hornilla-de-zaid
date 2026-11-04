/* =====================================================================
   Tarjeta de promoción (estilo v2) — cartel verde plano con semitono,
   esquina doblada como los flyers y el precio en etiqueta roja.
   Se usa en Menú y en Pedir (con controles).
   ===================================================================== */
import type { ReactNode } from 'react'
import { Etiqueta } from './Hecho'
import { textoDias, type Promo } from '@/lib/datos'
import { dinero, leerPrecio } from '@/lib/sitio'

export function TarjetaPromo({ promo, children }: { promo: Promo; children?: ReactNode }) {
  return (
    <section aria-label={`Promoción: ${promo.nombre}`} className="drop-shadow-[6px_6px_0_var(--color-noche-950)]">
      <div className="semitono relative bg-verde-banda [clip-path:polygon(0_0,calc(100%-26px)_0,100%_26px,100%_100%,0_100%)]">
        {/* Esquina doblada */}
        <span aria-hidden="true" className="absolute top-0 right-0 size-[26px] bg-verde-oscuro [clip-path:polygon(0_0,100%_100%,0_100%)]" />
        <div className="grid gap-5 px-[clamp(1.25rem,4vw,2.5rem)] py-[clamp(1.5rem,4vw,2.25rem)] md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="font-ui text-[0.78rem] font-bold uppercase tracking-[0.2em] text-amarillo">Combo de la semana · {textoDias(promo.dias)}</p>
            <h2 className="mt-2 font-titulo text-[clamp(2rem,6.5vw,3rem)] leading-[0.95] text-crema [text-shadow:3px_3px_0_var(--color-verde-oscuro)]">{promo.nombre}</h2>
            {promo.descripcion && <p className="mt-2.5 max-w-[48ch] text-white">{promo.descripcion}</p>}
          </div>
          <Etiqueta rotulo="Precio" valor={dinero(leerPrecio(promo.precio))} className="justify-self-start md:justify-self-end" />
          {children && <div className="border-t-2 border-dashed border-crema/35 pt-5 md:col-span-2">{children}</div>}
        </div>
      </div>
    </section>
  )
}
