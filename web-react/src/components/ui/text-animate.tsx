/* =====================================================================
   TextAnimate — de Cult UI (cult-ui.com, MIT), adaptado a la marca.
   Variante "rollIn": cada letra sube suave, palabra por palabra.
   Cambios: se elige la etiqueta (h1, p…), se pasan clases, el texto
   completo queda para lectores de pantalla (sr-only) y con
   "reducir movimiento" se muestra quieto.
   ===================================================================== */
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

interface Props {
  text: string
  as?: 'h1' | 'h2' | 'p' | 'span'
  className?: string
  delay?: number
}

const letra = {
  hidden: { opacity: 0, y: '0.3em' },
  visible: { opacity: 1, y: '0em', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

export function TextAnimate({ text, as = 'p', className, delay = 0 }: Props) {
  const reducir = useReducedMotion()
  const Tag = motion[as]
  if (reducir) {
    const Quieto = as
    return <Quieto className={className}>{text}</Quieto>
  }
  return (
    <Tag className={cn(className)}>
      <span className="sr-only">{text}</span>
      {text.split(' ').map((palabra, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="mr-[0.25em] inline-block whitespace-nowrap last:mr-0"
          initial="hidden"
          animate="visible"
          transition={{ delayChildren: delay + i * 0.12, staggerChildren: 0.028 }}
        >
          {palabra.split('').map((c, j) => (
            <motion.span key={j} variants={letra} className="inline-block">
              {c}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </Tag>
  )
}
