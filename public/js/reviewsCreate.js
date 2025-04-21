document.addEventListener('DOMContentLoaded', () => {
    const reviewForm = document.getElementById('reviewForm');
  
    if (reviewForm) {
      reviewForm.addEventListener('submit', async (e) => {
        e.preventDefault();
  
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Debes iniciar sesión para enviar una reseña.');
          return window.location.href = '/login';
        }
  
        const comentario = document.getElementById('comentario').value;
        const estrellas = document.getElementById('estrellas').value;
  
        try {
          const res = await fetch('/api/reviews', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              comment: comentario,
              rating: estrellas
            })
          });
  
          const data = await res.json();
  
          if (res.ok) {
            alert('Reseña enviada con éxito!');
            window.location.href = '/reviews'; // Redirige a ver todas las reseñas
          } else {
            alert(data.error || 'Error al enviar reseña');
          }
  
        } catch (error) {
          console.error('Error al crear reseña:', error);
          alert('Error del servidor.');
        }
      });
    }
  });
  