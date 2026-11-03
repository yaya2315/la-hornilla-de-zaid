/* Arranque común de cada página: fuentes de marca (solo latín, servidas
   desde el propio sitio), estilos, pantalla de carga y React. */
import '@fontsource/oswald/latin-500.css'
import '@fontsource/oswald/latin-600.css'
import '@fontsource/oswald/latin-700.css'
import '@fontsource/poppins/latin-400.css'
import '@fontsource/poppins/latin-500.css'
import '@fontsource/poppins/latin-600.css'
import '@fontsource/poppins/latin-700.css'
import '@fontsource/poppins/latin-600-italic.css'
import '@fontsource/rye/latin-400.css'
import '@fontsource/smokum/latin-400.css'
import '@/estilos/app.css'
import { StrictMode, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'motion/react'
import { iniciarCargando } from '@/components/marca/Cargando'

export function montar(app: ReactNode) {
  iniciarCargando()
  createRoot(document.getElementById('app')!).render(
    <StrictMode>
      {/* "user": respeta la opción de reducir movimiento del teléfono */}
      <MotionConfig reducedMotion="user">{app}</MotionConfig>
    </StrictMode>,
  )
}
