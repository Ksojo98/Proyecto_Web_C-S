const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authenticate } = require('../middlewares/auth');

router.post('/api/reviews', authenticate, reviewController.createReview);
router.get('/api/reviews', reviewController.getAllReviews);
router.get('/api/reviews/user', authenticate, reviewController.getMyReviews); // opcional
router.delete('/api/reviews/:id', authenticate, reviewController.deleteReview); // opcional

module.exports = router;
