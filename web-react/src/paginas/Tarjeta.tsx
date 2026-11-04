/* =====================================================================
   TARJETA HORNILLA — la tarjeta de sellos digital de cada cliente.
   • Se abre con el enlace personal que manda el negocio por WhatsApp
     (…/HTML/tarjeta.html?c=HZ-K7M4QX) o escribiendo el código aquí.
   • Solo LEE: los sellos y los canjes los pone el negocio desde el admin
     (Clientes → Tarjeta). La página nunca suma ni descuenta sola.
   • Las reglas (sellos para el premio, mínimo, premio, condiciones) las
     edita el admin en config/fidelidad.
   ===================================================================== */
import { useEffect, useId, useState, type FormEvent, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, Check, Copy, Flame, Gift } from 'lucide-react'
import { Sitio } from '@/components/marca/Sitio'
import { Boton, Hoja, Portadilla } from '@/components/marca/Hecho'
import { IconoWhatsApp } from '@/components/marca/Iconos'
import {
  cargarReglasTarjeta, cargarTarjeta, CODIGO_TARJETA, normalizarCodigo,
  type DatosTarjeta, type ReglasTarjeta,
} from '@/lib/datos'
import { dinero, NEGOCIO, PAGINAS } from '@/lib/sitio'
import { cn } from '@/lib/utils'

const CLAVE = 'hornilla_tarjeta'
const wa = (texto: string) => `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(texto)}`

function codigoInicial() {
  try {
    const c = normalizarCodigo(new URLSearchParams(location.search).get('c') || '')
    if (c) return c
    return normalizarCodigo(localStorage.getItem(CLAVE) || '')
  } catch { return '' }
}

type Estado = 'inicio' | 'cargando' | 'lista' | 'no-existe' | 'error'

/* ── Un sello de la tarjeta ─────────────────────────────────────────── */
function Sello({ n, lleno, ultimo, demora }: { n: number; lleno: boolean; ultimo: boolean; demora: number }) {
  return (
    <li aria-hidden="true" className="grid place-items-center">
      <motion.span
        initial={lleno ? { scale: 0.3, opacity: 0, rotate: -24 } : false}
        animate={{ scale: 1, opacity: 1, rotate: lleno ? -6 : 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 18, delay: demora }}
        className={cn(
          'grid size-[clamp(3.6rem,17vw,4.6rem)] place-items-center rounded-full',
          lleno
            ? 'bg-rojo text-white shadow-[0_3px_0_var(--color-rojo-sombra),inset_0_0_0_3px_rgb(255_255_255/0.22)]'
            : 'border-2 border-dashed border-tinta/40 text-tinta/60',
        )}
      >
        {lleno
          ? <Flame className="size-[45%]" strokeWidth={2.2} />
          : ultimo
            ? <Gift className="size-[42%]" strokeWidth={1.8} />
            : <span className="font-precio text-[1.15rem] leading-none">{n}</span>}
      </motion.span>
    </li>
  )
}

/* ── La tarjeta de papel ────────────────────────────────────────────── */
function TarjetaPapel({ t, r, children }: { t: DatosTarjeta; r: ReglasTarjeta; children?: ReactNode }) {
  const meta = r.meta
  const sellos = Math.min(t.sellos, meta)
  const faltan = meta - sellos
  return (
    <div className="drop-shadow-[8px_8px_0_var(--color-noche-950)]">
      <article className="overflow-hidden rounded-[8px] bg-crema text-tinta" aria-label={`Tarjeta Hornilla de ${t.nombre}`}>
        <header className="semitono relative bg-verde-banda px-5 pt-14 pb-6 text-center">
          <span aria-hidden="true" className="papel-picado absolute inset-x-0 top-2.5" />
          <p className="font-ui text-xs font-semibold tracking-[0.25em] text-crema uppercase">La Hornilla de Zaid</p>
          <h2 className="mt-1 font-titulo text-[clamp(2.4rem,9vw,3.4rem)] leading-none text-crema [text-shadow:3px_3px_0_var(--color-noche-700)]">Tarjeta Hornilla</h2>
          <p className="mt-3 inline-block -rotate-1 bg-rojo px-4 py-1 font-ui text-base font-semibold tracking-wider text-white uppercase shadow-[0_3px_0_var(--color-rojo-sombra)]">{t.nombre}</p>
        </header>

        <div className="px-[clamp(1.1rem,5vw,2rem)] pt-7 pb-8 [background-image:radial-gradient(circle,rgb(47_116_36/0.08)_1px,transparent_1.6px)] [background-size:14px_14px]">
          <div role="img" aria-label={`Llevas ${sellos} de ${meta} sellos`}>
            <ul className="grid gap-x-2 gap-y-5" style={{ gridTemplateColumns: `repeat(${meta <= 8 ? 4 : meta <= 10 ? 5 : 6}, minmax(0, 1fr))` }}>
              {Array.from({ length: meta }, (_, i) => (
                <Sello key={i} n={i + 1} lleno={i < sellos} ultimo={i === meta - 1} demora={i * 0.07} />
              ))}
            </ul>
          </div>

          <p className="mt-6 text-center font-ui text-lg font-semibold tracking-wider uppercase" aria-live="polite">
            <span className="font-precio text-3xl text-rojo">{sellos}</span> de {meta} sellos
            <span className="mt-0.5 block text-sm font-medium tracking-normal text-tinta/75 normal-case">
              {t.premios > 0 ? `Ya tienes premio disponible. Sigues juntando: te ${faltan === 1 ? 'falta 1 sello' : `faltan ${faltan} sellos`} para el siguiente.` : faltan === 1 ? 'Te falta 1 sello para tu premio.' : `Te faltan ${faltan} sellos para tu premio.`}
            </span>
          </p>

          {r.premio && (
            <p className="mt-5 rounded-[8px] border-2 border-dashed border-verde-banda/55 bg-verde-banda/8 px-4 py-3 text-center text-[0.95rem]">
              <span className="font-ui text-xs font-semibold tracking-[0.2em] text-verde-oscuro uppercase">Tu premio</span><br />
              <strong className="text-lg">{r.premio}</strong>
            </p>
          )}
          {children}
        </div>
      </article>
    </div>
  )
}

function Paso({ n, children }: { n: number; children: ReactNode }) {
  return (
    <li className="flex gap-3.5">
      <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-amarillo font-precio text-sm text-tinta">{n}</span>
      <span className="pt-0.5 leading-snug">{children}</span>
    </li>
  )
}

function ComoFunciona({ r }: { r: ReglasTarjeta | null }) {
  return (
    <Hoja as="section" aria-labelledby="tituloComo">
      <div className="p-[clamp(1.25rem,4vw,1.75rem)]">
        <h2 id="tituloComo" className="mb-4 font-ui text-[1.1rem] font-bold tracking-[0.12em] text-amarillo uppercase">Cómo funciona</h2>
        <ol className="grid gap-3.5 text-[0.95rem]">
          <Paso n={1}>Pide tu tarjeta por WhatsApp. Te mandamos tu enlace y tu código personal.</Paso>
          <Paso n={2}>
            Cada pedido que te entregamos{r && r.minimo > 0 ? <> de <strong className="text-crema">{dinero(r.minimo)}</strong> o más</> : null} suma <strong className="text-crema">1 sello</strong>.
            {' '}Lo ponemos nosotros al entregarte.
          </Paso>
          <Paso n={3}>
            {r ? <>Con <strong className="text-crema">{r.meta} sellos</strong> ganas{r.premio ? <>: <strong className="text-crema">{r.premio}</strong></> : ' tu premio'}.</> : 'Al completar tus sellos ganas tu premio.'}
          </Paso>
          <Paso n={4}>Para canjearlo, escríbenos tu código por WhatsApp o escríbelo al pedir en la web. Lo confirmamos antes de aplicarlo.</Paso>
        </ol>
        {r?.condiciones && <p className="mt-5 border-t border-dashed border-crema/25 pt-4 text-sm text-texto-suave"><strong className="text-crema">Condiciones:</strong> {r.condiciones}</p>}
        <p className="mt-3 text-xs text-texto-suave">
          Guardamos tu nombre y WhatsApp solo para llevar tu tarjeta. Mira la <a className="underline underline-offset-2 hover:text-amarillo" href={PAGINAS.privacidad}>política de privacidad</a>; si quieres que borremos tus datos, escríbenos.
        </p>
      </div>
    </Hoja>
  )
}

function BotonPedirTarjeta({ className }: { className?: string }) {
  const texto = '¡Hola! 🤠 Quiero mi Tarjeta Hornilla.\nMi nombre es: \nAcepto que guarden mi nombre y WhatsApp solo para llevar mi tarjeta.'
  return (
    <Boton asChild variant="rojo" size="lg" className={className}>
      <a href={wa(texto)} target="_blank" rel="noopener"><IconoWhatsApp className="size-5" /> Pedir mi tarjeta por WhatsApp</a>
    </Boton>
  )
}

export function Tarjeta() {
  const idCodigo = useId()
  const [codigo, setCodigo] = useState(codigoInicial)
  const [escrito, setEscrito] = useState('')
  const [estado, setEstado] = useState<Estado>(codigo ? 'cargando' : 'inicio')
  const [tarjeta, setTarjeta] = useState<DatosTarjeta | null>(null)
  const [reglas, setReglas] = useState<ReglasTarjeta | null | undefined>(undefined)
  const [copiado, setCopiado] = useState(false)
  const [errorForm, setErrorForm] = useState('')

  useEffect(() => { cargarReglasTarjeta().then(setReglas) }, [])

  useEffect(() => {
    if (!codigo) { setEstado('inicio'); setTarjeta(null); return }
    let vigente = true
    setEstado('cargando')
    cargarTarjeta(codigo)
      .then((t) => {
        if (!vigente) return
        if (!t) { setTarjeta(null); setEstado('no-existe'); return }
        setTarjeta(t)
        setEstado('lista')
        try { localStorage.setItem(CLAVE, codigo) } catch { /* sin almacenamiento */ }
      })
      .catch(() => { if (vigente) setEstado('error') })
    return () => { vigente = false }
  }, [codigo])

  const ver = (e: FormEvent) => {
    e.preventDefault()
    const c = normalizarCodigo(escrito)
    if (!CODIGO_TARJETA.test(c)) { setErrorForm('Revisa tu código: se ve así, HZ-K7M4QX (6 letras o números después del guion).'); return }
    setErrorForm('')
    try { history.replaceState(null, '', `?c=${encodeURIComponent(c)}`) } catch { /* nada */ }
    setCodigo(c)
  }

  const otraTarjeta = () => {
    try { localStorage.removeItem(CLAVE); history.replaceState(null, '', location.pathname) } catch { /* nada */ }
    setCodigo(''); setEscrito(''); setTarjeta(null); setEstado('inicio')
  }

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(codigo)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2200)
    } catch { /* el código sigue visible para copiarlo a mano */ }
  }

  const apagada = reglas !== undefined && !reglas?.activo
  const reglasOk: ReglasTarjeta = reglas ?? { activo: false, meta: 8, minimo: 0, premio: '', condiciones: '' }

  return (
    <Sitio pagina="tarjeta">
      <Portadilla lema="Tarjeta de sellos" titulo={<>Tarjeta <span className="text-amarillo [text-shadow:4px_4px_0_var(--color-rojo-sombra)]">Hornilla</span></>}>
        <p className="mt-4 max-w-[44ch] text-[1.02rem] text-texto-suave">Junta sellos con tus pedidos y gana tu premio.</p>
      </Portadilla>
      <section aria-live="polite" className="mx-auto grid max-w-3xl gap-6 px-5 py-[clamp(3rem,8vw,5rem)]">
        {estado === 'cargando' && <p role="status" className="text-center text-texto-suave">Buscando tu tarjeta…</p>}

        {estado === 'lista' && tarjeta && (
          <>
            {apagada && (
              <p className="rounded-[8px] border-2 border-dashed border-amarillo/50 bg-amarillo/8 px-5 py-3.5 text-center text-[0.92rem]">
                La Tarjeta Hornilla empieza muy pronto: tus sellos se suman cuando el programa esté activo.
              </p>
            )}
            <TarjetaPapel t={tarjeta} r={reglasOk}>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 border-t border-dashed border-tinta/30 pt-5 text-sm">
                <span className="text-tinta/75">Tu código:</span>
                <strong className="font-precio text-lg tracking-wider">{tarjeta.codigo}</strong>
                <button
                  type="button"
                  onClick={copiar}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full border-2 border-tinta/30 px-4 font-ui text-xs font-semibold tracking-wider uppercase hover:border-rojo hover:text-rojo focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-rojo"
                >
                  {copiado ? <Check aria-hidden="true" className="size-4" /> : <Copy aria-hidden="true" className="size-4" />}
                  {copiado ? 'Copiado' : 'Copiar'}
                </button>
              </div>
            </TarjetaPapel>

            {tarjeta.premios > 0 && (
              <Hoja tono="banda">
                <div className="flex flex-col items-center gap-4 p-6 text-center">
                  <Gift aria-hidden="true" className="size-9 text-amarillo" />
                  <h2 className="font-titulo text-[clamp(2rem,7vw,2.6rem)] leading-none text-crema [text-shadow:3px_3px_0_var(--color-noche-700)]">
                    ¡Tienes {tarjeta.premios === 1 ? 'un premio' : `${tarjeta.premios} premios`}!
                  </h2>
                  {reglasOk.premio && <p className="text-white">{reglasOk.premio}</p>}
                  <div className="flex flex-wrap justify-center gap-3">
                    <Boton asChild variant="rojo">
                      <a href={wa(`¡Hola! Quiero canjear mi premio de la Tarjeta Hornilla.\nMi código: ${tarjeta.codigo}`)} target="_blank" rel="noopener"><IconoWhatsApp className="size-5" /> Canjear por WhatsApp</a>
                    </Boton>
                    <Boton asChild variant="crema">
                      <a href={PAGINAS.pedido}>Pedir ahora <ArrowRight aria-hidden="true" className="size-4" /></a>
                    </Boton>
                  </div>
                  <p className="text-xs text-white/85">Lo confirmamos por WhatsApp antes de aplicarlo en tu pedido.</p>
                </div>
              </Hoja>
            )}

            <div className="flex flex-wrap justify-center gap-3">
              <Boton asChild variant="crema"><a href={PAGINAS.pedido}>Pedir con mi código <ArrowRight aria-hidden="true" className="size-4" /></a></Boton>
              <Boton variant="linea" onClick={otraTarjeta}>Ver otra tarjeta</Boton>
            </div>
          </>
        )}

        {(estado === 'inicio' || estado === 'no-existe' || estado === 'error') && (
          <Hoja as="section" aria-labelledby="tituloCodigo">
            <div className="grid gap-5 p-[clamp(1.25rem,4vw,1.75rem)]">
              <h2 id="tituloCodigo" className="font-ui text-[1.1rem] font-bold tracking-[0.12em] text-amarillo uppercase">Ver mi tarjeta</h2>
              {estado === 'no-existe' && <p role="alert" className="rounded-[8px] border-2 border-rojo/50 bg-rojo/15 px-4 py-3 text-[0.92rem] text-rojo-texto">No encontramos una tarjeta con el código <strong>{codigo}</strong>. Revisa que esté bien escrito.</p>}
              {estado === 'error' && <p role="alert" className="rounded-[8px] border-2 border-rojo/50 bg-rojo/15 px-4 py-3 text-[0.92rem] text-rojo-texto">No pudimos conectar para buscar tu tarjeta. Revisa tu internet e inténtalo otra vez.</p>}
              <form onSubmit={ver} noValidate className="grid gap-3">
                <label htmlFor={idCodigo} className="font-ui text-xs font-semibold tracking-[0.18em] text-texto-suave uppercase">Tu código</label>
                <input
                  id={idCodigo}
                  value={escrito}
                  onChange={(e) => setEscrito(e.target.value)}
                  placeholder="HZ-K7M4QX"
                  autoComplete="off" autoCapitalize="characters" spellCheck={false} maxLength={12}
                  aria-invalid={!!errorForm}
                  aria-describedby={errorForm ? `${idCodigo}-error` : undefined}
                  className="min-h-12 w-full rounded-[8px] border-2 border-crema/22 bg-noche-900 px-4 font-precio text-lg tracking-wider text-crema uppercase placeholder:text-texto-suave/60 focus:border-amarillo focus:outline-none"
                />
                {errorForm && <p id={`${idCodigo}-error`} role="alert" className="text-sm text-rojo-texto">{errorForm}</p>}
                <Boton type="submit" variant="rojo" size="lg" ancho="completo">Ver mi tarjeta <ArrowRight aria-hidden="true" className="size-4" /></Boton>
              </form>
              <div className="border-t border-dashed border-crema/25 pt-5">
                <p className="mb-3 text-[0.95rem]">¿Aún no tienes tarjeta? Pídela por WhatsApp.</p>
                <BotonPedirTarjeta />
              </div>
            </div>
          </Hoja>
        )}

        <ComoFunciona r={reglas ?? null} />
      </section>
    </Sitio>
  )
}
