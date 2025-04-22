function actualizarLoginMenu() {
  const token = localStorage.getItem('token');
  const loginMenu = document.getElementById('loginMenu');
  const navLinks = document.getElementById('navLinks');

  if (token && loginMenu && navLinks) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userName = payload.name || 'Usuario';

      loginMenu.innerHTML = `
        <span>Bienvenido, ${userName}</span>
        <button onclick="logout()" style="margin-left: 10px; background: none; border: none; color: #d4af37; cursor: pointer;">Cerrar sesión</button>
      `;

      // Mostrar link solo si es admin
      if (payload.role === 'admin') {
        const adminLink = document.createElement('li');
        adminLink.innerHTML = `<a href="/adminContact">Ver Contactos</a>`;
        navLinks.appendChild(adminLink);
      }

    } catch (error) {
      console.error('Error leyendo el token:', error);
      localStorage.removeItem('token');
    }
  }
}

function logout() {
  localStorage.removeItem('token');
  window.location.href = '/login';
}
function actualizarLoginMenu() {
  const token = localStorage.getItem('token');
  const loginMenu = document.getElementById('loginMenu');
  const adminLink = document.getElementById('adminLink');

  if (token && loginMenu) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userName = payload.name || 'Usuario';

      loginMenu.innerHTML = `
        <span>Bienvenido, ${userName}</span>
        <button onclick="logout()" style="margin-left: 10px; background: none; border: none; color: #d4af37; cursor: pointer;">Cerrar sesión</button>
      `;

      if (payload.role === 'admin' && adminLink) {
        adminLink.style.display = 'inline-block';
      }

    } catch (error) {
      console.error('Error leyendo el token:', error);
      localStorage.removeItem('token');
    }
  }
}


window.addEventListener('DOMContentLoaded', () => {
  actualizarLoginMenu();
});
