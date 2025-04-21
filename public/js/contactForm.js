document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
  
    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
  
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
  
        if (!name || !email || !phone || !message) {
          alert('Por favor complete todos los campos.');
          return;
        }
  
        try {
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone, message })
          });
  
          const result = await response.json();
  
          if (result.success) {
            alert('Mensaje enviado exitosamente');
            contactForm.reset();
          } else {
            alert(result.error || 'Error al enviar mensaje');
          }
        } catch (error) {
          console.error('Error enviando mensaje:', error);
          alert('Error de conexión con el servidor');
        }
      });
    }
  });
  