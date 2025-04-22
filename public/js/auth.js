// /public/js/auth.js

// Esta función se ejecuta apenas cargue la página
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const loginMenu = document.getElementById('loginMenu'); // <- este ID debe estar en el <li> de login
  
    if (token && loginMenu) {
      try {
        // Decodificar el token
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userName = payload.name || 'Usuario';
  
        // Reemplazar el enlace de login
        loginMenu.innerHTML = `
          <span style="color: #d4af37;">Bienvenido, ${userName}</span>
          <button onclick="logout()" style="margin-left: 10px; background: none; border: none; color: #d4af37; cursor: pointer;">Cerrar sesión</button>
        `;
      } catch (error) {
        console.error('Error leyendo el token:', error);
        localStorage.removeItem('token'); // Token dañado, lo limpiamos
      }
    }
  });
  
  // Función para cerrar sesión
  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    window.location.href = '/login';
  }
  