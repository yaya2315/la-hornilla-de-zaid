/* =====================================================================
   TextureButton — de Cult UI (cult-ui.com, MIT), adaptado a la marca.
   Botón con borde doble y degradado (sensación "táctil").
   Variantes de La Hornilla:
     rojo     → acción principal (Pedir en línea, Agregar, Enviar). 1 por vista.
     crema    → secundaria (Ver menú, Compartir) — borde crema, fondo oscuro.
     lima     → canal de WhatsApp.
     verde    → iconos (menú hamburguesa, + / −).
     fantasma → sobre fotos (velo verde).
   Texto blanco sobre rojo #d9201f = 5:1 (AA). Altura mínima 44px (táctil).
   ===================================================================== */
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const exterior = cva(
  'group/tb inline-flex shrink-0 bg-origin-border p-[1px] transition duration-300 ease-(--ease-marca) select-none disabled:pointer-events-none disabled:opacity-45 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-amarillo',
  {
    variants: {
      variant: {
        rojo: 'border border-rojo-sombra/60 bg-gradient-to-b from-[#ff5a4a] to-rojo-sombra shadow-boton hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_1px_0_var(--color-rojo-sombra)]',
        crema: 'border border-crema/25 bg-gradient-to-b from-crema/70 to-crema/20 shadow-dura hover:-translate-y-0.5 active:translate-y-0.5',
        lima: 'border border-black/20 bg-gradient-to-b from-[#eef37a] to-[#9fa81a] shadow-dura hover:-translate-y-0.5 active:translate-y-0.5',
        verde: 'border border-noche-950/70 bg-gradient-to-b from-[#5fa44f] to-verde-oscuro shadow-[0_4px_0_var(--color-noche-950)] hover:-translate-y-0.5 active:translate-y-0.5',
        fantasma: 'border border-crema/40 bg-gradient-to-b from-crema/60 to-crema/15 backdrop-blur-sm hover:-translate-y-0.5',
      },
      size: {
        sm: 'rounded-[10px]',
        default: 'rounded-[12px]',
        lg: 'rounded-[14px]',
        icon: 'rounded-full',
      },
      ancho: { auto: '', completo: 'w-full' },
    },
    defaultVariants: { variant: 'rojo', size: 'default', ancho: 'auto' },
  },
)

const interior = cva(
  'flex h-full w-full items-center justify-center gap-2.5 font-ui font-bold uppercase tracking-[0.14em] transition duration-300',
  {
    variants: {
      variant: {
        rojo: 'bg-gradient-to-b from-[#e6332c] to-rojo text-white group-hover/tb:from-[#ee3d35] group-active/tb:from-rojo',
        crema: 'bg-gradient-to-b from-noche-600 to-noche-800 text-crema group-hover/tb:from-noche-500 group-hover/tb:to-noche-700',
        lima: 'bg-gradient-to-b from-[#e3ec4d] to-lima text-tinta',
        verde: 'bg-gradient-to-b from-[#3f8a32] to-verde-banda text-crema group-hover/tb:from-[#4a9a3c]',
        fantasma: 'bg-noche-900/55 text-crema group-hover/tb:bg-noche-900/40',
      },
      size: {
        sm: 'min-h-10 rounded-[9px] px-4 text-xs',
        default: 'min-h-11 rounded-[11px] px-6 text-sm',
        lg: 'min-h-13 rounded-[13px] px-8 text-[0.95rem]',
        icon: 'size-11 rounded-full p-0',
      },
    },
    defaultVariants: { variant: 'rojo', size: 'default' },
  },
)

export interface TextureButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof exterior> {
  /** Usa el hijo (por ejemplo un <a>) como elemento real del botón. */
  asChild?: boolean
}

const TextureButton = React.forwardRef<HTMLButtonElement, TextureButtonProps>(
  ({ children, variant, size, ancho, asChild = false, className, ...props }, ref) => {
    if (asChild) {
      /* El enlace recibe las clases exteriores y envuelve el contenido interior */
      const hijo = React.Children.only(children) as React.ReactElement<{ children?: React.ReactNode; className?: string }>
      return (
        <Slot ref={ref} className={cn(exterior({ variant, size, ancho }), className)} {...props}>
          {React.cloneElement(hijo, {}, <span className={cn(interior({ variant, size }))}>{hijo.props.children}</span>)}
        </Slot>
      )
    }
    return (
      <button ref={ref} className={cn(exterior({ variant, size, ancho }), className)} {...props}>
        <span className={cn(interior({ variant, size }))}>{children}</span>
      </button>
    )
  },
)
TextureButton.displayName = 'TextureButton'

export { TextureButton }
