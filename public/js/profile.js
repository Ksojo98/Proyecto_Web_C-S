document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      // Si no hay token, redirige al login
      window.location.href = '/login';
      return;
    }
  
    try {
      const response = await fetch('/api/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      const data = await response.json();
  
      if (data.success) {
        // Muestra los datos del usuario en tu página
        const userInfo = document.getElementById('user-info');
        userInfo.innerHTML = `
          <p><strong>Nombre:</strong> ${data.user.name} ${data.user.lastname}</p>
          <p><strong>Email:</strong> ${data.user.email}</p>
          <p><strong>Teléfono:</strong> ${data.user.phone}</p>
        `;
      } else {
        alert('Error al obtener datos del usuario');
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      alert('Error inesperado');
      window.location.href = '/login';
    }
  });
  