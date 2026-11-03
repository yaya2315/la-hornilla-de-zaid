/* =====================================================================
   Sitio — marco común de las páginas públicas:
   saltar al contenido · encabezado · menú lateral · contenido · pie.
   ===================================================================== */
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { abrirCookies, LOGO, NEGOCIO, PAGINAS, REDES } from '@/lib/sitio'
import { pupusasActivas } from '@/lib/datos'
import { TextureButton } from '@/components/ui/texture-button'
import { IconoFacebook, IconoInstagram, IconoTikTok, IconoWhatsApp } from './Iconos'

export type Pagina = 'inicio' | 'menu' | 'pedido' | 'ubicacion'

const ICONO_RED = { WhatsApp: IconoWhatsApp, Instagram: IconoInstagram, Facebook: IconoFacebook, TikTok: IconoTikTok }

export function RedesSociales({ className }: { className?: string }) {
  return (
    <ul className={cn('flex flex-wrap gap-3', className)}>
      {REDES.map((r) => {
        const Icono = ICONO_RED[r.nombre]
        return (
          <li key={r.nombre}>
            <a
              href={r.href}
              target="_blank"
              rel="noopener"
              aria-label={r.nombre}
              className="grid size-12 place-items-center rounded-full bg-verde-banda text-crema shadow-[0_3px_0_var(--color-noche-950)] transition duration-300 ease-(--ease-marca) hover:-translate-y-0.5 hover:bg-rojo hover:text-white hover:shadow-[0_5px_0_var(--color-rojo-sombra)]"
            >
              <Icono className="size-[22px]" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}

const ENLACES: { id: Pagina | 'pupusas'; texto: string; href: string; pupusas?: boolean; cta?: boolean }[] = [
  { id: 'inicio', texto: 'Inicio', href: PAGINAS.inicio },
  { id: 'menu', texto: 'Menú', href: PAGINAS.menu },
  { id: 'pupusas', texto: 'Pupusas', href: PAGINAS.pupusas, pupusas: true },
  { id: 'pedido', texto: 'Pedir', href: PAGINAS.pedido, cta: true },
  { id: 'ubicacion', texto: 'Ubicación', href: PAGINAS.ubicacion },
]

function Encabezado({ abierto, alAbrir }: { abierto: boolean; alAbrir: () => void }) {
  const [bajo, setBajo] = useState(false)
  useEffect(() => {
    const f = () => setBajo(scrollY > 40)
    f()
    addEventListener('scroll', f, { passive: true })
    return () => removeEventListener('scroll', f)
  }, [])
  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-[1000] flex items-center justify-between px-[clamp(1rem,4vw,2.75rem)] py-4 transition-[background,padding,backdrop-filter] duration-500 ease-(--ease-marca)',
        bajo && 'bg-noche-800/95 py-3 backdrop-blur-md',
      )}
    >
      <a href={PAGINAS.inicio} aria-label="La Hornilla de Zaid, inicio" className="rounded-md">
        <img src={LOGO} alt="La Hornilla de Zaid" width={130} height={58} className="h-[clamp(42px,5.5vw,58px)] w-auto drop-shadow-[0_6px_12px_rgb(0_0_0/0.55)]" />
      </a>
      <TextureButton
        variant="verde"
        size="icon"
        aria-label="Abrir menú"
        aria-controls="menuLateral"
        aria-expanded={abierto}
        onClick={alAbrir}
        className="size-[52px]"
      >
        <span aria-hidden="true" className="flex flex-col gap-[5px]">
          <span className="block h-[2.5px] w-6 rounded bg-crema" />
          <span className="block h-[2.5px] w-6 rounded bg-crema" />
          <span className="block h-[2.5px] w-6 rounded bg-crema" />
        </span>
      </TextureButton>
      {/* Borde rasgado del encabezado al bajar (como la banda de los flyers) */}
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-x-0 -bottom-3 h-3.5 -scale-y-100 bg-noche-800/95 transition-opacity duration-500 [mask:var(--rasgado-b)_0_0/280px_100%_repeat-x] [-webkit-mask:var(--rasgado-b)_0_0/280px_100%_repeat-x]',
          bajo ? 'opacity-100' : 'opacity-0',
        )}
      />
    </header>
  )
}

function MenuLateral({ abierto, alCerrar, pagina }: { abierto: boolean; alCerrar: () => void; pagina: Pagina }) {
  const panel = useRef<HTMLDivElement>(null)
  const reducir = useReducedMotion()

  useEffect(() => {
    if (!abierto) return
    const previo = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => panel.current?.querySelector<HTMLElement>('a, button')?.focus(), 60)
    const teclas = (e: KeyboardEvent) => {
      if (e.key === 'Escape') alCerrar()
      if (e.key !== 'Tab' || !panel.current) return
      /* Mantiene el foco dentro del menú mientras está abierto */
      const f = [...panel.current.querySelectorAll<HTMLElement>('a[href], button')].filter((el) => el.offsetParent !== null)
      if (!f.length) return
      const [primero, ultimo] = [f[0], f[f.length - 1]]
      if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus() }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus() }
    }
    addEventListener('keydown', teclas)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
      removeEventListener('keydown', teclas)
      previo?.focus()
    }
  }, [abierto, alCerrar])

  return (
    <AnimatePresence>
      {abierto && (
        <>
          <motion.div
            key="fondo"
            className="fixed inset-0 z-[1100] bg-noche-950/65 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={alCerrar}
            aria-hidden="true"
          />
          <motion.div
            key="panel"
            ref={panel}
            id="menuLateral"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            className="fixed inset-y-0 right-0 z-[1200] flex w-[min(380px,100%)] flex-col overflow-y-auto bg-noche-800 px-[clamp(1.75rem,5vw,2.75rem)] pt-6 pb-10 shadow-[-18px_0_40px_rgb(0_0_0/0.45)] [background-image:radial-gradient(circle,rgb(214_231_166/0.05)_1px,transparent_1.6px),linear-gradient(180deg,var(--color-noche-700),var(--color-noche-900))] [background-size:18px_18px,100%_100%]"
            initial={reducir ? { opacity: 0 } : { x: '100%' }}
            animate={reducir ? { opacity: 1 } : { x: 0 }}
            exit={reducir ? { opacity: 0 } : { x: '100%' }}
            transition={{ type: 'spring', bounce: 0.08, duration: 0.5 }}
          >
            <div className="flex justify-end">
              <TextureButton variant="verde" size="icon" aria-label="Cerrar menú" onClick={alCerrar} className="size-[52px]">
                <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
              </TextureButton>
            </div>
            <span aria-hidden="true" className="papel-picado -mx-[clamp(1.75rem,5vw,2.75rem)] mt-4" />
            <nav aria-label="Secciones" className="mt-6">
              <ul>
                {ENLACES.map((e) => (
                  <li key={e.id} data-pupusas={e.pupusas ? '' : undefined}>
                    <a
                      href={e.href}
                      aria-current={e.id === pagina ? 'page' : undefined}
                      className={cn(
                        'group relative inline-flex items-center py-2.5 font-titulo text-[clamp(2.2rem,8vw,2.9rem)] leading-tight text-crema [text-shadow:3px_3px_0_var(--color-rojo-sombra)] transition-[color,padding] duration-300 ease-(--ease-marca) hover:pl-5 hover:text-amarillo aria-[current=page]:pl-5 aria-[current=page]:text-amarillo',
                      )}
                    >
                      <span aria-hidden="true" className="absolute top-1/2 left-0 h-[3px] w-3 origin-left scale-x-0 bg-amarillo transition-transform duration-300 group-hover:scale-x-100 group-aria-[current=page]:scale-x-100" />
                      {e.texto}
                      {e.cta && (
                        <span className="ml-3 rounded-md bg-rojo px-2 py-1 align-middle font-ui text-xs font-bold uppercase tracking-[0.12em] text-white [text-shadow:none] shadow-[0_3px_0_var(--color-rojo-sombra)]">
                          ¡Ya!
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-auto border-t border-dashed border-crema/25 pt-7">
              <p className="mb-4 font-ui text-xs font-semibold uppercase tracking-[0.25em] text-lima">Síguenos y contáctanos</p>
              <RedesSociales />
              <dl className="mt-6 grid gap-1 text-[0.95rem]">
                <dt className="mt-2 font-ui text-xs uppercase tracking-[0.15em] text-texto-suave">WhatsApp</dt>
                <dd><a className="font-medium text-crema hover:text-amarillo" href={`https://wa.me/${NEGOCIO.whatsapp}`} target="_blank" rel="noopener">{NEGOCIO.telefono}</a></dd>
                <dt className="mt-2 font-ui text-xs uppercase tracking-[0.15em] text-texto-suave">Correo</dt>
                <dd><a className="font-medium break-words text-crema hover:text-amarillo" href={`mailto:${NEGOCIO.correo}`}>{NEGOCIO.correo}</a></dd>
              </dl>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function PiePagina() {
  const legales = [
    ['Privacidad', PAGINAS.privacidad], ['Términos', PAGINAS.terminos], ['Cookies', PAGINAS.cookies], ['Cambios y reclamos', PAGINAS.devoluciones],
  ] as const
  return (
    <footer className="relative mt-8 bg-noche-900 px-[clamp(1.25rem,5vw,3.75rem)] pt-24 pb-12 [background-image:radial-gradient(circle,rgb(214_231_166/0.05)_1px,transparent_1.6px)] [background-size:18px_18px]">
      <span aria-hidden="true" className="absolute inset-x-0 -top-3 h-5 bg-noche-900 drop-shadow-[0_-2px_0_rgb(246_236_210/0.75)] [mask:var(--rasgado-b)_0_0/280px_100%_repeat-x] [-webkit-mask:var(--rasgado-b)_0_0/280px_100%_repeat-x]" />
      <span aria-hidden="true" className="papel-picado absolute inset-x-0 top-[18px]" />
      <div className="mx-auto flex max-w-(--container-sitio) flex-col items-center gap-6 text-center">
        <img src={LOGO} alt="La Hornilla de Zaid" width={126} height={56} loading="lazy" className="h-14 w-auto drop-shadow-[0_6px_12px_rgb(0_0_0/0.5)]" />
        <nav aria-label="Secciones del sitio">
          <ul className="flex flex-wrap justify-center gap-x-8">
            {[['Menú', PAGINAS.menu], ['Pedir', PAGINAS.pedido], ['Ubicación', PAGINAS.ubicacion], ['Canal', PAGINAS.inicio + '#canal']].map(([t, h]) => (
              <li key={t}><a href={h} className="inline-block py-2.5 font-ui text-sm font-semibold uppercase tracking-[0.15em] text-crema hover:text-amarillo">{t}</a></li>
            ))}
            <li data-pupusas=""><a href={PAGINAS.pupusas} className="inline-block py-2.5 font-ui text-sm font-semibold uppercase tracking-[0.15em] text-crema hover:text-amarillo">Pupusas</a></li>
          </ul>
        </nav>
        <nav aria-label="Información legal">
          <ul className="flex flex-wrap justify-center gap-x-5 text-[0.8rem]">
            {legales.map(([t, h]) => (
              <li key={t}><a href={h} className="inline-block py-3 text-texto-suave underline decoration-texto-suave/40 underline-offset-4 hover:text-amarillo">{t}</a></li>
            ))}
            <li><button type="button" onClick={abrirCookies} className="py-3 text-texto-suave underline decoration-texto-suave/40 underline-offset-4 hover:text-amarillo">Configurar cookies</button></li>
          </ul>
        </nav>
        <RedesSociales className="justify-center" />
        <p className="text-[0.8rem] text-texto-suave">© {new Date().getFullYear()} La Hornilla de Zaid. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export function Sitio({ pagina, children }: { pagina: Pagina; children: ReactNode }) {
  const [abierto, setAbierto] = useState(false)
  const cerrar = useCallback(() => setAbierto(false), [])
  useEffect(() => { pupusasActivas() }, [])
  return (
    <>
      <a href="#contenido" className="fixed top-[-60px] left-4 z-[3000] rounded-[10px] bg-rojo px-4 py-3 font-ui text-sm font-semibold uppercase tracking-wider text-white shadow-[0_3px_0_var(--color-rojo-sombra)] transition-[top] focus:top-4">
        Saltar al contenido
      </a>
      <Encabezado abierto={abierto} alAbrir={() => setAbierto(true)} />
      <MenuLateral abierto={abierto} alCerrar={cerrar} pagina={pagina} />
      <main id="contenido" tabIndex={-1} className="outline-none">{children}</main>
      <PiePagina />
    </>
  )
}
