/* =====================================================================
   SW-ADMIN.JS — hace que el panel (admin.html) se pueda instalar como app.
   No intercepta ninguna petición ni guarda nada en caché, a propósito:
   el panel y Firebase hablan directo con internet, así nunca se muestra
   una versión vieja ni datos desactualizados.
   Solo controla admin.html (ver el "scope" al registrarlo).
   ===================================================================== */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
