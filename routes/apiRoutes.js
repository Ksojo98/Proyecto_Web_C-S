// routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const { authenticate, isAdmin } = require('../middlewares/auth');
const reviewController = require('../controllers/reviewController'); // ✅ Correcto
const apiController = require('../controllers/apiController');
const adminController = require('../controllers/adminController');

// Endpoints API para reseñas
router.post('/reviews', authenticate, reviewController.createReview); // Crear reseña
router.get('/reviews', reviewController.getAllReviews); // Ver todas las reseñas
router.get('/myreviews', authenticate, reviewController.getMyReviews); // Ver mis reseñas
router.delete('/reviews/:id', authenticate, reviewController.deleteReview); // Eliminar reseña
router.post('/contact', apiController.submitContact);


// Crear reseña
router.post('/reviews', authenticate, reviewController.createReview);

// Obtener todas las reseñas
router.get('/reviews', reviewController.getAllReviews);

// Obtener solo mis reseñas
router.get('/reviews/mine', authenticate, reviewController.getMyReviews);

// Eliminar reseña (sólo si es mía)
router.delete('/reviews/:id', authenticate, reviewController.deleteReview);

// Ruta para ver contactos solo para admin
router.get('/adminContacts', authenticate, isAdmin, adminController.getAllContacts);

module.exports = router;
