document.getElementById('reviewForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
    if (!token) return alert('Debes estar logueado para enviar una reseña');
  
    const comment = document.getElementById('comment').value;
    const rating = document.getElementById('rating').value;
  
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ comment, rating })
    });
  
    const data = await res.json();
    const msg = document.getElementById('reviewMessage');
  
    if (data.success) {
      msg.textContent = '¡Gracias por tu reseña!';
      msg.style.color = 'green';
      document.getElementById('reviewForm').reset();
    } else {
      msg.textContent = data.error || 'Error al enviar la reseña';
      msg.style.color = 'red';
    }
  });
  