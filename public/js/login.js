document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
  
        try {
          const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          });
  
          const data = await response.json();
          
          if (data.success && data.token) {
            // ✅ Guardamos el token
            localStorage.setItem('token', data.token);
            localStorage.setItem('userName', data.user.name); // opcional, para mostrar luego
            
            alert(`Bienvenido, ${data.user.name}`);
            window.location.href = '/'; // Redirigir al home
          } else {
            alert(data.error || 'Credenciales incorrectas');
          }
        } catch (error) {
          console.error('Error en el login:', error);
          alert('Error en el servidor');
        }
      });
    }
  });
  