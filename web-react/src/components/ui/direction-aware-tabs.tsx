/* =====================================================================
   DirectionAwareTabs — de Cult UI (cult-ui.com, MIT), adaptado a la marca.
   Pestañas con burbuja animada; el contenido entra desde el lado hacia
   donde se movió el usuario.
   Cambios para la Hornilla:
     • Accesible: role="tablist"/"tab"/"tabpanel", aria-selected,
       flechas ← → para moverse, Inicio/Fin.
     • Controlable desde fuera (activo / alCambiar) para el buscador del menú.
     • En celular la fila se desliza de lado en vez de apretarse.
     • Respeta "reducir movimiento".
   ===================================================================== */
import { useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'motion/react'
import useMeasure from 'react-use-measure'
import { cn } from '@/lib/utils'

export type Pestana = { id: number; label: string; content: ReactNode }

interface Props {
  tabs: Pestana[]
  className?: string
  /** Pestaña activa (si se controla desde fuera) */
  activo?: number
  alCambiar?: (id: number) => void
  etiqueta: string
  /** Algo que va encima de las pestañas dentro de la barra (ej. el buscador) */
  encima?: ReactNode
  /** Clases de la barra (ej. para dejarla fija al bajar) */
  claseBarra?: string
}

function DirectionAwareTabs({ tabs, className, activo, alCambiar, etiqueta, encima, claseBarra }: Props) {
  const [interno, setInterno] = useState(tabs[0]?.id ?? 0)
  const activeTab = activo ?? interno
  const [direction, setDirection] = useState(0)
  const [ref, bounds] = useMeasure()
  const reducir = useReducedMotion()
  const base = useId().replace(/:/g, '')
  const botones = useRef<(HTMLButtonElement | null)[]>([])

  const content = useMemo(() => tabs.find((t) => t.id === activeTab)?.content ?? null, [activeTab, tabs])

  const ir = (nuevo: number) => {
    if (nuevo === activeTab) return
    setDirection(nuevo > activeTab ? 1 : -1)
    setInterno(nuevo)
    alCambiar?.(nuevo)
  }

  const teclas = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let j = -1
    if (e.key === 'ArrowRight') j = (i + 1) % tabs.length
    else if (e.key === 'ArrowLeft') j = (i - 1 + tabs.length) % tabs.length
    else if (e.key === 'Home') j = 0
    else if (e.key === 'End') j = tabs.length - 1
    if (j < 0) return
    e.preventDefault()
    ir(tabs[j].id)
    botones.current[j]?.focus()
    botones.current[j]?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }

  const desplazar = reducir ? 0 : 240
  const variants = {
    initial: (d: number) => ({ x: desplazar * d, opacity: 0, filter: reducir ? 'none' : 'blur(4px)' }),
    active: { x: 0, opacity: 1, filter: 'blur(0px)' },
    exit: (d: number) => ({ x: -desplazar * d, opacity: 0, filter: reducir ? 'none' : 'blur(4px)' }),
  }

  return (
    <div className="flex w-full flex-col">
      <div className={claseBarra}>
      {encima}
      <div className="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
        <div
          role="tablist"
          aria-label={etiqueta}
          className={cn(
            'flex w-max gap-1.5',
            className,
          )}
        >
          {tabs.map((tab, i) => {
            const sel = activeTab === tab.id
            return (
              <button
                key={tab.id}
                ref={(el) => { botones.current[i] = el }}
                type="button"
                role="tab"
                id={`${base}-tab-${tab.id}`}
                aria-selected={sel}
                aria-controls={`${base}-panel`}
                tabIndex={sel ? 0 : -1}
                onClick={() => ir(tab.id)}
                onKeyDown={(e) => teclas(e, i)}
                className={cn(
                  'relative min-h-11 whitespace-nowrap rounded-[8px] border-2 border-crema/18 px-4 font-ui text-[0.8rem] font-semibold uppercase tracking-[0.12em] transition-colors',
                  sel ? 'border-transparent text-white' : 'text-texto-suave hover:border-crema/40 hover:text-crema',
                )}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {sel && (
                  <motion.span
                    layoutId={`${base}-burbuja`}
                    className="absolute -inset-[2px] z-0 rounded-[8px] bg-rojo shadow-[0_3px_0_var(--color-rojo-sombra)]"
                    transition={reducir ? { duration: 0 } : { type: 'spring', bounce: 0.19, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>
      </div>

      <MotionConfig transition={reducir ? { duration: 0 } : { duration: 0.4, type: 'spring', bounce: 0.15 }}>
        <motion.div
          className="relative mx-auto w-full overflow-hidden"
          initial={false}
          animate={{ height: bounds.height || 'auto' }}
        >
          <div ref={ref} className="px-1 pt-6 pb-2">
            <AnimatePresence custom={direction} mode="popLayout" initial={false}>
              <motion.div
                key={activeTab}
                id={`${base}-panel`}
                role="tabpanel"
                aria-labelledby={`${base}-tab-${activeTab}`}
                variants={variants}
                initial="initial"
                animate="active"
                exit="exit"
                custom={direction}
              >
                {content}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </MotionConfig>
    </div>
  )
}

export { DirectionAwareTabs }
