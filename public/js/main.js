
document.addEventListener('DOMContentLoaded', function () {
    fetch("/components/header.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("header-placeholder").innerHTML = data;
    })
    .catch(error => console.error("Error cargando el header:", error));
    const registerForm = document.getElementById('registerForm');
    const registerMessage = document.getElementById('registerMessage');
  
    if (registerForm) {
      registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
  
        const name = document.getElementById('name').value;
        const lastname = document.getElementById('lastname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const phone = document.getElementById('phone').value;
  
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
  
          if (response.ok) {
            registerMessage.textContent = result.message || 'Usuario registrado exitosamente';
            registerMessage.style.color = 'green';
            registerForm.reset();
  
            // Redirigir al login después de 2 segundos
            setTimeout(() => window.location.href = '/login', 2000);
          } else {
            registerMessage.textContent = result.error || 'Ocurrió un error al registrarse';
            registerMessage.style.color = 'red';
          }
        } catch (error) {
          console.error('Error al registrar:', error);
          registerMessage.textContent = 'Error de conexión con el servidor';
          registerMessage.style.color = 'red';
        }
      });
    }
  });
  