const db = require('../config/db');

const reviewController = {
  // Crear una reseña
  createReview: async (req, res) => {
    try {
      const userId = req.user.id;
      const { comment, rating } = req.body;

      if (!comment || !rating || rating < 1 || rating > 5) {
        return res.status(400).json({ success: false, error: 'Comentario y rating entre 1 y 5 requeridos' });
      }

      await db.query('INSERT INTO Reviews (user_id, comment, rating) VALUES (?, ?, ?)', [
        userId,
        comment,
        rating
      ]);

      res.status(201).json({ success: true, message: 'Reseña creada exitosamente' });
    } catch (error) {
      console.error('Error al crear review:', error);
      res.status(500).json({ success: false, error: 'Error del servidor' });
    }
  },

  // Obtener todas las reseñas (público)
  getAllReviews: async (req, res) => {
    try {
      const [reviews] = await db.query(`
        SELECT 
          r.review_id, 
          r.comment, 
          r.rating, 
          r.creation_date, 
          u.name, 
          u.lastname
        FROM Reviews r
        JOIN users u ON r.user_id = u.user_id
        ORDER BY r.creation_date DESC
      `);

      res.json({ success: true, reviews });
    } catch (error) {
      console.error('Error al obtener reviews:', error);
      res.status(500).json({ success: false, error: 'Error del servidor' });
    }
  },

  // Obtener solo mis reseñas
  getMyReviews: async (req, res) => {
    try {
      const userId = req.user.id;

      const [reviews] = await db.query(`
        SELECT review_id, comment, rating, creation_date
        FROM Reviews
        WHERE user_id = ?
        ORDER BY creation_date DESC
      `, [userId]);

      res.json({ success: true, reviews });
    } catch (error) {
      console.error('Error al obtener mis reviews:', error);
      res.status(500).json({ success: false, error: 'Error del servidor' });
    }
  },

  // Eliminar una reseña (sólo si es del usuario)
  deleteReview: async (req, res) => {
    try {
      const userId = req.user.id;
      const reviewId = req.params.id;

      // Verificar que la reseña sea del usuario
      const [review] = await db.query('SELECT * FROM Reviews WHERE review_id = ? AND user_id = ?', [reviewId, userId]);

      if (!review.length) {
        return res.status(403).json({ success: false, error: 'No puedes eliminar esta reseña' });
      }

      await db.query('DELETE FROM Reviews WHERE review_id = ?', [reviewId]);

      res.json({ success: true, message: 'Reseña eliminada exitosamente' });
    } catch (error) {
      console.error('Error al eliminar review:', error);
      res.status(500).json({ success: false, error: 'Error del servidor' });
    }
  }
};

module.exports = reviewController;
