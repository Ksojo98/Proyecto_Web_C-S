document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Debes estar logueado como administrador');
      return (window.location.href = '/login');
    }
  
    try {
      const response = await fetch('/api/admin/contactos', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
  
      if (result.success) {
        const tbody = document.querySelector('#contactTable tbody');
        result.contacts.forEach(contact => {
          const row = `<tr>
            <td>${contact.name}</td>
            <td>${contact.email}</td>
            <td>${contact.phone}</td>
            <td>${contact.message}</td>
            <td>${new Date(contact.creation_date).toLocaleString()}</td>
          </tr>`;
          tbody.innerHTML += row;
        });
      } else {
        alert('Acceso denegado o error en el servidor');
      }
    } catch (error) {
      console.error('Error al cargar contactos:', error);
      alert('Error al cargar contactos');
    }
  });
  