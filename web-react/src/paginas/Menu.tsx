/* =====================================================================
   MENÚ — carta completa (Firebase), promos del día, extras y bebidas.
   Pestañas por categoría con DirectionAwareTabs (Cult UI) + buscador.
   ===================================================================== */
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { ArrowRight, Check, Search, Share2, X } from 'lucide-react'
import { Sitio } from '@/components/marca/Sitio'
import { AvisoDelivery, EncabezadoSeccion, EtiquetaPrecio, PaginaHero, Precio } from '@/components/marca/Piezas'
import { TarjetaPromo } from '@/components/marca/Promo'
import { TextureButton } from '@/components/ui/texture-button'
import { TextureCard, TextureSeparator } from '@/components/ui/texture-card'
import { DirectionAwareTabs } from '@/components/ui/direction-aware-tabs'
import {
  cargarBebidas, cargarExtras, cargarMenu, cargarPromos, cargarPupusas, fotoDe, pupusasActivas, seMuestraHoy,
  type Bebida, type Carta, type Extra, type Plato, type Promo,
} from '@/lib/datos'
import { HORARIO_MENU, NEGOCIO, PAGINAS } from '@/lib/sitio'
import { cn } from '@/lib/utils'

/* Resalta lo que coincide con la búsqueda */
function Resaltar({ texto, termino }: { texto: string; termino: string }) {
  const t = termino.trim()
  if (!t) return <>{texto}</>
  const re = new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig')
  return <>{texto.split(re).map((p, i) => (i % 2 ? <mark key={i} className="rounded-sm bg-amarillo/35 px-px text-inherit">{p}</mark> : p))}</>
}

const coincide = (p: Plato, t: string) => {
  if (!t) return true
  const q = t.toLowerCase()
  return p.nombre.toLowerCase().includes(q) || !!p.descripcion?.toLowerCase().includes(q) || !!p.variantes?.some((v) => v.texto.toLowerCase().includes(q))
}

function Foto({ plato, alto = 'aspect-[16/10]' }: { plato: Plato; alto?: string }) {
  const src = fotoDe(plato)
  if (!src) return null
  return (
    <div className={cn('relative bg-noche-800', alto)}>
      <img src={src} alt={`${plato.nombre} de La Hornilla de Zaid`} width={720} height={450} loading="lazy" decoding="async" className="size-full object-cover" />
      <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-4 bg-noche-500 [mask:var(--rasgado-b)_0_0/260px_100%_repeat-x] [-webkit-mask:var(--rasgado-b)_0_0/260px_100%_repeat-x]" />
    </div>
  )
}

function TarjetaPlatillo({ plato, termino }: { plato: Plato; termino: string }) {
  if (plato.destacado) {
    const foto = fotoDe(plato)
    return (
      <TextureCard as="article" className="col-span-full border-amarillo/60">
        <div className={cn('grid h-full', foto && 'md:grid-cols-[1.1fr_1fr]')}>
          <div className="relative">
            {foto && <img src={foto} alt={`${plato.nombre} de La Hornilla de Zaid`} width={720} height={450} loading="lazy" decoding="async" className="aspect-[16/10] size-full object-cover md:aspect-auto md:min-h-64" />}
            <span className={cn('esquina-doblada bg-rojo px-4 py-2 font-ui text-xs font-bold tracking-[0.22em] text-white uppercase', foto ? 'absolute top-4 left-4' : 'm-6 inline-block')}>
              {plato.etiqueta || 'Destacado'}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 p-[clamp(1.4rem,4vw,2.25rem)] text-center md:items-start md:text-left">
            <h3 className="font-titulo text-[clamp(2.2rem,6vw,3rem)] leading-none text-crema [text-shadow:3px_3px_0_var(--color-rojo)]"><Resaltar texto={plato.nombre} termino={termino} /></h3>
            {plato.descripcion && <p className="max-w-[46ch] text-[0.95rem]"><Resaltar texto={plato.descripcion} termino={termino} /></p>}
            {plato.precioUnico && <EtiquetaPrecio valor={plato.precioUnico} className="mt-2" />}
          </div>
        </div>
      </TextureCard>
    )
  }
  return (
    <TextureCard as="article" className="transition-transform duration-300 ease-(--ease-marca) hover:-translate-y-1">
      <Foto plato={plato} />
      <div className="flex flex-1 flex-col px-5 pt-3.5 pb-5 sm:px-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-ui text-[1.55rem] font-bold tracking-[0.06em] text-crema uppercase"><Resaltar texto={plato.nombre} termino={termino} /></h3>
          {plato.nota && <span className="text-sm font-semibold whitespace-nowrap text-lima italic">{plato.nota}</span>}
        </div>
        <TextureSeparator className="mt-3.5 mb-1" />
        <ul className="grid gap-2.5 pt-2.5">
          {(plato.variantes || []).map((v, i) => (
            <li key={i} className="flex items-baseline justify-between gap-3.5 font-ui text-[0.95rem] font-medium tracking-wide uppercase">
              <span><Resaltar texto={v.texto} termino={termino} /></span>
              <Precio valor={v.precio} className="text-[1.25rem] tracking-normal" />
            </li>
          ))}
        </ul>
      </div>
    </TextureCard>
  )
}

function Rejilla({ platos, termino }: { platos: Plato[]; termino: string }) {
  if (!platos.length) {
    return (
      <div className="py-14 text-center text-texto-suave">
        <h3 className="mb-2 font-ui text-xl font-bold text-crema uppercase">No encontramos nada{termino && <> con “{termino}”</>}</h3>
        <p>Prueba con otra palabra o <a className="text-amarillo underline" href={`https://wa.me/${NEGOCIO.whatsapp}`} target="_blank" rel="noopener">pregúntanos por WhatsApp</a>.</p>
      </div>
    )
  }
  return <div className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr))]">{platos.map((p, i) => <TarjetaPlatillo key={p.id || p.nombre + i} plato={p} termino={termino} />)}</div>
}

function Carta({ carta }: { carta: Carta }) {
  const [termino, setTermino] = useState('')
  const [activo, setActivo] = useState(0)
  const cats = useMemo(() => carta.categorias.filter((c) => carta.platos.some((p) => p.categoria === c)), [carta])
  const t = termino.trim()
  const tabs = useMemo(
    () => ['Todas', ...cats].map((c, i) => ({
      id: i,
      label: c,
      content: <Rejilla termino={t} platos={carta.platos.filter((p) => (i === 0 || p.categoria === c) && coincide(p, t))} />,
    })),
    [cats, carta, t],
  )

  const buscador: ReactNode = (
    <div className="relative mx-auto mb-3 flex max-w-xl items-center">
      <Search aria-hidden="true" className="pointer-events-none absolute left-4 size-[18px] text-texto-suave" />
      <input
        type="search"
        value={termino}
        onChange={(e) => setTermino(e.target.value)}
        placeholder="Buscar en el menú… (ej. pastor, birria)"
        aria-label="Buscar platillo"
        className="min-h-12 w-full rounded-full border-2 border-crema/16 bg-noche-900/70 py-3 pr-12 pl-11 text-base text-crema placeholder:text-texto-suave/80 focus:border-amarillo [&::-webkit-search-cancel-button]:hidden"
      />
      {termino && (
        <button type="button" onClick={() => setTermino('')} aria-label="Limpiar búsqueda" className="absolute right-2 grid size-9 place-items-center rounded-full bg-crema/10 text-crema hover:text-amarillo">
          <X aria-hidden="true" className="size-4" />
        </button>
      )}
    </div>
  )

  return (
    <DirectionAwareTabs
      etiqueta="Categorías del menú"
      tabs={tabs}
      activo={activo}
      alCambiar={setActivo}
      encima={buscador}
      claseBarra="sticky top-[calc(clamp(42px,5.5vw,58px)+24px)] z-[500] -mx-5 border-b border-dashed border-crema/20 bg-noche-800/95 px-5 py-3 backdrop-blur-md sm:mx-0 sm:rounded-b-2xl"
    />
  )
}

function Compartir() {
  const [copiado, setCopiado] = useState(false)
  const compartir = async () => {
    const data = { title: document.title, url: location.href }
    if (navigator.share) { try { await navigator.share(data) } catch { /* canceló */ } return }
    try { await navigator.clipboard.writeText(location.href); setCopiado(true); setTimeout(() => setCopiado(false), 2000) } catch { /* sin portapapeles */ }
  }
  return (
    <TextureButton variant="crema" onClick={compartir} aria-live="polite">
      {copiado ? <><Check aria-hidden="true" className="size-4" /> Enlace copiado</> : <><Share2 aria-hidden="true" className="size-4" /> Compartir menú</>}
    </TextureButton>
  )
}

function Lista({ items }: { items: (Bebida | Extra)[] }) {
  return (
    <ul>
      {items.map((b, i) => (
        <li key={b.nombre + i} className="flex items-baseline justify-between gap-3.5 border-b border-dashed border-crema/20 py-3 last:border-b-0">
          <span>{b.nombre}</span>
          <Precio valor={b.precio} className="text-[1.1rem]" />
        </li>
      ))}
    </ul>
  )
}

export function Menu() {
  const [carta, setCarta] = useState<Carta | null>(null)
  const [promos, setPromos] = useState<Promo[]>([])
  const [bebidas, setBebidas] = useState<Bebida[]>([])
  const [extras, setExtras] = useState<Extra[]>([])
  const [toque, setToque] = useState<Plato[]>([])

  useEffect(() => {
    cargarMenu().then(setCarta)
    cargarPromos().then((l) => setPromos(l.filter((p) => seMuestraHoy(p))))
    cargarBebidas().then(setBebidas)
    cargarExtras().then(setExtras)
    pupusasActivas().then((on) => { if (on) cargarPupusas().then((c) => setToque(c.platos.filter((p) => p.categoria === 'Con un toque mexicano'))) })
  }, [])

  const frias = bebidas.filter((b) => (b.grupo || 'fria') !== 'caliente')
  const calientes = bebidas.filter((b) => b.grupo === 'caliente')

  return (
    <Sitio pagina="menu">
      <PaginaHero eyebrow="La Hornilla de Zaid" titulo="Menú">
        <p className="mt-6 rounded-lg border-2 border-dashed border-verde-oscuro/45 bg-papel px-5 py-2.5 font-ui text-[0.92rem] leading-normal font-medium tracking-wide text-tinta shadow-[0_0_0_4px_var(--color-papel),0_7px_0_rgb(0_0_0/0.35)]">
          {HORARIO_MENU.map((l) => <span key={l} className="block">{l}</span>)}
        </p>
        <AvisoDelivery className="mt-5" />
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <TextureButton asChild variant="rojo"><a href={PAGINAS.pedido}>Pedir en línea <ArrowRight aria-hidden="true" className="size-4" /></a></TextureButton>
          <Compartir />
        </div>
      </PaginaHero>

      {promos.length > 0 && (
        <div aria-label="Promociones del día" className="mx-auto mt-[clamp(2.2rem,5vw,3.25rem)] flex max-w-(--container-sitio) flex-col gap-6 px-5">
          {promos.map((p, i) => <TarjetaPromo key={p.nombre + i} promo={p} />)}
        </div>
      )}

      <section id="platillos" aria-labelledby="tituloPlatillos" className="mx-auto max-w-(--container-sitio) px-5 pt-[clamp(3.5rem,8vw,5.5rem)] pb-8">
        <EncabezadoSeccion id="tituloPlatillos" eyebrow="Lo mejor de la casa" titulo="Platillos" />
        {carta ? <Carta carta={carta} /> : <p className="py-10 text-center text-texto-suave" role="status">Cargando el menú…</p>}

        {extras.length > 0 && (
          <TextureCard className="mx-auto mt-12 max-w-2xl">
            <div className="px-[clamp(1.4rem,4vw,2.4rem)] py-7">
              <h3 className="mb-4 text-center font-titulo text-[2.2rem] leading-none text-crema [text-shadow:3px_3px_0_var(--color-rojo)]">Extras</h3>
              <div className="grid gap-x-8 sm:grid-cols-2">
                <Lista items={extras.slice(0, Math.ceil(extras.length / 2))} />
                <Lista items={extras.slice(Math.ceil(extras.length / 2))} />
              </div>
            </div>
          </TextureCard>
        )}
        <p className="mt-7 text-center font-ui text-sm tracking-[0.15em] text-texto-suave uppercase">Únicamente delivery · El envío tiene un costo según la zona</p>
      </section>

      {toque.length > 0 && (
        <section data-pupusas="" aria-labelledby="tituloPupusas" className="bg-noche-800 px-5 py-[clamp(3.5rem,8vw,5.5rem)]">
          <EncabezadoSeccion id="tituloPupusas" eyebrow="Especialidad de la casa" titulo="Pupusas con un toque mexicano" />
          <TextureCard className="mx-auto max-w-3xl"><div className="px-6 py-3"><Lista items={toque.map((p) => ({ nombre: p.nombre, precio: p.variantes?.[0]?.precio || '' }))} /></div></TextureCard>
        </section>
      )}

      <section id="bebidas" aria-labelledby="tituloBebidas" className="mx-auto max-w-(--container-sitio) px-5 py-[clamp(3.5rem,8vw,5.5rem)]">
        <EncabezadoSeccion id="tituloBebidas" eyebrow="Para acompañar" titulo="Bebidas" />
        <div className="mx-auto grid max-w-4xl items-start gap-6 md:grid-cols-[1.4fr_1fr]">
          <TextureCard><div className="px-6 py-3"><h3 className="pt-3 font-ui text-base font-bold tracking-[0.15em] text-lima uppercase">Frías</h3><Lista items={frias} /></div></TextureCard>
          {calientes.length > 0 && <TextureCard><div className="px-6 py-3"><h3 className="pt-3 font-ui text-base font-bold tracking-[0.15em] text-lima uppercase">Calientes</h3><Lista items={calientes} /></div></TextureCard>}
        </div>
      </section>
    </Sitio>
  )
}
