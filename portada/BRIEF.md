# BRIEF · La Hornilla de Zaid · Inicio inmersivo

**Autoría propia bajo delegación creativa.** Leonardo pidió que yo escriba el brief con los datos de su encargo y que solo le pregunte lo que no pueda decidir con sensatez. Las frases entre comillas son suyas. Lo demás son decisiones mías, marcadas como tales.

## Los 8 temas

1. **Vibra (decidida):** mexicano de verdad, cálido, antojable, de mercado y no de lujo. Referencias: el rótulo pintado a mano de una taquería, una comanda de papel recién impresa y el vapor de un comal a las 7 de la noche.
2. **Recorrido (decidido, a partir de su objetivo):** antojo, luego tranquilidad (llega a tu casa), el platillo completo, todo el menú, gente real y tu pedido listo para mandar.
3. **Curva de energía (decidida):** arranque intenso (foto a pantalla completa), luego calma (datos de delivery), el pico (el platillo que gira), elección viva (menú), calma social (reseñas) y un cierre firme.
4. **Sensación y único momento:** ver abajo.
5. **Algo que ningún otro sitio haga (decidido):** el pedido se arma solo mientras bajas por el menú y sale como ticket de la hornilla, listo para WhatsApp.
6. **Rango estético (decidido):** maximalista contenido. Abundante y con textura (papel rasgado, papel picado, etiquetas rojas) pero con pocos elementos por pantalla. Nada caricaturesco.
7. **Un mundo continuo o escenas:** escenas distintas. Es una galería, no un viaje.
8. **Assets:** solo fotos reales de platillos (Imagenes/fotos-de-platillos) y piezas de marca. "No generes imágenes con IA." Sin clave de kie.ai. Los modelos 3D dependen de que Leonardo grabe cada plato (ver PLAN-3D).

## Para quién y qué hace el visitante
- Gente de Sonsonate y Sonzacate con hambre, casi siempre en el celular.
- Al final debe creer: **"me llega caliente a mi casa y ya sé exactamente qué pedir"**.
- Acción única, con la misma etiqueta en toda la página: **Pedir por WhatsApp**. El enlace a Pedir queda como texto secundario: "o arma tu pedido completo".

## Recorrido (6 beats)
1. Reconocimiento: la orden de tacos a pantalla completa, con vapor.
2. Tranquilidad: solo delivery, zonas, $1 de envío en Sonsonate centro y Sonzacate, horario.
3. Asombro (pico): un platillo que gira completo bajo tu mano.
4. Elección: el menú pasa de lado como colección, con etiquetas de hechos.
5. Confianza: reseñas reales y el canal de WhatsApp.
6. Decisión: el ticket con lo que elegiste, el total (sin envío) y "Pedir por WhatsApp".

## Curva de sensaciones (antes de los actos)
```
1  Antojo        la orden real a pantalla completa, el vapor sube en un plano propio y el título queda entre la foto y el vapor
2  Tranquilidad  texto calmado sobre papel verde: dónde llegamos, cuánto cuesta el envío y a qué hora. Es el silencio antes del pico
3  Asombro       todo se detiene y el platillo gira completo mientras bajas (3D real o giro de 360° con fotos reales)
4  Control       los platillos pasan de lado con su etiqueta; tocas "Lo quiero" y el ticket de abajo crece
5  Confianza     reseñas reales que se revelan una por una y la invitación al canal de WhatsApp
6  Decisión      el ticket sube al centro con tu pedido y un solo botón
```

**El pico (acto 3):** "Bajé y la orden de tacos giró completa frente a mí, se veía cada taco."
**Frase para contar:** "Es el sitio donde vas armando tu pedido mientras bajas y al final te sale el ticket listo para mandar por WhatsApp."
**Silencio autorado:** el acto 2 es tranquilo a propósito, para que el pico tenga de dónde arrancar.

## Gramática: Galería / catálogo
- **Por qué:** el visitante de un restaurante solo de delivery no necesita que lo convenzan. Pregunta "¿qué hay y cuánto cuesta?". Eso es una colección.
- **Por qué no las otras:**
  - One-shot fílmico: es un argumento lineal y aquí no hay argumento.
  - Editorial: es lectura larga.
  - Superficie viva: no es software.
  - Mundo continuo: no hay geografía que recorrer.
  - Póster tipográfico: la comida es la imagen.
  - Escenario dividido: no hay dos lados que comparar.
  - Corte rítmico: el antojo pide pausa, no prisa.
- **Navegación:** índice de platillos que salta (Tacos · Burrito · Tortas · Quesadillas · Nachos · Sopa · Papa asada). El logo oficial va en la esquina.
- **Héroe:** el objeto uno (tacos) ya a la vista, con capas.
- **Cierre:** el ticket compuesto como una etiqueta más de la colección.
- **Se apoya en:** pan como columna vertebral, reveal por objeto y conteo solo con datos reales.
- **Prohíbe:** titulares cinéticos, spotlight, magnet y más de un scrub. Las etiquetas dicen hechos, no frases de venta.

## Interacción firma: "el ticket que sale de la hornilla"
- Una tira de ticket de papel fija abajo, con el borde dentado.
- Cada platillo del menú tiene "Lo quiero" (carne y cantidad). Al tocarlo, el ticket imprime una línea con el precio real y crece un poco hacia arriba, como si saliera de la ranura del horno.
- Al llegar al cierre, el ticket sube al centro con todo lo elegido y el total "(sin envío)".
- **Es útil, no decorativo:** usa el mismo carrito que la página Pedir (sessionStorage `hornilla_carrito`, mismo formato `Linea`). Si el visitante va a Pedir, su selección ya está ahí. "Pedir por WhatsApp" manda el mismo mensaje que arma Pedir hoy ("1 Orden de tacos de birria", "tacos mixtos").
- **Con movimiento reducido:** el ticket se actualiza sin animación.

## Tabla de actos
| Beat | Dispositivo | Por qué |
|---|---|---|
| Antojo | parallax por capas + vapor | La profundidad real (foto, vapor y primer plano) es la entrada más fuerte sin video |
| Tranquilidad | flow + in | Datos administrativos: van rápido y sin pin |
| Asombro | pin + giro propio (`--sc-p`) | Es el pico: el tramo más largo y todo quieto excepto el plato |
| Elección | pan | Lo lateral se lee como "opciones" |
| Confianza | reveal | Cada reseña es un cambio de estado |
| Decisión | cierre con el ticket centrado | La página se detiene y te entrega algo |

- 5 familias (parallax, flow, pin, pan, reveal), sin repetir seguidas y 0 scrubs.
- Unos 9 vh y 6 actos, fuera de la banda 6-7 / 13.6 vh.

## Fingerprints
- Registro vacío: es la primera build. Al terminar se agrega la fila.

## Reglas de marca que ganan sobre el skill
- Logo oficial en PNG, intacto, con sombra suave.
- Smokum + Oswald como par principal; Rye solo para precios (anotado como excepción).
- El acento es el rojo #d9201f. La crema es parte de la marca, sin latón.
- Sin estadísticas ni reseñas inventadas. Sin dirección física. Sin pupusas. Sin "club": solo el canal de WhatsApp. Envío no sumado.
