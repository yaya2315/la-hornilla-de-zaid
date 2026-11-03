/* =====================================================================
   NeumorphEyebrow — de Cult UI (cult-ui.com, MIT), adaptado a la marca.
   Píldora pequeña sobre los títulos ("Lo mejor de la casa").
   ===================================================================== */
import type React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const eyebrow = cva(
  'inline-flex h-7 w-fit items-center gap-2 rounded-full border px-3 font-ui text-[0.72rem] font-semibold uppercase tracking-[0.22em]',
  {
    variants: {
      intent: {
        lima: 'border-lima/35 bg-noche-800/80 text-lima shadow-[inset_0_-2px_0_rgb(0_0_0/0.35),0_1px_8px_rgb(214_226_43/0.12)]',
        crema: 'border-crema/40 bg-crema text-tinta shadow-[inset_0_-2px_0_rgb(0_0_0/0.12),0_2px_0_rgb(0_0_0/0.35)]',
        rojo: 'border-rojo-sombra bg-rojo text-white shadow-[inset_0_-2px_0_rgb(0_0_0/0.25),0_2px_0_var(--color-rojo-sombra)]',
      },
    },
    defaultVariants: { intent: 'lima' },
  },
)

interface Props extends VariantProps<typeof eyebrow> {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

export function NeumorphEyebrow({ children, intent, className, as: Comp = 'span' }: Props) {
  return <Comp className={cn(eyebrow({ intent }), className)}>{children}</Comp>
}
