const express = require('express');
const router = express.Router();
const { authenticate, isAdmin } = require('../middlewares/auth');
const reviewController = require('../controllers/reviewController'); 
const apiController = require('../controllers/apiController');
const adminController = require('../controllers/adminController');

router.post('/reviews', authenticate, reviewController.createReview);

router.get('/reviews', reviewController.getAllReviews);

router.get('/reviews/mine', authenticate, reviewController.getMyReviews);

router.delete('/reviews/:id', authenticate, reviewController.deleteReview);

router.post('/contact', apiController.submitContact);

router.get('/adminContacts', authenticate, isAdmin, adminController.getAllContacts);

module.exports = router;
