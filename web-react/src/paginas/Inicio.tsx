/* =====================================================================
   INICIO — portada con fotos, opiniones reales y canal de WhatsApp.
   ===================================================================== */
import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { Sitio } from '@/components/marca/Sitio'
import { AvisoDelivery, EncabezadoSeccion } from '@/components/marca/Piezas'
import { TextureButton } from '@/components/ui/texture-button'
import { TextureCard } from '@/components/ui/texture-card'
import { TextAnimate } from '@/components/ui/text-animate'
import { RollingNumber } from '@/components/ui/rolling-number'
import { NeumorphEyebrow } from '@/components/ui/neumorph-eyebrow'
import { Portada } from './inicio/Portada'
import { cargarResenas, enviarResena, type Resena } from '@/lib/datos'
import { medir, NEGOCIO, PAGINAS } from '@/lib/sitio'
import { cn } from '@/lib/utils'

/* ────────────────────────────── Portada ────────────────────────────── */
function Hero() {
  const ref = useRef<HTMLElement>(null)
  return (
    <section ref={ref} className="relative grid min-h-svh place-items-center overflow-hidden px-5 pt-[clamp(6rem,13vh,8rem)] pb-[clamp(7rem,15vh,9.5rem)]">
      <Portada contenedor={ref} />
      {/* Velo verde noche para que el texto se lea sobre cualquier foto */}
      <div aria-hidden="true" className="absolute inset-0 z-[3] [background:radial-gradient(120%_90%_at_50%_40%,transparent_30%,rgb(7_26_5/0.6)_100%),linear-gradient(180deg,rgb(7_26_5/0.7)_0%,rgb(7_26_5/0.28)_30%,rgb(7_26_5/0.35)_62%,rgb(7_26_5/0.92)_100%)]" />

      <div className="relative z-[5] flex max-w-3xl flex-col items-center text-center">
        <h1 className="sr-only">La Hornilla de Zaid — Comida mexicana a domicilio en Sonsonate</h1>
        <p className="flex animate-subir items-center gap-3 font-ui text-[clamp(0.8rem,2.6vw,1rem)] font-semibold uppercase tracking-[clamp(2px,0.8vw,5px)] whitespace-nowrap text-lima [text-shadow:0_2px_12px_rgb(0_0_0/0.8)]">
          <span aria-hidden="true" className="h-0.5 w-[clamp(18px,5vw,36px)] bg-lima/70" />
          {NEGOCIO.lema}
          <span aria-hidden="true" className="h-0.5 w-[clamp(18px,5vw,36px)] bg-lima/70" />
        </p>
        <TextAnimate
          as="p"
          text="Sabor mexicano"
          delay={0.15}
          className="mt-3 font-ui text-[clamp(2.5rem,8vw,4.6rem)] leading-none font-bold tracking-[clamp(1px,0.4vw,3px)] text-white uppercase [text-shadow:0_4px_24px_rgb(0_0_0/0.65),0_2px_4px_rgb(0_0_0/0.5)]"
        />
        <p className="mt-2 animate-subir font-sans text-[clamp(1.05rem,3.3vw,1.9rem)] font-semibold text-amarillo italic [animation-delay:0.35s] [text-shadow:0_2px_12px_rgb(0_0_0/0.7)]">
          hasta tu casa
        </p>
        <AvisoDelivery className="mt-6 animate-subir [animation-delay:0.45s]" />
        <div className="mt-7 flex w-full max-w-[17rem] animate-subir flex-col gap-3.5 [animation-delay:0.55s]">
          <TextureButton asChild variant="rojo" size="lg" ancho="completo">
            <a href={PAGINAS.pedido}>Pedir en línea <ArrowRight aria-hidden="true" className="size-4" /></a>
          </TextureButton>
          <TextureButton asChild variant="fantasma" size="lg" ancho="completo">
            <a href={PAGINAS.menu}>Menú mexicano <ArrowRight aria-hidden="true" className="size-4" /></a>
          </TextureButton>
          <span data-pupusas="">
            <TextureButton asChild variant="fantasma" size="lg" ancho="completo">
              <a href={PAGINAS.pupusas}>Menú de pupusas <ArrowRight aria-hidden="true" className="size-4" /></a>
            </TextureButton>
          </span>
        </div>
      </div>

      <a href="#opiniones" className="absolute bottom-7 left-1/2 z-[5] flex -translate-x-1/2 flex-col items-center gap-2 px-3 py-2 font-ui text-[0.72rem] tracking-[0.18em] text-crema/90 uppercase motion-safe:animate-bounce [animation-duration:2.4s]">
        Opiniones y canal
        <span aria-hidden="true" className="h-8 w-px bg-gradient-to-b from-lima to-transparent" />
      </a>
      <span aria-hidden="true" className="absolute inset-x-0 -bottom-px z-[4] h-5 bg-noche-700 drop-shadow-[0_-2px_0_rgb(246_236_210/0.85)] [mask:var(--rasgado-a)_0_0/320px_100%_repeat-x] [-webkit-mask:var(--rasgado-a)_0_0/320px_100%_repeat-x]" />
    </section>
  )
}

/* ───────────────────────────── Opiniones ───────────────────────────── */
function Estrellas({ n, className }: { n: number; className?: string }) {
  const v = Math.max(0, Math.min(5, Math.round(n)))
  return (
    <span role="img" aria-label={`${v} de 5 estrellas`} className={cn('tracking-[2px] text-amarillo', className)}>
      {'★'.repeat(v)}<span className="text-crema/20">{'★'.repeat(5 - v)}</span>
    </span>
  )
}
const fecha = (r: Resena) => r.creado?.toDate?.().toLocaleDateString('es-SV', { month: 'long', year: 'numeric' }) ?? ''

function FormResena() {
  const ids = useId()
  const [estrellas, setEstrellas] = useState(0)
  const [hover, setHover] = useState(0)
  const [nombre, setNombre] = useState('')
  const [texto, setTexto] = useState('')
  const [acepto, setAcepto] = useState(false)
  const [trampa, setTrampa] = useState('')
  const [estado, setEstado] = useState<{ tipo: '' | 'error' | 'ok' | 'enviando'; msg: string }>({ tipo: '', msg: '' })
  const [invalido, setInvalido] = useState<'nombre' | 'texto' | ''>('')

  const enviar = async (e: FormEvent) => {
    e.preventDefault()
    if (trampa) return // bot
    setInvalido('')
    let error = ''
    if (!estrellas) error = 'Elige de 1 a 5 estrellas.'
    else if (nombre.trim().length < 2) { error = 'Escribe tu nombre o un apodo.'; setInvalido('nombre') }
    else if (texto.trim().length < 10) { error = 'Cuéntanos un poco más (mínimo 10 letras).'; setInvalido('texto') }
    else if (!acepto) error = 'Necesitamos tu permiso para publicar la reseña.'
    let previa = 0
    try { previa = Number(JSON.parse(localStorage.getItem('hornilla_resena') || '0')) } catch { /* modo privado */ }
    if (!error && previa && Date.now() - previa < 24 * 3600 * 1000) error = 'Ya recibimos una reseña tuya hoy. ¡Gracias!'
    if (error) { setEstado({ tipo: 'error', msg: error }); return }
    setEstado({ tipo: 'enviando', msg: 'Enviando…' })
    try {
      await enviarResena({ nombre: nombre.trim(), estrellas, comentario: texto.trim() })
      try { localStorage.setItem('hornilla_resena', JSON.stringify(Date.now())) } catch { /* modo privado */ }
      setEstrellas(0); setNombre(''); setTexto(''); setAcepto(false)
      setEstado({ tipo: 'ok', msg: '¡Gracias! Tu reseña se publicará después de una revisión rápida.' })
      medir('resena_enviada', { estrellas })
    } catch (err) {
      console.error(err)
      setEstado({ tipo: 'error', msg: 'No se pudo enviar. Revisa tu conexión e intenta de nuevo.' })
    }
  }

  const campo = 'w-full min-h-12 rounded-xl border-2 border-crema/16 bg-crema/6 px-4 py-3 text-base text-crema placeholder:text-texto-suave/80 transition-colors focus:border-amarillo focus:bg-crema/10 aria-[invalid=true]:border-rojo-texto'
  const etiqueta = 'font-ui text-[0.8rem] font-medium tracking-[0.12em] text-texto-suave uppercase'
  const pintadas = hover || estrellas

  return (
    <TextureCard as="form" onSubmit={enviar} noValidate className="mx-auto mt-8 max-w-xl">
      <div className="grid gap-5 p-6 sm:p-8">
        <h3 className="font-titulo text-[1.9rem] leading-none text-crema [text-shadow:2px_2px_0_var(--color-rojo)]">Cuéntanos cómo te fue</h3>
        <fieldset className="grid gap-2">
          <legend className={etiqueta}>Tu calificación <span aria-hidden="true" className="text-rojo-texto">*</span></legend>
          <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
            {[1, 2, 3, 4, 5].map((n) => (
              <label key={n} onMouseEnter={() => setHover(n)} className={cn('grid size-12 cursor-pointer place-items-center rounded-lg text-[2rem] leading-none transition-transform hover:scale-110 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-amarillo', n <= pintadas ? 'text-amarillo' : 'text-crema/22')}>
                <input type="radio" name="estrellas" value={n} checked={estrellas === n} onChange={() => setEstrellas(n)} className="sr-only" />
                <span aria-hidden="true">★</span>
                <span className="sr-only">{n} {n === 1 ? 'estrella' : 'estrellas'}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="grid gap-1.5">
          <label htmlFor={`${ids}-n`} className={etiqueta}>Tu nombre o apodo <span aria-hidden="true" className="text-rojo-texto">*</span></label>
          <input id={`${ids}-n`} className={campo} maxLength={40} autoComplete="given-name" placeholder="Ej. Ana M." value={nombre} onChange={(e) => setNombre(e.target.value)} aria-invalid={invalido === 'nombre' || undefined} />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor={`${ids}-c`} className={etiqueta}>Tu opinión <span aria-hidden="true" className="text-rojo-texto">*</span></label>
          <textarea id={`${ids}-c`} className={cn(campo, 'min-h-28 resize-y leading-normal')} maxLength={500} rows={4} placeholder="¿Qué pediste? ¿Qué te gustó o qué podemos mejorar?" value={texto} onChange={(e) => setTexto(e.target.value)} aria-describedby={`${ids}-cc`} aria-invalid={invalido === 'texto' || undefined} />
          <span id={`${ids}-cc`} className="justify-self-end text-xs text-texto-suave">{texto.length} / 500</span>
        </div>
        <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
          <label htmlFor={`${ids}-w`}>No llenar</label>
          <input id={`${ids}-w`} tabIndex={-1} autoComplete="off" value={trampa} onChange={(e) => setTrampa(e.target.value)} />
        </div>
        <label className="grid cursor-pointer grid-cols-[24px_1fr] items-start gap-2.5 text-sm leading-normal">
          <input type="checkbox" checked={acepto} onChange={(e) => setAcepto(e.target.checked)} className="mt-0.5 size-5 accent-rojo" />
          <span>Acepto que publiquen mi nombre y reseña, y la <a href={PAGINAS.privacidad} target="_blank" className="text-amarillo underline">política de privacidad</a>. Soy mayor de 18 años.</span>
        </label>
        <p role="status" aria-live="polite" className={cn('min-h-5 text-sm', estado.tipo === 'error' && 'text-rojo-texto', estado.tipo === 'ok' && 'text-lima')}>{estado.msg}</p>
        <TextureButton type="submit" variant="rojo" size="lg" ancho="completo" disabled={estado.tipo === 'enviando'}>
          Enviar reseña <ArrowRight aria-hidden="true" className="size-4" />
        </TextureButton>
      </div>
    </TextureCard>
  )
}

function Opiniones() {
  const [resenas, setResenas] = useState<Resena[] | null>(null)
  const [mostradas, setMostradas] = useState(6)
  const [formAbierto, setFormAbierto] = useState(false)
  useEffect(() => { cargarResenas().then(setResenas) }, [])
  const promedio = resenas?.length ? resenas.reduce((s, r) => s + (Number(r.estrellas) || 0), 0) / resenas.length : 0

  return (
    <section id="opiniones" aria-labelledby="tituloOpiniones" className="mx-auto max-w-(--container-sitio) scroll-mt-24 px-5 py-[clamp(4rem,9vw,6.5rem)]">
      <EncabezadoSeccion id="tituloOpiniones" eyebrow="Opiniones reales" titulo="Lo que dicen nuestros clientes" texto="Publicamos todas las reseñas reales, buenas o malas. Nunca inventamos opiniones." />

      {resenas && resenas.length > 0 && (
        <div className="-mt-4 mb-8 flex items-center justify-center gap-4 text-texto-suave" aria-live="polite">
          <strong className="font-precio text-[2.4rem] leading-none font-normal text-amarillo [text-shadow:2px_2px_0_var(--color-rojo-sombra)]">
            <RollingNumber value={promedio} precision={1} format={(n) => n.toFixed(1)} />
          </strong>
          <Estrellas n={promedio} />
          <span className="text-sm">{resenas.length} {resenas.length === 1 ? 'opinión' : 'opiniones'}</span>
        </div>
      )}

      <div aria-live="polite" className="grid justify-center gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),360px))]">
        {resenas === null && <p className="col-span-full py-6 text-center text-texto-suave">Cargando opiniones…</p>}
        {resenas?.length === 0 && (
          <div className="col-span-full rounded-2xl border-2 border-dashed border-crema/22 px-6 py-10 text-center text-texto-suave">
            <strong className="mb-1.5 block font-titulo text-[1.6rem] font-normal text-crema">Todavía no hay opiniones publicadas</strong>
            ¿Ya pediste? Sé de los primeros en contarnos cómo te fue.
          </div>
        )}
        {resenas?.slice(0, mostradas).map((r) => (
          <TextureCard as="article" key={r.id}>
            <div className="relative flex flex-col gap-3 p-6">
              <span aria-hidden="true" className="pointer-events-none absolute top-0.5 right-4 font-titulo text-[4.2rem] leading-none text-crema/8">”</span>
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-ui text-[1.05rem] font-semibold tracking-wider text-crema uppercase">{r.nombre}</span>
                <span className="text-xs whitespace-nowrap text-texto-suave">{fecha(r)}</span>
              </div>
              <Estrellas n={r.estrellas} />
              <p className="text-[0.95rem] leading-relaxed [overflow-wrap:anywhere]">{r.comentario}</p>
              {r.respuesta && (
                <div className="rounded-xl bg-crema/6 px-4 py-2.5 text-sm">
                  <b className="mb-0.5 block font-ui text-xs tracking-[0.12em] text-lima uppercase">Respuesta de La Hornilla</b>
                  {r.respuesta}
                </div>
              )}
            </div>
          </TextureCard>
        ))}
      </div>

      {resenas && mostradas < resenas.length && (
        <div className="mt-6 flex justify-center">
          <TextureButton variant="crema" onClick={() => setMostradas((m) => m + 6)}>Ver más opiniones</TextureButton>
        </div>
      )}

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <TextureButton variant="rojo" aria-expanded={formAbierto} aria-controls="formResena" onClick={() => setFormAbierto((v) => !v)}>
          {formAbierto ? 'Cerrar' : 'Dejar mi reseña'} <ArrowRight aria-hidden="true" className={cn('size-4 transition-transform', formAbierto && 'rotate-90')} />
        </TextureButton>
        <TextureButton asChild variant="crema">
          <a href={NEGOCIO.resenasGoogle} target="_blank" rel="noopener">Reseñar en Google <ExternalLink aria-hidden="true" className="size-4" /></a>
        </TextureButton>
      </div>
      <div id="formResena" hidden={!formAbierto}>{formAbierto && <FormResena />}</div>
    </section>
  )
}

/* ─────────────────────────── Canal de WhatsApp ─────────────────────────── */
function Canal() {
  return (
    <section id="canal" aria-labelledby="tituloCanal" className="mx-auto max-w-(--container-sitio) scroll-mt-24 px-5 pb-[clamp(3rem,7vw,5rem)] drop-shadow-[0_18px_30px_rgb(0_0_0/0.45)]">
      <div className="banda-rasgada semitono relative flex flex-col items-center bg-verde-banda px-[clamp(1.4rem,5vw,3.5rem)] pt-[clamp(4.5rem,8vw,5.25rem)] pb-[clamp(3rem,6vw,3.75rem)] text-center [background-image:radial-gradient(70%_90%_at_0%_0%,rgb(214_231_166/0.18),transparent_60%),radial-gradient(circle,rgb(255_255_255/0.1)_1px,transparent_1.7px)] [background-size:100%_100%,16px_16px]">
        <span aria-hidden="true" className="papel-picado absolute inset-x-0 top-3.5" />
        <NeumorphEyebrow intent="crema">Canal de WhatsApp</NeumorphEyebrow>
        <h2 id="tituloCanal" className="mt-4 font-titulo text-[clamp(2.3rem,7vw,3.4rem)] leading-none text-crema [text-shadow:3px_3px_0_var(--color-noche-700)]">
          Promos directo a tu WhatsApp
        </h2>
        <p className="mt-4 max-w-[44ch] leading-relaxed text-white">
          Sigue el canal de La Hornilla y entérate primero de los combos de la semana, promociones y avisos importantes, como la dirección de nuestro nuevo local.
        </p>
        <TextureButton asChild variant="lima" size="lg" className="mt-6">
          <a href={NEGOCIO.canal} target="_blank" rel="noopener" onClick={() => medir('canal_click', { origen: 'inicio' })}>
            Unirme al canal <ArrowRight aria-hidden="true" className="size-4" />
          </a>
        </TextureButton>
        <ul className="mt-5 grid justify-items-center gap-2 text-sm text-crema">
          <li className="flex gap-2"><span aria-hidden="true" className="font-bold text-lima">✓</span>Sin spam: solo lo importante.</li>
          <li className="flex gap-2"><span aria-hidden="true" className="font-bold text-lima">✓</span>Lo dejas cuando quieras desde WhatsApp.</li>
        </ul>
      </div>
    </section>
  )
}

export function Inicio() {
  return (
    <Sitio pagina="inicio">
      <Hero />
      <Opiniones />
      <Canal />
    </Sitio>
  )
}
