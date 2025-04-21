document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        })
    });

    const data = await response.json();
    
    if (data.success) {
        localStorage.setItem('token', data.token);
        alert(`Bienvenido ${data.user.name}`);
        window.location.href = '/';
    } else {
        alert(data.error || 'Error en el login');
    }
    const msg = document.getElementById('loginMessage');

    if (data.success) {
        localStorage.setItem('token', data.token);
        msg.style.color = 'green';
        msg.textContent = `Bienvenido ${data.user.name}`;
        setTimeout(() => window.location.href = '/', 1000);
    } else {
        msg.style.color = 'red';
        msg.textContent = data.error || 'Error en el login';
    }

});