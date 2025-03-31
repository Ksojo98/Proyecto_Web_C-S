document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: document.getElementById('name').value,
            lastname: document.getElementById('lastname').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            phone: document.getElementById('phone').value
        })
    });

    const data = await response.json();
    alert(data.success ? data.message : data.error);
});