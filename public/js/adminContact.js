document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      alert('Acceso denegado. Inicia sesión como administrador.');
      window.location.href = '/login';
      return;
    }
  
    try {
        const res = await fetch('/api/adminContacts', {


        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
  
      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
      }
  
      const data = await res.json();
  
      if (!data.success) {
        alert(data.error || 'No se pudo cargar los contactos.');
        return;
      }
  
      const container = document.getElementById('contactTableContainer');
  
      if (!data.contacts || data.contacts.length === 0) {
        container.innerHTML = '<p>No hay mensajes disponibles.</p>';
        return;
      }
  
      let table = `
        <table border="1" cellpadding="10">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Mensaje</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
      `;
  
      data.contacts.forEach(contact => {
        table += `
          <tr>
            <td>${contact.name}</td>
            <td>${contact.email}</td>
            <td>${contact.phone}</td>
            <td>${contact.message}</td>
            <td>${new Date(contact.creation_date).toLocaleString()}</td>
          </tr>
        `;
      });
  
      table += '</tbody></table>';
      container.innerHTML = table;
  
    } catch (error) {
      console.error('Error cargando los contactos:', error);
      alert('Error de conexión con el servidor');
    }
  });
  