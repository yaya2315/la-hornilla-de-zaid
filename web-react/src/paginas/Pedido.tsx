/* =====================================================================
   PEDIR EN LÍNEA — arma el pedido y lo manda por WhatsApp.
   Mismas reglas que la web anterior:
   • Carnes por categoría (grupo o aparte), carne fija/elección del admin.
   • Piña solo con carnes "pastor", sin costo extra.
   • Combos del día (con carne si el admin marcó "pideCarne").
   • Pupusas solo si están activas en el admin.
   • SOLO_DELIVERY: por ahora únicamente delivery.
   • El envío NO se suma: el total dice "estimado (sin envío)".
   ===================================================================== */
import { Boton3D } from '@/components/marca/Visor3D'
import type * as React from 'react'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Gift, MapPin, Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { Sitio } from '@/components/marca/Sitio'
import { Precio } from '@/components/marca/Piezas'
import { Boton, DatosEntrega, Hoja, Portadilla, Ticket, TituloSeccion } from '@/components/marca/Hecho'
import { TarjetaPromo } from '@/components/marca/Promo'
import { RollingNumber } from '@/components/ui/rolling-number'
import {
  cargarBebidas, cargarMenu, cargarPromos, cargarPupusas, cargarReglasTarjeta, cargarTarjeta, CODIGO_TARJETA, fotoDe, normalizarCodigo, pupusasActivas, seMuestraHoy,
  type Bebida, type Carta, type DatosTarjeta, type Plato, type Promo, type ReglasTarjeta,
} from '@/lib/datos'
import { dinero, leerPrecio, medir, NEGOCIO, PAGINAS, SOLO_DELIVERY } from '@/lib/sitio'
import { cn } from '@/lib/utils'
import { CARNES, CATEGORIAS_CARNE_APARTE, CATEGORIAS_CARNE_GRUPO, CATEGORIAS_POR_ORDEN, esPromoTacosSueltos, llevaPina, nombreOrden, TACOS_SUELTOS, textoLinea, usarCarrito } from './pedido/carrito'
import { ModalMapa } from './pedido/ModalMapa'

type Agregar = (nombre: string, precio: number, cantidad: number) => void

const control = 'min-h-11 w-full rounded-[8px] border-2 border-crema/20 bg-noche-900 px-3 py-2 text-[0.9rem] text-crema focus:border-amarillo [&>option]:bg-noche-800'
const rotulo = 'font-ui text-[0.72rem] tracking-[0.15em] text-texto-suave uppercase'

/* ── Piezas de control ─────────────────────────────────────────────── */
function Cantidad({ valor, cambiar, nombre }: { valor: number; cambiar: (n: number) => void; nombre: string }) {
  const b = 'grid size-11 place-items-center rounded-full border-2 border-crema/22 text-crema transition-colors hover:border-amarillo hover:text-amarillo'
  return (
    <div className="flex items-center gap-3" role="group" aria-label={`Cantidad de ${nombre}`}>
      <button type="button" className={b} aria-label="Quitar uno" onClick={() => cambiar(Math.max(1, valor - 1))}><Minus aria-hidden="true" className="size-4" /></button>
      <span className="min-w-5 text-center font-ui text-lg font-semibold" aria-live="polite">{valor}</span>
      <button type="button" className={b} aria-label="Agregar uno" onClick={() => cambiar(Math.min(20, valor + 1))}><Plus aria-hidden="true" className="size-4" /></button>
    </div>
  )
}

function ConPina({ marcado, cambiar }: { marcado: boolean; cambiar: (v: boolean) => void }) {
  return (
    <label className="flex min-h-10 w-fit cursor-pointer items-center gap-2 rounded-[10px] border border-dashed border-amarillo/45 bg-amarillo/8 px-3 py-2 text-sm">
      <input type="checkbox" checked={marcado} onChange={(e) => cambiar(e.target.checked)} className="size-[17px] accent-amarillo" /> Con piña
    </label>
  )
}

function BotonAgregar({ onClick, children, completo = true }: { onClick: () => void; children: React.ReactNode; completo?: boolean }) {
  const [listo, setListo] = useState(false)
  return (
    <Boton
      variant={listo ? 'verde' : 'rojo'}
      ancho={completo ? 'completo' : 'auto'}
      onClick={() => { onClick(); setListo(true); setTimeout(() => setListo(false), 900) }}
    >
      <span aria-live="polite">{listo ? '¡Agregado!' : children}</span>
    </Boton>
  )
}

/* ── Tarjeta de platillo ───────────────────────────────────────────── */
function TarjetaPedido({ plato, coleccion, agregar }: { plato: Plato; coleccion: 'menu' | 'pupusas'; agregar: Agregar }) {
  const id = useId()
  /* Sin distinguir mayúsculas: en el admin la categoría es "Sopa de tortilla" */
  const en = (lista: string[]) => lista.some((x) => x.toLowerCase() === String(plato.categoria || '').toLowerCase())
  const tipo = plato.destacado ? 'destacado'
    : en(CATEGORIAS_CARNE_GRUPO) ? 'carne-grupo'
    : en(CATEGORIAS_CARNE_APARTE) ? 'carne-aparte' : 'simple'

  const opciones = useMemo(() => {
    if (tipo === 'destacado') return [{ texto: '', precio: leerPrecio(plato.precioUnico) }]
    const vs = plato.variantes?.length ? plato.variantes : [{ texto: '', precio: '0' }]
    return vs.map((v) => ({ texto: v.texto, precio: leerPrecio(v.precio) }))
  }, [plato, tipo])
  const pideCarne = tipo === 'carne-aparte' || ((tipo === 'destacado' || tipo === 'simple') && plato.carneModo === 'eleccion')
  const carneFija = (tipo === 'destacado' || tipo === 'simple') && plato.carneModo === 'fija' ? plato.carneFija || '' : ''

  const [idx, setIdx] = useState(0)
  const [carne, setCarne] = useState(CARNES[0])
  const [pina, setPina] = useState(false)
  const [cant, setCant] = useState(1)

  const opcion = opciones[idx]
  const carneActual = pideCarne ? carne : tipo === 'carne-grupo' ? opcion.texto : carneFija
  const puedePina = llevaPina(carneActual)
  const nombreVisible = coleccion === 'pupusas' ? `Pupusa de ${plato.nombre}` : plato.nombre

  const nombreLinea = () => {
    const p = puedePina && pina ? ' con piña' : ''
    if (coleccion === 'pupusas') return `Pupusa de ${plato.nombre}`
    if (tipo === 'carne-grupo' && en(CATEGORIAS_POR_ORDEN)) return nombreOrden(plato.nombre, carneActual, p)
    if (tipo === 'carne-grupo') return `${plato.nombre} de ${carneActual}${p}`
    if (tipo === 'carne-aparte') return `${plato.nombre} — ${opcion.texto} — de ${carneActual}${p}`
    if (carneActual) return `${plato.nombre} de ${carneActual}${p}`
    return opcion.texto ? `${plato.nombre} — ${opcion.texto}` : plato.nombre
  }

  const foto = coleccion === 'menu' ? fotoDe(plato) : ''
  return (
    <Hoja as="article" className="flex flex-col overflow-hidden">
      {foto && (
        <div className="relative aspect-[16/9] bg-noche-800">
          <img src={foto} alt="" width={720} height={405} loading="lazy" decoding="async" className="size-full object-cover" />
          <Boton3D plato={plato} className="absolute right-3 bottom-5 z-[2]" />
          {plato.destacado && <span className="esquina-doblada absolute top-3 left-3 bg-rojo shadow-[3px_3px_0_var(--color-rojo-sombra)] px-3 py-1.5 font-ui text-[0.7rem] font-bold tracking-[0.2em] text-white uppercase">{plato.etiqueta || 'Destacado'}</span>}
          <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-3.5 bg-noche-600 [mask:var(--rasgado-b)_0_0/260px_100%_repeat-x] [-webkit-mask:var(--rasgado-b)_0_0/260px_100%_repeat-x]" />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-baseline justify-between gap-2.5">
          <h3 className="font-ui text-[1.2rem] font-bold tracking-wider text-crema uppercase">{nombreVisible}</h3>
          {plato.nota && <span className="text-[0.8rem] font-semibold whitespace-nowrap text-lima italic">{plato.nota}</span>}
        </div>
        {plato.descripcion && <p className="-mt-1.5 text-[0.85rem] leading-normal text-texto-suave">{plato.descripcion}</p>}
        {carneFija && <p className="-mt-1.5 text-[0.85rem] text-texto-suave">Carne: <strong className="text-crema">{carneFija}</strong></p>}
        <div className="mt-auto grid gap-2.5">
          {opciones.length > 1 && (
            <div className="grid gap-1.5">
              <label htmlFor={`${id}-o`} className={rotulo}>{tipo === 'carne-aparte' ? 'Tamaño' : tipo === 'carne-grupo' ? 'Carnes' : 'Opción'}</label>
              <select id={`${id}-o`} className={control} value={idx} onChange={(e) => { setIdx(+e.target.value); setPina(false) }}>
                {opciones.map((o, i) => <option key={i} value={i}>{o.texto} — {dinero(o.precio)}</option>)}
              </select>
            </div>
          )}
          {pideCarne && (
            <div className="grid gap-1.5">
              <label htmlFor={`${id}-c`} className={rotulo}>Carne</label>
              <select id={`${id}-c`} className={control} value={carne} onChange={(e) => { setCarne(e.target.value); setPina(false) }}>
                {CARNES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          )}
          {puedePina && coleccion === 'menu' && <ConPina marcado={pina} cambiar={setPina} />}
          <Cantidad valor={cant} cambiar={setCant} nombre={nombreVisible} />
          <BotonAgregar onClick={() => { agregar(nombreLinea(), opcion.precio, cant); setCant(1) }}>
            Agregar <span className="font-precio font-normal tracking-normal normal-case">{dinero(opcion.precio)}</span>
          </BotonAgregar>
        </div>
      </div>
    </Hoja>
  )
}

function PromoPedido({ promo, agregar }: { promo: Promo; agregar: Agregar }) {
  const id = useId()
  const precio = leerPrecio(promo.precio)
  const [carne, setCarne] = useState(CARNES[0])
  const [pina, setPina] = useState(false)
  const [cant, setCant] = useState(1)
  const sueltos = esPromoTacosSueltos(promo.nombre, precio)
  const nombre = () => sueltos ? TACOS_SUELTOS : (promo.pideCarne && carne ? `${promo.nombre} — de ${carne}${llevaPina(carne) && pina ? ' con piña' : ''}` : promo.nombre)
  return (
    <TarjetaPromo promo={promo}>
      <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
        {promo.pideCarne && (
          <div className="grid w-full max-w-56 gap-1.5">
            <label htmlFor={`${id}-c`} className={cn(rotulo, 'text-crema')}>Carne</label>
            <select id={`${id}-c`} className={control} value={carne} onChange={(e) => { setCarne(e.target.value); setPina(false) }}>
              {CARNES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        )}
        {promo.pideCarne && llevaPina(carne) && <ConPina marcado={pina} cambiar={setPina} />}
        <Cantidad valor={cant} cambiar={setCant} nombre={promo.nombre} />
        <BotonAgregar completo={false} onClick={() => { agregar(nombre(), precio, cant); setCant(1) }}>
          Agregar al pedido <span className="font-precio font-normal tracking-normal normal-case">{dinero(precio)}</span>
        </BotonAgregar>
      </div>
    </TarjetaPromo>
  )
}

function TarjetaBebida({ bebida, agregar }: { bebida: Bebida; agregar: Agregar }) {
  const [cant, setCant] = useState(1)
  const precio = leerPrecio(bebida.precio)
  return (
    <Hoja as="article" className="flex flex-col overflow-hidden">
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-ui text-[1.05rem] font-bold tracking-wider text-crema uppercase">{bebida.nombre}</h3>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
          <Precio valor={dinero(precio)} className="text-[1.25rem]" />
          <Cantidad valor={cant} cambiar={setCant} nombre={bebida.nombre} />
        </div>
        <BotonAgregar onClick={() => { agregar(bebida.nombre, precio, cant); setCant(1) }}>Agregar</BotonAgregar>
      </div>
    </Hoja>
  )
}

function Seccion({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="mb-[clamp(2.5rem,6vw,4rem)]" aria-label={titulo}>
      <h2 className="mb-5 border-b border-dashed border-crema/25 pb-3.5 font-titulo text-[clamp(2.1rem,5vw,2.8rem)] leading-none text-crema [text-shadow:3px_3px_0_var(--color-rojo)]">{titulo}</h2>
      {children}
    </section>
  )
}
const Rejilla = ({ children }: { children: React.ReactNode }) => (
  <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(min(100%,250px),1fr))]">{children}</div>
)

/* ── Página ────────────────────────────────────────────────────────── */
export function Pedido() {
  const carrito = usarCarrito()
  const [carta, setCarta] = useState<Carta | null>(null)
  const [pupusas, setPupusas] = useState<Carta | null>(null)
  const [promos, setPromos] = useState<Promo[]>([])
  const [bebidas, setBebidas] = useState<Bebida[]>([])
  const [paso2, setPaso2] = useState(false)
  const [tipo, setTipo] = useState<'' | 'local' | 'delivery' | 'recoger'>(SOLO_DELIVERY ? 'delivery' : '')
  const [nombre, setNombre] = useState('')
  const [direccion, setDireccion] = useState('')
  const [enlace, setEnlace] = useState('')
  const [pin, setPin] = useState<{ lat: number; lng: number } | null>(null)
  const [mapa, setMapa] = useState(false)
  /* Tarjeta Hornilla (opcional): código del cliente. Solo identifica la tarjeta;
     el sello y el premio los confirma el negocio por WhatsApp. */
  const [reglasTarjeta, setReglasTarjeta] = useState<ReglasTarjeta | null>(null)
  const [codigoTarjeta, setCodigoTarjeta] = useState('')
  const [tarjeta, setTarjeta] = useState<DatosTarjeta | null | 'no-existe' | 'error'>(null)
  const [canjear, setCanjear] = useState(false)
  const entrega = useRef<HTMLElement>(null)
  const carritoRef = useRef<HTMLElement>(null)

  useEffect(() => {
    cargarMenu().then(setCarta)
    cargarPromos().then((l) => setPromos(l.filter((p) => seMuestraHoy(p))))
    cargarBebidas().then(setBebidas)
    pupusasActivas().then((on) => { if (on) cargarPupusas().then(setPupusas) })
    cargarReglasTarjeta().then((r) => setReglasTarjeta(r?.activo ? r : null))
  }, [])

  /* Busca la tarjeta en cuanto el código está completo */
  const codigoNorm = normalizarCodigo(codigoTarjeta)
  useEffect(() => {
    setCanjear(false)
    if (!CODIGO_TARJETA.test(codigoNorm)) { setTarjeta(null); return }
    let vigente = true
    cargarTarjeta(codigoNorm)
      .then((t) => { if (vigente) setTarjeta(t ?? 'no-existe') })
      .catch(() => { if (vigente) setTarjeta('error') })
    return () => { vigente = false }
  }, [codigoNorm])
  const tarjetaValida = tarjeta && typeof tarjeta === 'object' ? tarjeta : null

  const esLocal = tipo === 'local'
  const servicio = esLocal ? carrito.subtotal * 0.05 : 0
  const total = carrito.subtotal + servicio
  const listo = carrito.lineas.length > 0 && !!tipo && !!nombre.trim() && (tipo !== 'delivery' || !!direccion.trim())

  const enlaceMaps = () => {
    if (pin) return `https://www.google.com/maps?q=${pin.lat},${pin.lng}`
    if (enlace.trim()) return enlace.trim()
    if (direccion.trim()) return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion.trim())}`
    return null
  }
  const ETIQUETAS = { local: 'Comer en el local', delivery: 'Delivery', recoger: 'Para llevar (pasa a recogerlo)' }

  const enviar = () => {
    const partes = [
      '¡Hola! Mucho gusto, este sería mi pedido:', '',
      ...carrito.lineas.map((l) => `${textoLinea(l.cantidad, l.nombre)} — ${dinero(l.precioUnitario * l.cantidad)}`), '',
      `Subtotal: ${dinero(carrito.subtotal)}`,
    ]
    if (esLocal) partes.push(`Servicio en el local (5%): +${dinero(servicio)}`)
    partes.push(`Total estimado: ${dinero(total)}${tipo === 'delivery' ? ' (sin envío)' : ''}`, '', `Tipo de pedido: ${tipo ? ETIQUETAS[tipo] : ''}`)
    if (tipo === 'delivery') {
      partes.push(`Dirección: ${direccion.trim()}`)
      const m = enlaceMaps()
      if (m) partes.push(`Ubicación: ${m}`)
    }
    if (reglasTarjeta && tarjetaValida) {
      partes.push('', `Tarjeta Hornilla: ${tarjetaValida.codigo}`)
      if (canjear && tarjetaValida.premios > 0) partes.push('Quiero canjear mi premio en este pedido.')
    }
    partes.push('', `Mi nombre es ${nombre.trim()}.`)
    medir('pedido_whatsapp', { tipo_entrega: tipo, value: Number(total.toFixed(2)), currency: 'USD' })
    window.open(`https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(partes.join('\n'))}`, '_blank', 'noopener')
  }

  const continuar = () => {
    setPaso2(true)
    setTimeout(() => entrega.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
  }

  const campo = 'min-h-12 w-full rounded-[8px] border-2 border-crema/22 bg-noche-900 px-4 py-3 text-base text-crema placeholder:text-texto-suave/80 focus:border-amarillo'
  const etiqueta = 'font-ui text-[0.8rem] font-medium tracking-[0.12em] text-texto-suave uppercase'

  return (
    <Sitio pagina="pedido">
      <Portadilla lema="Pide en línea" titulo={<>Arma tu <span className="text-amarillo [text-shadow:4px_4px_0_var(--color-rojo-sombra)]">pedido</span></>}>
        <ol className="mt-5 grid gap-2.5 text-[1rem]">
          {['Escoge tus platillos y tu carne', 'Revisa tu pedido con el total', 'Mándalo por WhatsApp y nosotros lo confirmamos'].map((t, i) => (
            <li key={t} className="flex items-center gap-3.5"><span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full bg-crema font-precio text-base text-rojo">{i + 1}</span>{t}</li>
          ))}
        </ol>
        <DatosEntrega className="mt-6" />
      </Portadilla>

      {/* Las promos salen junto con el menú (no antes): así nada brinca hacia abajo al cargar */}
      {carta && promos.length > 0 && (
        <div aria-label="Promociones del día" className="mx-auto mt-[clamp(1.75rem,4vw,2.75rem)] flex max-w-(--container-sitio) flex-col gap-6 px-5">
          {promos.map((p, i) => <PromoPedido key={p.nombre + i} promo={p} agregar={carrito.agregar} />)}
        </div>
      )}

      {/* Mientras carga, solo el aviso; la rejilla aparece completa de una vez (sin saltos de diseño) */}
      {!carta && <p role="status" className="min-h-[100svh] py-14 text-center text-texto-suave">Cargando el menú…</p>}
      {carta && (
      <div className="mx-auto grid max-w-(--container-sitio) items-start gap-[clamp(1.5rem,4vw,2.5rem)] px-5 pt-[clamp(2.5rem,6vw,4rem)] lg:grid-cols-[1fr_340px]">
        <div>
          {carta && (
            <Seccion titulo="Platillos">
              <Rejilla>
                {carta.categorias.flatMap((cat) => carta.platos.filter((p) => p.categoria === cat)).map((p, i) => (
                  <TarjetaPedido key={p.id || p.nombre + i} plato={p} coleccion="menu" agregar={carrito.agregar} />
                ))}
              </Rejilla>
            </Seccion>
          )}
          {pupusas && (
            <Seccion titulo="Pupusas">
              {pupusas.categorias.map((cat) => {
                const platos = pupusas.platos.filter((p) => p.categoria === cat)
                if (!platos.length) return null
                return (
                  <div key={cat} className="mb-6">
                    <p className="mt-2 mb-3.5 font-ui text-sm font-bold tracking-[0.15em] text-lima uppercase">{cat}</p>
                    <Rejilla>{platos.map((p, i) => <TarjetaPedido key={p.id || p.nombre + i} plato={p} coleccion="pupusas" agregar={carrito.agregar} />)}</Rejilla>
                  </div>
                )
              })}
            </Seccion>
          )}
          {carta && bebidas.length > 0 && <Seccion titulo="Bebidas"><Rejilla>{bebidas.map((b, i) => <TarjetaBebida key={b.nombre + i} bebida={b} agregar={carrito.agregar} />)}</Rejilla></Seccion>}
        </div>

        {/* ── Carrito ── */}
        <aside ref={carritoRef} id="tuPedido" aria-label="Tu pedido" className="scroll-mt-28 lg:sticky lg:top-28">
          <Ticket>
            <div className="flex flex-col gap-4">
              <div className="border-b-2 border-dashed border-tinta pb-3 text-center">
                <h2 className="font-titulo text-[1.9rem] leading-none">Tu pedido</h2>
                <p className="mt-1 font-ui text-[0.72rem] font-semibold tracking-[0.2em] uppercase">La Hornilla de Zaid · Delivery</p>
              </div>
              <ul aria-live="polite" className="grid gap-2.5">
                <AnimatePresence initial={false}>
                  {carrito.lineas.map((l) => (
                    <motion.li
                      key={l.id}
                      layout
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="grid grid-cols-[1fr_auto_auto] items-start gap-2.5 border-b border-dashed border-tinta/30 pb-2.5 font-ui text-[0.92rem]"
                    >
                      <span className="leading-snug"><b className="mr-1 text-rojo">{l.cantidad}×</b>{l.nombre}</span>
                      <span className="whitespace-nowrap font-semibold">{dinero(l.precioUnitario * l.cantidad)}</span>
                      <button type="button" onClick={() => carrito.quitar(l.id)} aria-label={`Quitar ${l.nombre}`} className="-mt-1.5 grid size-9 place-items-center rounded-full text-tinta/70 hover:bg-rojo hover:text-white">
                        <X aria-hidden="true" className="size-3.5" />
                      </button>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
              {carrito.lineas.length === 0 && <p className="py-3 text-center text-sm text-tinta/70">Aún no has agregado nada.</p>}
              <div className="flex items-baseline justify-between border-t-2 border-dashed border-tinta pt-3 font-ui">
                <span className="text-sm font-bold tracking-[0.15em] uppercase">Subtotal</span>
                <span className="font-precio text-[1.7rem] text-rojo"><RollingNumber value={carrito.subtotal} precision={2} format={dinero} /></span>
              </div>
              {carrito.lineas.length > 0 && <button type="button" onClick={carrito.vaciar} className="-mt-2 min-h-10 self-end px-1 text-sm text-tinta/70 underline underline-offset-4 hover:text-rojo">Vaciar pedido</button>}
              <Boton variant="rojo" size="lg" ancho="completo" disabled={!carrito.lineas.length} onClick={continuar}>
                Continuar <ArrowRight aria-hidden="true" className="size-4" />
              </Boton>
            </div>
          </Ticket>
        </aside>
      </div>
      )}

      {/* Barra del pedido en celular: siempre a la mano */}
      <AnimatePresence>
        {carrito.lineas.length > 0 && !paso2 && (
          <motion.div
            initial={{ y: 90 }} animate={{ y: 0 }} exit={{ y: 90 }}
            className="fixed inset-x-3 bottom-3 z-[900] lg:hidden"
          >
            <a href="#tuPedido" className="flex min-h-14 items-center justify-between gap-3 rounded-[10px] border-2 border-crema/25 bg-noche-900 px-4 py-2.5 shadow-[0_5px_0_var(--color-noche-950)]">
              <span className="flex items-center gap-2.5 font-ui text-sm font-semibold tracking-[0.12em] text-crema uppercase">
                <span className="grid size-9 place-items-center rounded-full bg-rojo text-white shadow-[0_2px_0_var(--color-rojo-sombra)]"><ShoppingBag aria-hidden="true" className="size-4" /></span>
                Ver mi pedido · {carrito.piezas}
              </span>
              <span className="font-precio text-xl text-amarillo"><RollingNumber value={carrito.subtotal} precision={2} format={dinero} /></span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Paso 2: entrega ── */}
      {paso2 && (
        <section ref={entrega} aria-labelledby="tituloEntrega" className="mx-auto max-w-3xl scroll-mt-24 px-5 py-[clamp(3.5rem,8vw,5.5rem)]">
          <TituloSeccion id="tituloEntrega" titulo="¿A dónde te lo llevamos?" />
          {SOLO_DELIVERY && (
            <p className="mb-6 max-w-xl rounded-[8px] border-2 border-dashed border-crema/25 px-5 py-3.5 text-[0.92rem]">
              Por ahora atendemos solo por <strong>delivery</strong>. Muy pronto abriremos nuestro local físico.
            </p>
          )}
          <div role="radiogroup" aria-label="Tipo de entrega" className={cn('mb-7 grid gap-3.5', SOLO_DELIVERY ? 'max-w-xs' : 'sm:grid-cols-3')}>
            {(SOLO_DELIVERY ? (['delivery'] as const) : (['local', 'delivery', 'recoger'] as const)).map((t) => (
              <label key={t} className="cursor-pointer">
                <input type="radio" name="tipoEntrega" value={t} checked={tipo === t} onChange={() => setTipo(t)} className="peer sr-only" />
                <span className="flex flex-col items-center gap-1 rounded-[8px] border-2 border-crema/18 bg-noche-600 px-3.5 py-5 text-center shadow-[4px_4px_0_var(--color-noche-950)] transition-colors peer-checked:border-amarillo peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-amarillo">
                  <strong className="font-ui text-[1.05rem] tracking-wider text-crema uppercase">{{ local: 'Comer en el local', delivery: 'Delivery', recoger: 'Para llevar' }[t]}</strong>
                  <small className="text-xs text-texto-suave">{{ local: '+5% de servicio', delivery: 'Te lo llevamos', recoger: 'Pasas a recogerlo' }[t]}</small>
                </span>
              </label>
            ))}
          </div>

          <div className="mb-7 grid gap-4">
            <div className="grid gap-1.5">
              <label htmlFor="clienteNombre" className={etiqueta}>Tu nombre</label>
              <input id="clienteNombre" className={campo} placeholder="¿Cómo te llamas?" autoComplete="name" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>
            {reglasTarjeta && (
              <div className="grid gap-1.5">
                <label htmlFor="codigoTarjeta" className={etiqueta}>Código de tu Tarjeta Hornilla (opcional)</label>
                <input
                  id="codigoTarjeta" className={cn(campo, 'uppercase')} placeholder="HZ-K7M4QX" autoComplete="off" autoCapitalize="characters"
                  spellCheck={false} maxLength={12} value={codigoTarjeta} onChange={(e) => setCodigoTarjeta(e.target.value)} aria-describedby="ayudaTarjeta"
                />
                <p id="ayudaTarjeta" role="status" className="text-sm text-texto-suave">
                  {tarjetaValida
                    ? <>Hola <strong className="text-crema">{tarjetaValida.nombre}</strong>: llevas <strong className="text-crema">{tarjetaValida.sellos} de {reglasTarjeta.meta}</strong> sellos. El sello se suma cuando te entregamos el pedido.</>
                    : tarjeta === 'no-existe' ? 'No encontramos ese código. Revisa que esté bien escrito.'
                    : tarjeta === 'error' ? 'No pudimos revisar tu tarjeta ahora; igual puedes enviar tu pedido.'
                    : <>Si ya tienes tarjeta, escribe tu código. ¿Aún no la tienes? <a className="underline underline-offset-2 hover:text-amarillo" href={PAGINAS.tarjeta}>Cómo pedirla</a>.</>}
                </p>
                {tarjetaValida && tarjetaValida.premios > 0 && (
                  <label className="mt-1 flex cursor-pointer items-start gap-3 rounded-[8px] border-2 border-lima/50 bg-lima/10 px-4 py-3 text-[0.92rem]">
                    <input type="checkbox" checked={canjear} onChange={(e) => setCanjear(e.target.checked)} className="mt-1 size-5 shrink-0 accent-[var(--color-lima)]" />
                    <span><Gift aria-hidden="true" className="mr-1.5 inline size-4 text-lima" />Quiero canjear mi premio en este pedido{reglasTarjeta.premio ? <> (<strong className="text-crema">{reglasTarjeta.premio}</strong>)</> : null}. Lo confirmamos por WhatsApp antes de aplicarlo.</span>
                  </label>
                )}
              </div>
            )}
            {tipo === 'delivery' && (
              <div className="grid gap-1.5">
                <label htmlFor="clienteDireccion" className={etiqueta}>Dirección de entrega</label>
                <input id="clienteDireccion" className={campo} placeholder="Dirección completa y alguna referencia" autoComplete="street-address" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                <div className="mt-1.5 flex flex-wrap items-center gap-3">
                  <Boton variant="crema" size="sm" onClick={() => setMapa(true)}><MapPin aria-hidden="true" className="size-4" /> Marcar en el mapa</Boton>
                  {pin && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-lima/45 bg-lima/12 py-1.5 pr-1.5 pl-3.5 text-sm font-semibold text-lima">
                      Pin marcado
                      <button type="button" onClick={() => setPin(null)} aria-label="Quitar pin" className="grid size-8 place-items-center rounded-full bg-crema/12"><X aria-hidden="true" className="size-3.5" /></button>
                    </span>
                  )}
                </div>
                <label htmlFor="enlaceMaps" className={cn(etiqueta, 'mt-3')}>Enlace de Google Maps (opcional)</label>
                <input id="enlaceMaps" type="url" className={campo} placeholder="Busca el lugar en Google Maps, comparte y pega aquí el enlace" value={enlace} onChange={(e) => setEnlace(e.target.value)} />
              </div>
            )}
          </div>

          <Ticket className="mb-7 max-w-xl">
            <div className="border-b-2 border-dashed border-tinta pb-3 text-center">
              <p className="font-titulo text-[1.7rem] leading-none">La Hornilla de Zaid</p>
              <p className="mt-1 font-ui text-[0.72rem] font-semibold tracking-[0.2em] uppercase">Pedido · {tipo ? ETIQUETAS[tipo] : 'Delivery'}</p>
            </div>
            <ul className="grid gap-2 border-b-2 border-dashed border-tinta py-3.5 font-ui">
              {carrito.lineas.map((l) => (
                <li key={l.id} className="flex justify-between gap-3 text-[0.95rem]"><span>{l.cantidad}× {l.nombre}</span><span className="whitespace-nowrap">{dinero(l.precioUnitario * l.cantidad)}</span></li>
              ))}
            </ul>
            <div className="grid gap-2 pt-3.5 font-ui text-[0.95rem]">
              <div className="flex justify-between"><span>Subtotal</span><span>{dinero(carrito.subtotal)}</span></div>
              {esLocal && <div className="flex justify-between"><span>Servicio en el local (5%)</span><span>+{dinero(servicio)}</span></div>}
              <div className="flex items-baseline justify-between border-t-2 border-dashed border-tinta pt-2.5">
                <span className="font-bold tracking-wider uppercase">Total estimado{tipo === 'delivery' && <small className="ml-1 font-sans font-normal tracking-normal normal-case text-tinta/70">(sin envío)</small>}</span>
                <span className="font-precio text-[1.9rem] text-rojo"><RollingNumber value={total} precision={2} format={dinero} /></span>
              </div>
            </div>
          </Ticket>

          <Boton variant="rojo" size="lg" className="w-full max-w-xl" disabled={!listo} onClick={enviar}>
            Enviar pedido por WhatsApp <ArrowRight aria-hidden="true" className="size-4" />
          </Boton>
          <p className="mt-4 max-w-xl text-sm text-texto-suave">Este es un pedido estimado; nosotros lo confirmamos por WhatsApp.</p>
        </section>
      )}

      <ModalMapa abierto={mapa} inicial={pin} alCerrar={() => setMapa(false)} alConfirmar={(p) => { setPin(p); setMapa(false) }} />
    </Sitio>
  )
}
