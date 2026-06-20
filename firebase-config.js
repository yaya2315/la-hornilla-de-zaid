/* =====================================================================
   FIREBASE — CONFIGURACIÓN
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
