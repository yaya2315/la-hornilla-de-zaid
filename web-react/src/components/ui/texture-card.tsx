/* =====================================================================
   TextureCard — de Cult UI (cult-ui.com, MIT), adaptado a la marca.
   Tarjeta con bordes anidados que dan relieve, en verde noche.
   Se usa en: platillos, carrito, reseñas, horarios y formularios.
   ===================================================================== */
import * as React from 'react'
import { cn } from '@/lib/utils'

type Tono = 'noche' | 'banda'

const capas: Record<Tono, { borde: string[]; fondo: string }> = {
  noche: {
    borde: ['border-crema/12', 'border-black/45', 'border-crema/8', 'border-black/30'],
    fondo: 'from-noche-500/70 to-noche-600',
  },
  banda: {
    borde: ['border-crema/25', 'border-black/30', 'border-crema/15', 'border-black/20'],
    fondo: 'from-[#3a8a2c] to-verde-banda',
  },
}

interface TextureCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Para usarla como formulario (as="form") */
  noValidate?: boolean
  tono?: Tono
  /** Elemento HTML exterior (article, aside, section…) */
  as?: React.ElementType
}

const TextureCard = React.forwardRef<HTMLDivElement, TextureCardProps>(
  ({ className, children, tono = 'noche', as: Comp = 'div', ...props }, ref) => {
    const c = capas[tono]
    return (
      <Comp
        ref={ref}
        className={cn('rounded-[var(--radius)] border shadow-tarjeta', c.borde[0], className)}
        {...props}
      >
        <div className={cn('h-full rounded-[calc(var(--radius)-1px)] border', c.borde[1])}>
          <div className={cn('h-full rounded-[calc(var(--radius)-2px)] border', c.borde[2])}>
            <div className={cn('h-full rounded-[calc(var(--radius)-3px)] border', c.borde[3])}>
              <div className={cn('flex h-full w-full flex-col overflow-hidden rounded-[calc(var(--radius)-4px)] bg-gradient-to-b text-texto', c.fondo)}>
                {children}
              </div>
            </div>
          </div>
        </div>
      </Comp>
    )
  },
)
TextureCard.displayName = 'TextureCard'

const TextureCardHeader = ({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('px-5 pt-5 sm:px-6', className)} {...p} />
)
const TextureCardTitle = ({ className, ...p }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn('font-ui text-xl font-bold uppercase leading-tight tracking-[0.06em] text-crema', className)} {...p} />
)
const TextureCardDescription = ({ className, ...p }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-sm text-texto-suave', className)} {...p} />
)
const TextureCardContent = ({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex-1 px-5 py-4 sm:px-6', className)} {...p} />
)
const TextureCardFooter = ({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex items-center justify-between gap-3 px-5 pb-5 sm:px-6', className)} {...p} />
)
/** Separador con relieve (línea clara arriba, oscura abajo) */
const TextureSeparator = ({ className }: { className?: string }) => (
  <div role="presentation" className={cn('border-t border-b border-t-black/40 border-b-crema/10', className)} />
)

export { TextureCard, TextureCardHeader, TextureCardTitle, TextureCardDescription, TextureCardContent, TextureCardFooter, TextureSeparator }
