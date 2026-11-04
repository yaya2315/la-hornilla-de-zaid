/* =====================================================================
   Piezas "hechas a mano" (estilo v2) — Menú, Pedir, Ubicación y Tarjeta.
   Mismo mundo Hornilla (verde noche, rojo, amarillo, lima, crema), pero
   plano y con carácter de flyer: sombras duras, papel rasgado, etiquetas
   rojas dobladas, listas con puntitos. Sin degradados ni neblina.
   La página de Inicio NO usa este archivo.
   ===================================================================== */
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { NEGOCIO } from '@/lib/sitio'
import { IconoMoto } from './Iconos'
import { Precio } from './Piezas'

/* ── Botón plano con sombra dura ─────────────────────────────────────── */
const boton = cva(
  'inline-flex shrink-0 select-none items-center justify-center gap-2.5 font-ui font-bold uppercase tracking-[0.14em] transition-[transform,box-shadow,background-color,color] duration-150 disabled:pointer-events-none disabled:opacity-45 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-amarillo',
  {
    variants: {
      variant: {
        rojo: 'rounded-[12px] bg-rojo text-white shadow-[0_5px_0_var(--color-rojo-sombra)] hover:-translate-y-0.5 hover:shadow-[0_7px_0_var(--color-rojo-sombra)] active:translate-y-[3px] active:shadow-[0_2px_0_var(--color-rojo-sombra)]',
        crema: 'rounded-[12px] bg-crema text-tinta shadow-[0_5px_0_var(--color-noche-950)] hover:-translate-y-0.5 hover:shadow-[0_7px_0_var(--color-noche-950)] active:translate-y-[3px] active:shadow-[0_2px_0_var(--color-noche-950)]',
        verde: 'rounded-[12px] bg-verde-banda text-crema shadow-[0_5px_0_var(--color-verde-oscuro)] hover:-translate-y-0.5 active:translate-y-[3px] active:shadow-[0_2px_0_var(--color-verde-oscuro)]',
        lima: 'rounded-[12px] bg-lima text-tinta shadow-[0_5px_0_var(--color-noche-950)] hover:-translate-y-0.5 active:translate-y-[3px]',
        /* Secundario: texto subrayado en lima, sin caja */
        linea: 'min-h-11 border-b-2 border-lima px-0.5 text-crema hover:border-amarillo hover:text-amarillo',
      },
      size: {
        sm: 'min-h-10 px-4 text-xs',
        default: 'min-h-12 px-6 text-sm',
        lg: 'min-h-14 px-7 text-[0.95rem]',
      },
      ancho: { auto: '', completo: 'w-full' },
    },
    compoundVariants: [{ variant: 'linea', className: 'px-0.5' }],
    defaultVariants: { variant: 'rojo', size: 'default', ancho: 'auto' },
  },
)

export interface BotonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof boton> {
  asChild?: boolean
}

export const Boton = React.forwardRef<HTMLButtonElement, BotonProps>(
  ({ variant, size, ancho, asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp ref={ref} className={cn(boton({ variant, size, ancho }), className)} {...props} />
  },
)
Boton.displayName = 'Boton'

/* ── Hoja: panel plano con borde y sombra dura (reemplaza tarjetas) ──── */
type Tono = 'noche' | 'banda' | 'papel'
const tonos: Record<Tono, string> = {
  noche: 'bg-noche-600 text-texto border-2 border-crema/14 shadow-[6px_6px_0_var(--color-noche-950)]',
  banda: 'semitono bg-verde-banda text-crema border-2 border-verde-oscuro shadow-[6px_6px_0_var(--color-noche-950)]',
  papel: 'bg-crema text-tinta shadow-[6px_6px_0_var(--color-noche-950)]',
}
interface HojaProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
  tono?: Tono
  noValidate?: boolean
}
export function Hoja({ as: Comp = 'div', tono = 'noche', className, ...props }: HojaProps) {
  return <Comp className={cn('rounded-[6px]', tonos[tono], className)} {...props} />
}

/* ── Ticket / pedido de papel con orilla dentada ─────────────────────── */
export function Ticket({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('drop-shadow-[6px_8px_0_var(--color-noche-950)]', className)} {...props}>
      <div className="ticket-dentado bg-[#fffdf5] text-tinta">{children}</div>
    </div>
  )
}

/* ── Foto real como recorte de papel rasgado (como en los flyers) ─────── */
export function Recorte({ src, alt, giro = 0, proporcion = 'aspect-[4/3.2]', className, children, cargar = 'lazy' }: {
  src: string; alt: string; giro?: number; proporcion?: string; className?: string; children?: React.ReactNode; cargar?: 'lazy' | 'eager'
}) {
  return (
    <figure className={cn('relative', className)} style={giro ? { transform: `rotate(${giro}deg)` } : undefined}>
      <span aria-hidden="true" className="recorte-rasgado absolute inset-0 translate-x-2.5 translate-y-2.5 bg-noche-950" />
      <div className="recorte-rasgado relative bg-crema p-[clamp(7px,1.4vw,11px)]">
        <img src={src} alt={alt} width={720} height={576} loading={cargar} decoding="async" className={cn('w-full object-cover', proporcion)} />
      </div>
      {children}
    </figure>
  )
}

/* ── Etiqueta roja plana con esquina doblada ──────────────────────────── */
export function Etiqueta({ valor, rotulo, className, chica = false }: { valor: string; rotulo?: string; className?: string; chica?: boolean }) {
  return (
    <div className={cn('relative z-[2] inline-block -rotate-3', className)}>
      <div className={cn('esquina-doblada bg-rojo text-left shadow-[4px_4px_0_var(--color-rojo-sombra)]', chica ? 'px-3 pt-1 pb-1.5' : 'px-4 pt-2 pb-2.5')}>
        {rotulo && <span className="block font-ui text-[0.66rem] font-bold uppercase tracking-[0.22em] text-white">{rotulo}</span>}
        <Precio valor={valor} className={cn('leading-none [&_sup]:text-white', chica ? 'text-[1.3rem] text-white' : 'text-[clamp(1.9rem,6vw,2.4rem)]')} />
      </div>
    </div>
  )
}

/* ── Fila de precio con puntitos: NOMBRE ........ $4.99 ───────────────── */
export function FilaPrecio({ nombre, precio, nota, className, grande = false }: {
  nombre: React.ReactNode; precio: string; nota?: React.ReactNode; className?: string; grande?: boolean
}) {
  return (
    <li className={cn('flex items-baseline gap-2.5 border-b-2 border-crema/18 py-2.5 last:border-b-0', className)}>
      <span className={cn('font-ui font-semibold uppercase tracking-[0.04em] text-crema', grande ? 'text-[clamp(1.05rem,4.4vw,1.3rem)]' : 'text-[0.98rem]')}>
        {nombre}
        {nota && <i className="ml-2 font-sans text-[0.78em] font-semibold tracking-normal text-lima normal-case">{nota}</i>}
      </span>
      <span aria-hidden="true" className="min-w-3 flex-1 -translate-y-[0.3em] border-b-[3px] border-dotted border-lima/45" />
      <Precio valor={precio} className={grande ? 'text-[clamp(1.25rem,5vw,1.6rem)]' : 'text-[1.15rem]'} />
    </li>
  )
}

/* ── Título de sección: Smokum alineado a la izquierda + nota opcional ── */
export function TituloSeccion({ titulo, id, nota, className, como: Comp = 'h2' }: {
  titulo: React.ReactNode; id?: string; nota?: React.ReactNode; className?: string; como?: 'h2' | 'h3'
}) {
  return (
    <div className={cn('mb-[clamp(1.5rem,4vw,2.25rem)] flex flex-wrap items-end justify-between gap-x-8 gap-y-3', className)}>
      <Comp id={id} className="font-titulo text-[clamp(2.4rem,8vw,3.6rem)] leading-[0.95] text-crema [text-shadow:3px_3px_0_var(--color-rojo)]">{titulo}</Comp>
      {nota && <p className="max-w-[40ch] text-[0.95rem] text-texto-suave">{nota}</p>}
    </div>
  )
}

/* ── Píldoras de datos: delivery (crema) + teléfono (lima) ────────────── */
export function DatosEntrega({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2.5', className)}>
      <p className="flex items-center gap-2 rounded-full bg-crema px-4 py-2 font-ui text-[0.76rem] font-semibold uppercase tracking-[0.13em] text-tinta sm:text-[0.82rem]">
        <IconoMoto className="size-[17px] shrink-0 text-rojo" />
        Únicamente delivery en Sonsonate
      </p>
      <a href={`tel:${NEGOCIO.telefonoIntl}`} className="rounded-full bg-lima px-4 py-2 font-ui text-[0.92rem] font-bold tracking-[0.06em] text-tinta hover:bg-amarillo">
        {NEGOCIO.telefono}
      </a>
    </div>
  )
}

/* ── Banda verde con orilla de papel rasgado (horario, avisos) ────────── */
export function BandaRasgada({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('banda-v2 relative bg-verde-banda py-5 text-crema', className)}>
      <div className="mx-auto flex max-w-(--container-sitio) flex-wrap justify-center gap-x-7 gap-y-1.5 px-5 text-center font-ui text-[clamp(0.85rem,3.3vw,1rem)] font-semibold uppercase tracking-[0.08em]">
        {children}
      </div>
    </div>
  )
}

/* ── Encabezado de página interna (v2): a la izquierda, sin neblina ───── */
export function Portadilla({ lema, titulo, children, aside, banda }: {
  lema: string; titulo: React.ReactNode; children?: React.ReactNode; aside?: React.ReactNode; banda?: React.ReactNode
}) {
  return (
    <section className="grano relative bg-noche-800 pt-[clamp(7rem,15vw,9rem)]">
      <div className={cn('mx-auto grid max-w-(--container-sitio) items-center gap-[clamp(2.25rem,6vw,4rem)] px-5 pb-[clamp(3rem,7vw,4.5rem)]', aside && 'md:grid-cols-[1.08fr_0.92fr]')}>
        <div>
          <p className="flex items-center gap-3 font-ui text-[clamp(0.8rem,3vw,0.95rem)] font-semibold uppercase tracking-[0.22em] text-lima">
            <span aria-hidden="true" className="h-0.5 w-8 bg-lima" />{lema}
          </p>
          <h1 className="mt-3.5 font-ui text-[clamp(2.6rem,10.5vw,4.8rem)] leading-[0.98] font-bold uppercase text-crema [text-shadow:4px_4px_0_var(--color-rojo)]">{titulo}</h1>
          {children}
        </div>
        {aside}
      </div>
      {banda
        ? <BandaRasgada>{banda}</BandaRasgada>
        : <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-4 bg-noche-900 drop-shadow-[0_-2px_0_rgb(246_236_210/0.8)] [mask:var(--rasgado-a)_0_0/320px_100%_repeat-x] [-webkit-mask:var(--rasgado-a)_0_0/320px_100%_repeat-x]" />}
    </section>
  )
}
