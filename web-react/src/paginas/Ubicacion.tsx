/* =====================================================================
   UBICACIÓN — mientras no hay local físico: delivery, horarios, teléfono
   y aviso "Nuevo local muy pronto". Cuando abra el local, cambia el
   aviso por el mapa de Google (Compartir → Insertar un mapa).
   ===================================================================== */
import type { ReactNode } from 'react'
import { ArrowRight, Clock, MapPin, Phone } from 'lucide-react'
import { Sitio } from '@/components/marca/Sitio'
import { PaginaHero } from '@/components/marca/Piezas'
import { TextureButton } from '@/components/ui/texture-button'
import { TextureCard } from '@/components/ui/texture-card'
import { HORARIO_UBICACION, NEGOCIO, PAGINAS } from '@/lib/sitio'
import { IconoWhatsApp } from '@/components/marca/Iconos'

function Dato({ icono, titulo, children }: { icono: ReactNode; titulo: string; children: ReactNode }) {
  return (
    <TextureCard className="transition-transform duration-300 ease-(--ease-marca) hover:-translate-y-0.5">
      <div className="flex items-start gap-4 p-6">
        <span aria-hidden="true" className="grid size-12 shrink-0 place-items-center rounded-full bg-gradient-to-b from-[#e6332c] to-rojo text-white shadow-[0_3px_0_var(--color-rojo-sombra)]">{icono}</span>
        <div>
          <h2 className="mb-1 font-ui text-[1.1rem] font-bold tracking-[0.12em] text-amarillo uppercase">{titulo}</h2>
          <div className="text-[0.95rem] leading-relaxed">{children}</div>
        </div>
      </div>
    </TextureCard>
  )
}

export function Ubicacion() {
  return (
    <Sitio pagina="ubicacion">
      <PaginaHero eyebrow="Nuevo local muy pronto" titulo="Ubicación" />
      <section className="mx-auto grid max-w-(--container-sitio) items-stretch gap-[clamp(1.75rem,5vw,3.5rem)] px-5 py-[clamp(3.5rem,8vw,5.5rem)] md:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col gap-4">
          <Dato icono={<MapPin className="size-6" />} titulo="Dónde estamos">
            <p>Por ahora atendemos solo por <strong className="text-crema">delivery</strong> en Sonsonate.</p>
            <p>Muy pronto abriremos nuestro nuevo local físico; aquí publicaremos la dirección.</p>
          </Dato>
          <Dato icono={<Clock className="size-6" />} titulo="Horarios">
            {HORARIO_UBICACION.map((h) => <p key={h}>{h}</p>)}
          </Dato>
          <Dato icono={<Phone className="size-6" />} titulo="Teléfono">
            <a href={`tel:${NEGOCIO.telefonoIntl}`} className="hover:text-amarillo">+503 {NEGOCIO.telefono}</a>
          </Dato>
          <div className="mt-1">
            <TextureButton asChild variant="rojo" size="lg">
              <a href={`https://wa.me/${NEGOCIO.whatsapp}`} target="_blank" rel="noopener"><IconoWhatsApp className="size-5" /> Escríbenos por WhatsApp</a>
            </TextureButton>
          </div>
        </div>

        <div className="drop-shadow-[0_24px_40px_rgb(0_0_0/0.45)]">
          <div className="semitono relative flex h-full min-h-[22rem] flex-col items-center justify-center gap-4 overflow-hidden rounded-[22px] bg-verde-banda px-[clamp(1.4rem,5vw,2.75rem)] pt-[clamp(5rem,9vw,6rem)] pb-[clamp(2.25rem,6vw,3.5rem)] text-center [background-image:radial-gradient(80%_120%_at_0%_0%,rgb(214_231_166/0.2),transparent_60%),radial-gradient(circle,rgb(255_255_255/0.1)_1px,transparent_1.7px)] [background-size:100%_100%,16px_16px]">
            <span aria-hidden="true" className="papel-picado absolute inset-x-0 top-3.5" />
            <h2 className="font-titulo text-[clamp(2.2rem,5vw,2.9rem)] leading-none text-crema [text-shadow:3px_3px_0_var(--color-noche-700)]">Nuevo local muy pronto</h2>
            <p className="max-w-[38ch] leading-relaxed text-white">Mientras terminamos nuestro nuevo espacio, te llevamos la comida a domicilio en Sonsonate.</p>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <TextureButton asChild variant="rojo"><a href={PAGINAS.pedido}>Pedir delivery <ArrowRight aria-hidden="true" className="size-4" /></a></TextureButton>
              <TextureButton asChild variant="crema"><a href={PAGINAS.inicio + '#canal'}>Avísame cuando abran <ArrowRight aria-hidden="true" className="size-4" /></a></TextureButton>
            </div>
          </div>
        </div>
      </section>
    </Sitio>
  )
}
