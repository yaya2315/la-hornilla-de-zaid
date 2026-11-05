/* =====================================================================
   MENÚ — carta completa (Firebase), promos del día, extras y bebidas.
   Pestañas por categoría con DirectionAwareTabs (Cult UI) + buscador.
   ===================================================================== */
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { ArrowRight, Check, Search, Share2, X } from 'lucide-react'
import { Sitio } from '@/components/marca/Sitio'
import { TarjetaPromo } from '@/components/marca/Promo'
import { Boton3D } from '@/components/marca/Visor3D'
import { Boton, DatosEntrega, Etiqueta, FilaPrecio, Portadilla, Recorte, TituloSeccion } from '@/components/marca/Hecho'
import { DirectionAwareTabs } from '@/components/ui/direction-aware-tabs'
import {
  cargarBebidas, cargarExtras, cargarMenu, cargarPromos, cargarPupusas, fotoDe, pupusasActivas, seMuestraHoy,
  type Bebida, type Carta, type Extra, type Plato, type Promo,
} from '@/lib/datos'
import { HORARIO_MENU, NEGOCIO, PAGINAS, url } from '@/lib/sitio'

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

/* Platillo como bloque de flyer: recorte de foto + nombre + precios con puntitos */
function TarjetaPlatillo({ plato, termino, indice }: { plato: Plato; termino: string; indice: number }) {
  const foto = fotoDe(plato)
  if (plato.destacado) {
    return (
      <article className="col-span-full grid items-center gap-[clamp(1.5rem,5vw,3rem)] border-y-2 border-dashed border-crema/20 py-[clamp(1.75rem,5vw,2.75rem)] md:grid-cols-[1fr_1.05fr]">
        {foto && (
          <Recorte src={foto} alt={`${plato.nombre} de La Hornilla de Zaid`} giro={-1.5} className="mx-auto w-full max-w-[520px]">
            <span className="esquina-doblada absolute top-4 -left-2 z-[2] -rotate-3 bg-rojo px-4 py-2 font-ui text-xs font-bold tracking-[0.22em] text-white uppercase shadow-[3px_3px_0_var(--color-rojo-sombra)]">
              {plato.etiqueta || 'Destacado'}
            </span>
            <Boton3D plato={plato} className="absolute right-4 bottom-4 z-[3]" />
          </Recorte>
        )}
        <div>
          {!foto && <span className="esquina-doblada mb-3 inline-block bg-rojo px-4 py-2 font-ui text-xs font-bold tracking-[0.22em] text-white uppercase">{plato.etiqueta || 'Destacado'}</span>}
          <h3 className="font-titulo text-[clamp(2.4rem,7vw,3.4rem)] leading-[0.95] text-crema [text-shadow:3px_3px_0_var(--color-rojo)]"><Resaltar texto={plato.nombre} termino={termino} /></h3>
          {plato.descripcion && <p className="mt-3 max-w-[46ch] text-[0.98rem]"><Resaltar texto={plato.descripcion} termino={termino} /></p>}
          {plato.precioUnico && <Etiqueta valor={plato.precioUnico} rotulo="Precio" className="mt-5" />}
        </div>
      </article>
    )
  }
  return (
    <article className="grid content-start gap-4">
      {foto && (
        <Recorte src={foto} alt={`${plato.nombre} de La Hornilla de Zaid`} giro={indice % 2 ? 1.2 : -1.2} proporcion="aspect-[16/10]">
          <Boton3D plato={plato} className="absolute right-4 bottom-4 z-[3]" />
        </Recorte>
      )}
      <div>
        <div className="flex items-baseline justify-between gap-3 border-b-2 border-crema/25 pb-2">
          <h3 className="font-ui text-[clamp(1.4rem,5vw,1.65rem)] font-bold tracking-[0.05em] text-crema uppercase"><Resaltar texto={plato.nombre} termino={termino} /></h3>
          {plato.nota && <span className="text-sm font-semibold whitespace-nowrap text-lima italic">{plato.nota}</span>}
        </div>
        <ul>
          {(plato.variantes || []).map((v, i) => (
            <FilaPrecio key={i} nombre={<Resaltar texto={v.texto} termino={termino} />} precio={v.precio} className="[&>span:first-child]:text-[0.88rem] [&>span:first-child]:font-medium" />
          ))}
        </ul>
      </div>
    </article>
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
  return <div className="grid gap-x-[clamp(1.75rem,4vw,3rem)] gap-y-[clamp(2.25rem,5vw,3.25rem)] [grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr))]">{platos.map((p, i) => <TarjetaPlatillo key={p.id || p.nombre + i} plato={p} termino={termino} indice={i} />)}</div>
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
    <div className="relative mb-3 flex max-w-xl items-center">
      <Search aria-hidden="true" className="pointer-events-none absolute left-4 size-[18px] text-texto-suave" />
      <input
        type="search"
        value={termino}
        onChange={(e) => setTermino(e.target.value)}
        placeholder="Buscar en el menú… (ej. pastor, birria)"
        aria-label="Buscar platillo"
        className="min-h-12 w-full rounded-[10px] border-2 border-crema/22 bg-noche-900 py-3 pr-12 pl-11 text-base text-crema placeholder:text-texto-suave/80 focus:border-amarillo [&::-webkit-search-cancel-button]:hidden"
      />
      {termino && (
        <button type="button" onClick={() => setTermino('')} aria-label="Limpiar búsqueda" className="absolute right-1.5 grid size-10 place-items-center rounded-[8px] bg-crema/10 text-crema hover:text-amarillo">
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
      claseBarra="sticky top-[calc(clamp(42px,5.5vw,58px)+24px)] z-[500] -mx-5 border-b-2 border-dashed border-crema/20 bg-noche-700 px-5 py-3"
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
    <Boton variant="linea" onClick={compartir} aria-live="polite">
      {copiado ? <><Check aria-hidden="true" className="size-4" /> Enlace copiado</> : <><Share2 aria-hidden="true" className="size-4" /> Compartir menú</>}
    </Boton>
  )
}

function Lista({ items }: { items: (Bebida | Extra)[] }) {
  return <ul>{items.map((b, i) => <FilaPrecio key={b.nombre + i} nombre={b.nombre} precio={b.precio} className="[&>span:first-child]:normal-case [&>span:first-child]:font-sans [&>span:first-child]:font-normal [&>span:first-child]:tracking-normal" />)}</ul>
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
      <Portadilla
        lema="La Hornilla de Zaid"
        titulo={<>El menú <span className="text-amarillo [text-shadow:4px_4px_0_var(--color-rojo-sombra)]">completo</span></>}
        aside={
          <Recorte src={url('Imagenes/fotos-de-platillos/tacos/tacos-01-mesa-tarjeta.webp')} alt="Orden de 4 tacos de La Hornilla de Zaid" giro={2} cargar="eager" className="mx-auto w-full max-w-[480px]">
            <span className="absolute -top-8 right-2 z-[2] -rotate-3 font-sans text-base font-semibold text-lima italic">orden de 4</span>
          </Recorte>
        }
        banda={HORARIO_MENU.map((l) => <span key={l}>{l}</span>)}
      >
        <p className="mt-4 max-w-[42ch] text-[1.02rem] text-texto-suave">Tacos, burritos, tortas, nachos y más. En cada platillo eliges tu carne.</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Boton asChild variant="rojo" size="lg"><a href={PAGINAS.pedido}>Pedir en línea <ArrowRight aria-hidden="true" className="size-4" /></a></Boton>
          <Compartir />
        </div>
        <DatosEntrega className="mt-6" />
      </Portadilla>

      {promos.length > 0 && (
        <div aria-label="Promociones del día" className="mx-auto mt-[clamp(2.5rem,6vw,3.75rem)] flex max-w-(--container-sitio) flex-col gap-7 px-5">
          {promos.map((p, i) => <TarjetaPromo key={p.nombre + i} promo={p} />)}
        </div>
      )}

      <section id="platillos" aria-labelledby="tituloPlatillos" className="mx-auto max-w-(--container-sitio) px-5 pt-[clamp(3.5rem,8vw,5.5rem)] pb-8">
        <TituloSeccion id="tituloPlatillos" titulo="Platillos" nota="Busca por nombre o por carne, o filtra por categoría." />
        {carta ? <Carta carta={carta} /> : <p className="py-10 text-texto-suave" role="status">Cargando el menú…</p>}

        {extras.length > 0 && (
          <div className="mt-[clamp(3rem,7vw,4.5rem)] max-w-3xl">
            <TituloSeccion titulo="Extras" como="h3" className="mb-3" />
            <div className="grid gap-x-10 sm:grid-cols-2">
              <Lista items={extras.slice(0, Math.ceil(extras.length / 2))} />
              <Lista items={extras.slice(Math.ceil(extras.length / 2))} />
            </div>
          </div>
        )}
        <p className="mt-8 font-ui text-sm tracking-[0.15em] text-texto-suave uppercase">Únicamente delivery · El envío tiene un costo según la zona</p>
      </section>

      {toque.length > 0 && (
        <section data-pupusas="" aria-labelledby="tituloPupusas" className="grano bg-noche-800 px-5 py-[clamp(3.5rem,8vw,5.5rem)]">
          <div className="mx-auto max-w-(--container-sitio)">
            <TituloSeccion id="tituloPupusas" titulo="Pupusas con un toque mexicano" />
            <div className="max-w-3xl"><Lista items={toque.map((p) => ({ nombre: p.nombre, precio: p.variantes?.[0]?.precio || '' }))} /></div>
          </div>
        </section>
      )}

      <section id="bebidas" aria-labelledby="tituloBebidas" className="mx-auto max-w-(--container-sitio) px-5 py-[clamp(3.5rem,8vw,5.5rem)]">
        <TituloSeccion id="tituloBebidas" titulo="Bebidas" nota="Para acompañar tu pedido." />
        <div className="grid items-start gap-x-[clamp(2rem,5vw,4rem)] gap-y-8 md:grid-cols-[1.4fr_1fr]">
          <div><h3 className="mb-1 font-ui text-base font-bold tracking-[0.15em] text-lima uppercase">Frías</h3><Lista items={frias} /></div>
          {calientes.length > 0 && <div><h3 className="mb-1 font-ui text-base font-bold tracking-[0.15em] text-lima uppercase">Calientes</h3><Lista items={calientes} /></div>}
        </div>
      </section>
    </Sitio>
  )
}
