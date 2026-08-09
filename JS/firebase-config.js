/* =====================================================================
   FIREBASE — CONFIGURACIÓN
   =====================================================================
   Igual que tu archivo actual, con DOS cosas nuevas al final:

   1. COLECCION_PEDIDOS — ya la tenías.
   2. activarReconexionAutomatica() — arregla el problema de "tengo que
      refrescar la página para que se actualice". Firestore mantiene un
      canal de datos en tiempo real abierto todo el tiempo, pero en una
      pantalla que se queda encendida horas (cocina, mesero) ese canal
      se puede "quedar dormido" si la pestaña pasa un rato en segundo
      plano, la tablet se bloquea, o el wifi falla un instante — y el
      navegador no siempre se da cuenta solo de que debe reconectar.
      Esta función fuerza una reconexión cada vez que:
        • vuelves a la pestaña / pantalla (visibilitychange, focus)
        • el dispositivo recupera internet (evento 'online')
        • cada 5 minutos, como respaldo silencioso, por si ninguno de
          los eventos anteriores se disparó
   ===================================================================== */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js';
import { getAuth }       from 'https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js';
import {
    getFirestore, enableNetwork, disableNetwork
} from 'https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js';

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

/* Pedidos activos de mesero.html / cocina.html (sistema KDS).
   Cada documento es una comanda: tipo, mesa/cliente, estado, items,
   total y marcas de tiempo de creación/actualización. */
export const COLECCION_PEDIDOS = 'pedidos';

/* ===== RECONEXIÓN AUTOMÁTICA ========================================= */
let _reconectando = false;
let _activada = false;

export function activarReconexionAutomatica() {
    if (_activada) return;   // evita registrar los listeners más de una vez
    _activada = true;

    const reconectar = async () => {
        if (_reconectando) return;
        _reconectando = true;
        try {
            await disableNetwork(db);
            await enableNetwork(db);
        } catch (err) {
            console.warn('[firebase] No se pudo forzar la reconexión:', err);
        } finally {
            _reconectando = false;
        }
    };

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') reconectar();
    });
    window.addEventListener('online', reconectar);
    window.addEventListener('focus', reconectar);
    setInterval(reconectar, 5 * 60 * 1000);
}
