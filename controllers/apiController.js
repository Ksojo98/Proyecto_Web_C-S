// controllers/apiController.js

const db = require('../config/db');

const apiController = {
  // Crear reseña
  submitReview: async (req, res) => {
    try {
      const userId = req.user.id; // usamos el id desde el token del usuario autenticado
      const { comment, rating } = req.body;

      if (!comment || !rating) {
        return res.status(400).json({ success: false, error: 'Comentario y puntuación requeridos' });
      }

      await db.query(
        'INSERT INTO Reviews (user_id, comment, rating) VALUES (?, ?, ?)',
        [userId, comment, rating]
      );

      res.json({ success: true, message: 'Reseña publicada' });
    } catch (error) {
      console.error('Error en submitReview:', error);
      res.status(500).json({ success: false, error: 'Error al publicar reseña' });
    }
  },

  // Obtener todas las reseñas
  getReviews: async (req, res) => {
    try {
      const [reviews] = await db.query(`
        SELECT r.review_id, r.comment, r.rating, r.creation_date, u.name, u.lastname
        FROM Reviews r
        INNER JOIN users u ON r.user_id = u.user_id
        ORDER BY r.creation_date DESC
      `);

      res.json({ success: true, data: reviews });
    } catch (error) {
      console.error('Error en getReviews:', error);
      res.status(500).json({ success: false, error: 'Error al obtener reseñas' });
    }
  },

  // Insertar contacto en formulario
  submitContact: async (req, res) => {
    try {
      const { name, email, phone, message } = req.body;

      if (!name || !email || !phone || !message) {
        return res.status(400).json({ success: false, error: 'Todos los campos son obligatorios' });
      }

      await db.query('INSERT INTO ContactForm (name, email, phone, message) VALUES (?, ?, ?, ?)', [
        name,
        email,
        phone,
        message
      ]);

      res.status(201).json({ success: true, message: 'Mensaje recibido correctamente' });
    } catch (error) {
      console.error('Error al insertar mensaje de contacto:', error);
      res.status(500).json({ success: false, error: 'Error en el servidor' });
    }
  }
};

module.exports = apiController;
