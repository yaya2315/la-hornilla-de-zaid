/* Firebase para la web pública: Firestore "lite" (solo lecturas y crear
   reseñas, sin tiempo real) — mucho más liviano que el SDK completo.
   Mismo proyecto que el admin. El admin, mesero y cocina siguen usando
   JS/firebase-config.js como siempre. */
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'

const app = initializeApp({
  apiKey: 'AIzaSyC6Dl3tFN7AqEnSDwd7wVmL0pmx_PN0WYg',
  authDomain: 'la-hornilla-de-zaid.firebaseapp.com',
  projectId: 'la-hornilla-de-zaid',
  storageBucket: 'la-hornilla-de-zaid.firebasestorage.app',
  messagingSenderId: '324255924352',
  appId: '1:324255924352:web:777646da898980cb832665',
})

export const db = getFirestore(app)
