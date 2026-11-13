/* =====================================================================
   SW-ADMIN.JS — hace que el panel (admin.html) se pueda instalar como app.
   No guarda nada en caché a propósito: el panel siempre se carga de
   internet, así nunca muestra una versión vieja ni datos desactualizados.
   Solo controla admin.html (ver el "scope" al registrarlo).
   ===================================================================== */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => { /* todo pasa directo a la red */ });
