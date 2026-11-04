# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Clientes que piden delivery** en Sonsonate y Sonzacate. Llegan desde WhatsApp, el canal o las redes, ven el menú y las promos, arman su pedido y lo mandan por WhatsApp. Lo usan casi siempre desde el celular.
- **El dueño (tío de Leonardo) y su equipo.** Usan las herramientas internas: admin (promos, menú, bebidas, extras, clientes), mesero (POS), cocina (pantalla de pedidos) e historial.
- _Supuesto a confirmar:_ el usuario respondió "los dos"; se tomó como clientes + equipo interno.

## Product Purpose

La web de La Hornilla de Zaid deja ver el menú, las promos del día y pedir comida mexicana a domicilio sin llamar ni explicar el pedido: el pedido llega armado por WhatsApp. Por dentro, ordena la operación del negocio (pedidos, cocina, promos, menú).

Éxito significa:
- Más pedidos armados que llegan por WhatsApp desde la web.
- Más gente en el canal de WhatsApp y clientes fieles (Tarjeta Hornilla).
- Que la web sirva a Leonardo (Black Hole Code) como portafolio para conseguir clientes de diseño web.

## Positioning

- **Hecho a la hornilla:** comida mexicana cocinada al momento, sabor casero.
- **Carnes especiales** que casi nadie ofrece en la zona: birria, cochinita pibil, suadero, además de pastor y pollo pastor.
- **Precios y promos** que cambian seguido (combos, "precios charros").
- **Pedir fácil:** pedido en línea que llega armado por WhatsApp.

## Operating Context

- Hoy atienden **únicamente por delivery en Sonsonate**; abrirán un local físico nuevo (sin dirección aún).
- El envío lo cobran deliverys externos con su propio precio; la web no lo suma al total ("estimado, sin envío").
- Teléfono y WhatsApp de pedidos: 7099-1660. Canal oficial de WhatsApp Business. Redes: Instagram @la_hornilla_de_zaid, TikTok @lahornilladezaid, Facebook.
- El dueño decide precios y promos; Leonardo los convierte en la web, imágenes, videos y textos.

## Capabilities and Constraints

- Menú: tacos (orden de 4), quesadillas (orden de 3), burritos, tortas, nachos, sopa de tortilla (media 16 oz / entera 32 oz), papa asada ("Lo nuevo"). Carnes: pastor, pollo pastor, suadero, cochinita pibil, birria, mixta. Extras: aguacate, queso fundido, piña (solo pastor), jalapeño toreado; bebidas editables.
- Precios reales se editan en el admin (Firebase); el código guarda solo precios de respaldo.
- Pupusas: ya no se hacen; su menú queda oculto pero guardado (interruptor en el admin).
- `SOLO_DELIVERY = true` hasta que abra el local nuevo.
- Despliegue con GitHub Pages; reglas de Firestore se pegan a mano en la consola.
- Sin "club" en la web; en su lugar, invitación al canal de WhatsApp y la Tarjeta Hornilla (sellos con código personal).
- Decisiones abiertas: horario real (hay tres versiones distintas); si el lema "DOS CULTURAS | UN SABOR" sigue teniendo sentido sin pupusas.

## Brand Commitments

- Nombre: La Hornilla de Zaid. Logo oficial (horno verde con borde lima, ventana y cajón amarillos, llama roja, letras blancas): nunca se recrea ni se altera; solo admite sombra suave.
- Voz: cercana, alegre y mexicana, sin groserías ni exageraciones. Ganchos cortos como "¡A LA HORNILLA!" o "¡hasta tu casa!".
- Siempre visibles: "Únicamente delivery en Sonsonate" y 7099-1660.

## Evidence on Hand

- Fotos reales de los platillos en `Imagenes/fotos-de-platillos/` (una carpeta por platillo).
- Reseñas reales de clientes (moderadas en el admin; se aprueban todas las reales, incluso negativas).
- No hay testimonios, cupones, cifras ni premios inventados; no deben fabricarse. No prometer envío gratis ni un precio de envío propio.

## Product Principles

1. Pedir tiene que ser más fácil que llamar: menú claro, precio visible y pedido armado listo para WhatsApp.
2. Honestidad primero: precios, cantidades, fechas y condiciones claros; la foto nunca muestra más de lo que incluye.
3. Lo que decide el dueño (precios, promos, menú) se cambia desde el admin, sin tocar código.
4. Pensado para el celular de alguien con hambre: rápido, legible y con datos móviles.
5. Cada pieza debe poder mostrarse como trabajo profesional de Black Hole Code.

## Accessibility & Inclusion

WCAG AA como mínimo: contraste, navegación con teclado, `aria-*`, áreas táctiles grandes y `prefers-reduced-motion`. Mobile first.
