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