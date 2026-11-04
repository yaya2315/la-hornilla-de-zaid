/* =====================================================================
   UBICACIÓN (estilo v2) — mientras no hay local físico: delivery,
   horarios, teléfono y aviso "Nuevo local muy pronto". Cuando abra el
   local, cambia el aviso por el mapa de Google (Compartir → Insertar).
   ===================================================================== */
import { ArrowRight } from 'lucide-react'
import { Sitio } from '@/components/marca/Sitio'
import { Boton, DatosEntrega, Portadilla, TituloSeccion } from '@/components/marca/Hecho'
import { IconoWhatsApp } from '@/components/marca/Iconos'
import { HORARIO_UBICACION, NEGOCIO, PAGINAS } from '@/lib/sitio'

export function Ubicacion() {
  return (
    <Sitio pagina="ubicacion">
      <Portadilla
        lema="Sonsonate, El Salvador"
        titulo={<>Ubicación</>}
        banda={<span>Por ahora: <b className="text-amarillo">solo delivery</b> en Sonsonate</span>}
      >
        <p className="mt-4 max-w-[44ch] text-[1.02rem] text-texto-suave">
          Por ahora atendemos solo por <strong className="text-crema">delivery</strong>. Muy pronto abriremos nuestro nuevo local físico y aquí publicaremos la dirección.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Boton asChild variant="rojo" size="lg">
            <a href={`https://wa.me/${NEGOCIO.whatsapp}`} target="_blank" rel="noopener"><IconoWhatsApp className="size-5" /> Escríbenos por WhatsApp</a>
          </Boton>
          <Boton asChild variant="linea"><a href={PAGINAS.pedido}>Pedir delivery <ArrowRight aria-hidden="true" className="size-4" /></a></Boton>
        </div>
        <DatosEntrega className="mt-6" />
      </Portadilla>

      <section className="mx-auto grid max-w-(--container-sitio) items-start gap-[clamp(2.5rem,6vw,4.5rem)] px-5 py-[clamp(3.5rem,8vw,5.5rem)] md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <TituloSeccion titulo="Horarios" />
          <ul>
            {HORARIO_UBICACION.map((h) => {
              const [dia, horas] = h.split(' · ')
              return (
                <li key={h} className="grid gap-1 border-b-2 border-dashed border-crema/20 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <span className="font-ui text-[1.05rem] font-bold tracking-[0.08em] text-amarillo uppercase">{dia}</span>
                  <span className="text-[1rem] text-crema">{horas}</span>
                </li>
              )
            })}
          </ul>
          <p className="mt-6 text-[0.95rem] text-texto-suave">
            Teléfono y WhatsApp: <a href={`tel:${NEGOCIO.telefonoIntl}`} className="font-ui font-bold tracking-wider text-crema underline decoration-lima decoration-2 underline-offset-4 hover:text-amarillo">+503 {NEGOCIO.telefono}</a>
          </p>
        </div>

        {/* Cartel verde con esquina doblada (como los avisos de los flyers) */}
        <div className="drop-shadow-[6px_6px_0_var(--color-noche-950)] md:mt-3">
          <div className="semitono relative bg-verde-banda px-[clamp(1.4rem,5vw,2.5rem)] pt-[4.75rem] pb-[clamp(2rem,6vw,2.75rem)] [clip-path:polygon(0_0,calc(100%-28px)_0,100%_28px,100%_100%,0_100%)]">
            <span aria-hidden="true" className="absolute top-0 right-0 size-[28px] bg-verde-oscuro [clip-path:polygon(0_0,100%_100%,0_100%)]" />
            <span aria-hidden="true" className="papel-picado absolute inset-x-0 top-3.5" />
            <p className="font-ui text-[0.78rem] font-bold uppercase tracking-[0.2em] text-amarillo">Aviso</p>
            <h2 className="mt-2 font-titulo text-[clamp(2.3rem,7vw,3rem)] leading-[0.95] text-crema [text-shadow:3px_3px_0_var(--color-verde-oscuro)]">Nuevo local muy pronto</h2>
            <p className="mt-3 max-w-[36ch] text-white">Mientras terminamos nuestro nuevo espacio, te llevamos la comida a domicilio en Sonsonate.</p>
            <Boton asChild variant="crema" className="mt-6">
              <a href={PAGINAS.inicio + '#canal'}>Avísame cuando abran <ArrowRight aria-hidden="true" className="size-4" /></a>
            </Boton>
          </div>
        </div>
      </section>
    </Sitio>
  )
}
