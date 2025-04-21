// public/js/reviewsCreate.js

document.addEventListener('DOMContentLoaded', () => {
  const reviewForm = document.getElementById('reviewForm');

  if (reviewForm) {
    reviewForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const comentario = document.getElementById('comentario').value.trim();
      const estrellas = document.getElementById('estrellas').value;
      const token = localStorage.getItem('token');

      if (!token) {
        alert('Debes iniciar sesión para dejar una reseña.');
        window.location.href = '/login';
        return;
      }

      try {
        const response = await fetch('/api/reviews', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ comment: comentario, rating: estrellas })
        });

        const result = await response.json();

        if (result.success) {
          alert('¡Reseña enviada exitosamente!');
          window.location.href = '/reviews'; // Redirigir a listado de reseñas
        } else {
          alert(result.error || 'Error al enviar la reseña');
        }
      } catch (error) {
        console.error('Error enviando reseña:', error);
        alert('Error de conexión con el servidor');
      }
    });
  }
});
