/* =====================================================================
   FIREBASE — CONFIGURACIÓN
   =====================================================================
   Este archivo reemplaza al firebase-config.js que ya tienes en tu
   proyecto. Es idéntico, solo se agregó UNA línea nueva al final:
   COLECCION_PEDIDOS. Si prefieres no reemplazar el archivo, basta con
   que agregues esa línea a tu firebase-config.js actual.
   ===================================================================== */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js';
import { getAuth }       from 'https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js';
import { getFirestore }  from 'https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey:            "AIzaSyC6Dl3tFN7AqEnSDwd7wVmL0pmx_PN0WYg",
    authDomain:        "la-hornilla-de-zaid.firebaseapp.com",
    projectId:         "la-hornilla-de-zaid",
    storageBucket:     "la-hornilla-de-zaid.firebasestorage.app",
    messagingSenderId: "324255924352",
    appId:             "1:324255924352:web:777646da898980cb832665"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db   = getFirestore(app);

/* Nombre de la colección donde se guardan las promociones. */
export const COLECCION = 'promociones';

/* Colecciones del menú virtual.
   Cada platillo vive en una de estas dos colecciones, con un campo
   "categoria" (texto, ej. "Tacos") que agrupa los platillos en el
   admin y en el sitio. El orden de las categorías se guarda aparte
   en COLECCION_CATEGORIAS, distinguidas por el campo "menu". */
export const COLECCION_MENU = 'menuPrincipal';
export const COLECCION_PUPUSAS = 'menuPupusas';
export const COLECCION_CATEGORIAS = 'menuCategorias';

/* Bebidas y extras: una sola fuente de verdad usada por menu.html,
   pupusas.html Y pedido.html (antes cada página tenía su propia lista
   escrita a mano y se desincronizaban entre sí). */
export const COLECCION_BEBIDAS = 'menuBebidas';
export const COLECCION_EXTRAS = 'menuExtras';

/* NUEVO — Pedidos activos de mesero.html / cocina.html (sistema KDS).
   Cada documento es una comanda: mesa, estado, items, total y
   marcas de tiempo de creación/actualización. */
export const COLECCION_PEDIDOS = 'pedidos';
