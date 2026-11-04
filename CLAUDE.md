# La Hornilla de Zaid — instrucciones para Claude

## Revisión con Codex

El plugin `codex@openai-codex` (marketplace `openai-codex`, repo `openai/codex-plugin-cc`) queda activo en este proyecto desde `.claude/settings.json`.

### Dónde aplica (código puro)

Estas reglas aplican **solo** a cambios en:

- `web-react/src/**` (React / TypeScript)
- `web-react/scripts/**`, `web-react/vite.config.ts`, `web-react/package.json`
- `JS/**/*.js` (admin, mesero, cocina, historial y demás scripts)
- `firestore.rules`

No aplican a: textos de publicidad, imágenes (`Imagenes/`), CSS, contenido de páginas HTML ni la carpeta `app/` (se genera con `npm run build`).

### Reglas

1. Después de cada cambio importante de código, ejecuta `/codex:review` antes de dar la tarea por terminada.
2. Si Codex encuentra problemas, corrígelos y vuelve a revisar hasta que salga limpio.
3. Si algo falla dos veces seguidas, usa `/codex:rescue`.
4. Para cambios pequeños de texto o estilos no hace falta revisar.
5. No hagas commit ni push hasta que la revisión salga limpia.
6. Resume en 3 líneas lo que Codex encontró y lo que corregiste.

### Notas

- El review gate (revisión automática) está **desactivado** a propósito porque gasta mucho del límite de uso. Se activa con `/codex:setup --enable-review-gate` y se desactiva con `/codex:setup --disable-review-gate`.
- Si en una sesión no está disponible `/codex:review` (por ejemplo, en un chat que no corre en Claude Code en la computadora de Leonardo), avísalo claramente y pide que la revisión se haga en Claude Code antes del push.
