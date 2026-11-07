/* =====================================================================
   SESIÓN DEL PERSONAL (mesero y cocina)
   ---------------------------------------------------------------------
   Desde noviembre 2026 las reglas de Firestore solo dejan leer y crear
   pedidos a las cuentas del personal (esAdmin: Leonardo y La Hornilla).
   Este módulo pide correo y contraseña ANTES de cargar el resto de la
   página. La sesión queda guardada en el dispositivo: solo se entra una
   vez (igual que en historial.html).

   Uso (en el HTML, en lugar del <script> normal):
     <script type="module">
       import { esperarSesion, arrancar } from '../JS/sesion-personal.js';
       await esperarSesion('Mesero');
       await arrancar(['../JS/mesero.js']);
     </script>
   ===================================================================== */
import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword, onAuthStateChanged }
    from 'https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js';

const ERRORES = {
    'auth/invalid-email': 'El correo no es válido.',
    'auth/user-not-found': 'No existe una cuenta con ese correo.',
    'auth/wrong-password': 'Contraseña incorrecta.',
    'auth/invalid-credential': 'Correo o contraseña incorrectos.',
    'auth/too-many-requests': 'Demasiados intentos. Espera un momento.',
    'auth/network-request-failed': 'Sin conexión. Revisa tu internet.'
};

const ESTILOS = `
.sp-wrap{position:fixed;inset:0;z-index:9000;display:flex;align-items:center;justify-content:center;box-sizing:border-box;padding:24px 16px;
  background:var(--char-700,#140d09);overflow-y:auto}
.sp-card{box-sizing:border-box;width:100%;max-width:400px;margin:auto;background:var(--card,#1d140e);border:1px solid var(--line,rgba(255,255,255,.08));
  border-radius:var(--radius-lg,22px);padding:32px 24px;box-shadow:0 24px 60px rgba(0,0,0,.45)}
.sp-brand{text-align:center;margin-bottom:28px}
.sp-eyebrow{display:block;font:600 .72rem/1.2 Oswald,system-ui,sans-serif;letter-spacing:2px;text-transform:uppercase;color:var(--ember,#ff6600);margin-bottom:8px}
.sp-brand h1{margin:0 0 6px;color:#fff;font:700 clamp(1.4rem,5vw,1.7rem)/1.15 Oswald,system-ui,sans-serif}
.sp-brand p{margin:0;color:var(--muted,#a99b8c);font-size:.8rem;letter-spacing:2px;text-transform:uppercase}
.sp-field{margin-bottom:16px}
.sp-field label{display:block;font-size:.74rem;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted,#a99b8c);margin-bottom:7px}
.sp-field input{box-sizing:border-box;width:100%;min-height:48px;background:rgba(0,0,0,.3);border:1px solid var(--line,rgba(255,255,255,.12));
  border-radius:12px;padding:12px 16px;color:var(--cream,#f3e9d8);font-size:1rem;transition:border-color .25s ease}
.sp-field input:focus-visible{outline:2px solid var(--ember,#ff6600);outline-offset:2px;border-color:var(--ember,#ff6600)}
.sp-btn{width:100%;min-height:48px;margin-top:6px;border:0;border-radius:999px;cursor:pointer;color:#fff;
  font:600 1rem/1 Oswald,system-ui,sans-serif;letter-spacing:1px;text-transform:uppercase;
  background:linear-gradient(135deg,var(--ember-soft,#ff8a3d),var(--ember-deep,#d94f00));box-shadow:0 10px 30px var(--glow,rgba(255,102,0,.3));
  transition:transform .2s ease,box-shadow .2s ease,opacity .2s ease}
.sp-btn:hover{transform:translateY(-2px)}
.sp-btn:focus-visible{outline:2px solid #fff;outline-offset:3px}
.sp-btn:disabled{opacity:.6;cursor:wait;transform:none}
.sp-msg{min-height:1.4em;margin:14px 0 0;text-align:center;font-size:.9rem;color:#e2452b}
@media (prefers-reduced-motion:reduce){.sp-btn,.sp-field input{transition:none}.sp-btn:hover{transform:none}}
`;

let capa = null;

function mostrarAcceso(titulo) {
    if (capa) return;
    const estilo = document.createElement('style');
    estilo.id = 'spEstilos';
    estilo.textContent = ESTILOS;
    document.head.appendChild(estilo);

    capa = document.createElement('section');
    capa.className = 'sp-wrap';
    capa.setAttribute('role', 'dialog');
    capa.setAttribute('aria-modal', 'true');
    capa.setAttribute('aria-labelledby', 'spTitulo');
    capa.innerHTML = `
      <form class="sp-card" novalidate>
        <div class="sp-brand">
          <span class="sp-eyebrow">Acceso del personal</span>
          <h1 id="spTitulo">La Hornilla de Zaid</h1>
          <p></p>
        </div>
        <div class="sp-field">
          <label for="spEmail">Correo</label>
          <input type="email" id="spEmail" autocomplete="username" inputmode="email" required>
        </div>
        <div class="sp-field">
          <label for="spPass">Contraseña</label>
          <input type="password" id="spPass" autocomplete="current-password" required>
        </div>
        <button class="sp-btn" type="submit">Entrar</button>
        <p class="sp-msg" role="alert" aria-live="assertive"></p>
      </form>`;
    capa.querySelector('.sp-brand p').textContent = titulo;
    document.body.appendChild(capa);
    document.documentElement.style.overflow = 'hidden';

    const form = capa.querySelector('form');
    const btn = capa.querySelector('.sp-btn');
    const msg = capa.querySelector('.sp-msg');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = form.spEmail.value.trim();
        const pass = form.spPass.value;
        if (!email || !pass) { msg.textContent = 'Escribe tu correo y tu contraseña.'; return; }
        msg.textContent = '';
        btn.disabled = true;
        btn.textContent = 'Entrando…';
        try {
            await signInWithEmailAndPassword(auth, email, pass);
        } catch (err) {
            msg.textContent = ERRORES[err.code] || 'No se pudo iniciar sesión.';
            btn.disabled = false;
            btn.textContent = 'Entrar';
        }
    });
    setTimeout(() => form.spEmail.focus(), 50);
}

function quitarAcceso() {
    if (!capa) return;
    capa.remove();
    document.documentElement.style.overflow = '';
    document.getElementById('spEstilos')?.remove();
    capa = null;
}

/* Espera a que el DOM esté listo y a que haya sesión. */
export async function esperarSesion(titulo = 'Personal') {
    if (document.readyState === 'loading') {
        await new Promise(r => document.addEventListener('DOMContentLoaded', r, { once: true }));
    }
    return new Promise(resolve => {
        const dejar = onAuthStateChanged(auth, (user) => {
            if (user) { dejar(); quitarAcceso(); resolve(user); }
            else mostrarAcceso(titulo);
        });
    });
}

/* Carga los módulos de la página en orden. Como el DOM ya estaba listo,
   se vuelve a avisar "DOMContentLoaded" para que corran sus arranques
   (mesero.js y promos.js esperan ese evento). */
export async function arrancar(modulos) {
    for (const m of modulos) await import(new URL(m, document.baseURI).href);
    document.dispatchEvent(new Event('DOMContentLoaded'));
}
