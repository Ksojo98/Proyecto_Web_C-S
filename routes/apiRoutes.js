// routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth');
const reviewController = require('../controllers/reviewController'); // ✅ Correcto

// Endpoints API para reseñas
router.post('/reviews', authenticate, reviewController.createReview); // Crear reseña
router.get('/reviews', reviewController.getAllReviews); // Ver todas las reseñas
router.get('/myreviews', authenticate, reviewController.getMyReviews); // Ver mis reseñas
router.delete('/reviews/:id', authenticate, reviewController.deleteReview); // Eliminar reseña

// Crear reseña
router.post('/reviews', authenticate, reviewController.createReview);

// Obtener todas las reseñas
router.get('/reviews', reviewController.getAllReviews);

// Obtener solo mis reseñas
router.get('/reviews/mine', authenticate, reviewController.getMyReviews);

// Eliminar reseña (sólo si es mía)
router.delete('/reviews/:id', authenticate, reviewController.deleteReview);

module.exports = router;
