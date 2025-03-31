const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth');
const apiController = require('../controllers/apiController');

// Endpoints API
router.post('/reviews', authenticate, apiController.submitReview);
router.get('/reviews', apiController.getReviews);


module.exports = router;