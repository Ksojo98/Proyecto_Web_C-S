// apiHelper.js

/**
 * Hace un fetch autenticado automáticamente con el token del localStorage.
 * @param {string} url - Endpoint que quieres llamar.
 * @param {object} options - Opciones de fetch (method, headers, body, etc).
 * @returns {Promise<Response>} - Respuesta del servidor.
 */
export async function fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No hay token disponible. Debes iniciar sesión.');
    }

    // Preparamos headers
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers, // si el usuario pasa headers extra
        'Authorization': `Bearer ${token}`, // ponemos el token
    };

    const fetchOptions = {
        ...options,
        headers,
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error en la solicitud.');
    }

    return response.json(); // devolvemos los datos ya parseados
}
