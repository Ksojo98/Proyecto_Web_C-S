document.addEventListener('DOMContentLoaded', function () {
  // 1. Cargar el Header
  fetch("/components/header.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("header-placeholder").innerHTML = data;
      actualizarLoginMenu(); // Ejecutar luego de cargar el header
    })
    .catch(error => console.error("Error cargando el header:", error));

  // 2. Funcionalidad de login
  const loginForm = document.getElementById('loginForm');
  const loginMessage = document.getElementById('loginMessage');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (result.success) {
          localStorage.setItem('token', result.token);
          loginMessage.textContent = `Bienvenido ${result.user.name}`;
          loginMessage.style.color = 'green';
          setTimeout(() => window.location.href = '/', 1500);
        } else {
          loginMessage.textContent = result.error || 'Credenciales incorrectas';
          loginMessage.style.color = 'red';
        }
      } catch (error) {
        console.error('Error en login:', error);
        loginMessage.textContent = 'Error de conexión con el servidor';
        loginMessage.style.color = 'red';
      }
    });
  }

  // 3. Funcionalidad de registro
  const registerForm = document.getElementById('registerForm');
  const registerMessage = document.getElementById('registerMessage');

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const lastname = document.getElementById('lastname').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const confirmPassword = document.getElementById('confirm-password').value.trim();
      const phone = document.getElementById('phone').value.trim();

      if (password !== confirmPassword) {
        registerMessage.textContent = 'Las contraseñas no coinciden.';
        registerMessage.style.color = 'red';
        return;
      }

      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, lastname, email, password, phone }),
        });

        const result = await response.json();

        if (result.success) {
          registerMessage.textContent = result.message || 'Usuario registrado exitosamente';
          registerMessage.style.color = 'green';
          registerForm.reset();
          setTimeout(() => window.location.href = '/login', 2000);
        } else {
          registerMessage.textContent = result.error || 'Error al registrarse';
          registerMessage.style.color = 'red';
        }
      } catch (error) {
        console.error('Error en registro:', error);
        registerMessage.textContent = 'Error de conexión con el servidor';
        registerMessage.style.color = 'red';
      }
    });
  }
});

// 4. Función para actualizar el menú de login
function actualizarLoginMenu() {
  const token = localStorage.getItem('token');
  const loginMenu = document.getElementById('loginMenu');
  const navLinks = document.getElementById('navLinks');

  if (token && loginMenu) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userName = payload.name || 'Usuario';

      // Mostrar mensaje de bienvenida y logout
      loginMenu.innerHTML = `
        <span>Bienvenido, ${userName}</span>
        <button onclick="logout()" style="margin-left: 10px; background: none; border: none; color: #d4af37; cursor: pointer;">Cerrar sesión</button>
      `;

      // Mostrar enlace a contactos solo si es admin
      if (navLinks && payload.role === 'admin') {
        const adminItem = document.createElement('li');
        adminItem.innerHTML = `<a href="/adminContactos">Ver Contactos</a>`;
        navLinks.appendChild(adminItem);
      }

    } catch (error) {
      console.error('Error leyendo token:', error);
      localStorage.removeItem('token');
    }
  }
}

// 5. Función logout
function logout() {
  localStorage.removeItem('token');
  window.location.href = '/login';
}
