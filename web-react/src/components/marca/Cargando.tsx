/* =====================================================================
   Pantalla de carga "fueguito" + transición entre páginas.
   El HTML de cada página ya trae el overlay (se ve desde el primer
   instante). Aquí solo se esconde al cargar y se vuelve a mostrar al
   hacer clic en un enlace interno, para que el cambio de página se
   sienta continuo. Con "reducir movimiento" no hay espera.
   ===================================================================== */
export function iniciarCargando() {
  const overlay = document.getElementById('pageload')
  if (!overlay) return
  const reducir = matchMedia('(prefers-reduced-motion: reduce)').matches
  const inicio = performance.now()
  const ocultar = () => {
    const espera = reducir ? 0 : Math.max(0, 650 - (performance.now() - inicio))
    setTimeout(() => { overlay.classList.add('is-hidden'); overlay.setAttribute('aria-hidden', 'true') }, espera)
  }
  if (document.readyState === 'complete') ocultar()
  else addEventListener('load', ocultar, { once: true })
  addEventListener('pageshow', (e) => { if (e.persisted) overlay.classList.add('is-hidden') })

  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const a = (e.target as Element).closest('a')
    if (!a || !a.href || (a.target && a.target !== '_self') || a.hasAttribute('download')) return
    const destino = new URL(a.href, location.href)
    if (destino.origin !== location.origin || !/\.html?$/.test(destino.pathname)) return
    if (destino.pathname === location.pathname && destino.hash) return
    e.preventDefault()
    overlay.classList.remove('is-hidden')
    overlay.removeAttribute('aria-hidden')
    setTimeout(() => { location.href = a.href }, reducir ? 0 : 380)
  })
}
