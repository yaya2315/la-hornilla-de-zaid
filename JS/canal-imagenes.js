/* =====================================================================
   CANAL-IMAGENES.JS — Galería de imágenes para el canal de WhatsApp
   Las imágenes se guardan por carpeta:
     • Imagenes/promociones/  → promociones especiales (temporadas, precios locos)
     • Imagenes/promos/       → promos de combos (sopa + tacos, mega quesadilla…)
     • Imagenes/avisos/       → promociones normales y avisos
   GitHub Pages no puede "listar" una carpeta, así que cada imagen nueva
   se anota aquí con su carpeta, el nombre exacto del archivo (respetando
   mayúsculas) y un título corto. Luego git add / commit / push.
   Si cambias una imagen por otra versión con el MISMO nombre, súbele
   el número a "v" (v: 2, v: 3…): así el navegador no muestra la vieja
   que tenía guardada en caché.
   ===================================================================== */

export const CARPETA_IMAGENES_CANAL = '../Imagenes/';

export const CARPETAS_CANAL = {
    promociones: 'Promociones',
    promos: 'Promos',
    avisos: 'Promociones normales y avisos',
};

export const IMAGENES_CANAL = [
    { carpeta: 'promociones', archivo: 'precios-charros.jpg', titulo: 'Precios Charros (29 oct – 1 nov)' },
    { carpeta: 'promos', archivo: 'promo-mega-quesadilla.jpg', v: 2, titulo: '½ sopa + mega quesadilla + bebida a $5 (29 oct – 1 nov)' },
    { carpeta: 'promos', archivo: 'promo-sopa-tacos-hornilla.jpg', v: 2, titulo: '½ sopa + 2 tacos + bebida a $4.50 (29 oct – 1 nov)' },
    { carpeta: 'avisos', archivo: 'delivery-envio-mapa.jpg', titulo: 'Delivery a $1 (Sonzacate y Sonsonate centro)' },
    { carpeta: 'avisos', archivo: 'hoy-descansamos.jpg', titulo: 'Hoy no hay servicio' },
];
