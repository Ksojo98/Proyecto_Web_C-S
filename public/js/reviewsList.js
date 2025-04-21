document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('reviewsContainer');
  
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
  
      if (res.ok) {
        data.reviews.forEach(review => {
          const div = document.createElement('div');
          div.classList.add('review');
  
          let stars = '';
          for (let i = 0; i < review.rating; i++) {
            stars += '<i class="fa-solid fa-star"></i>';
          }
          for (let i = review.rating; i < 5; i++) {
            stars += '<i class="fa-regular fa-star"></i>';
          }
  
          div.innerHTML = `
            <h2>${review.name} ${review.lastname}</h2>
            <div class="stars">${stars}</div>
            <p>${review.comment}</p>
            <small>Publicado el ${new Date(review.creation_date).toLocaleDateString()}</small>
          `;
  
          container.appendChild(div);
        });
      } else {
        container.innerHTML = `<p>No se pudieron cargar las reseñas.</p>`;
      }
  
    } catch (error) {
      console.error('Error al cargar reseñas:', error);
      container.innerHTML = `<p>Error del servidor.</p>`;
    }
  });
  