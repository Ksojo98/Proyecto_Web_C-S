const db = require('../config/db');

exports.submitReview = async (req, res) => {
    try {
        const { user_id, comment, rating } = req.body;
        await db.query(
            'INSERT INTO Reviews (user_id, comment, rating) VALUES (?, ?, ?)',
            [user_id, comment, rating]
        );
        res.json({ success: true, message: 'Reseña publicada' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error al publicar reseña' });
    }
};

exports.getReviews = async (req, res) => {
    try {
        const [reviews] = await db.query('SELECT * FROM Reviews');
        res.json({ success: true, data: reviews });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error al obtener reseñas' });
    }
};