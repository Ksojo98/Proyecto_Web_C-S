const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.index);
router.get('/contact', mainController.contact);
router.get('/reviews', mainController.reviews);
router.get('/map', mainController.map);
router.get('/luxuryproperties', mainController.luxuryproperties);
router.get('/nueva_resena', mainController.nueva_resena);
router.get('/about', mainController.about);
router.get('/contact', mainController.contact);

module.exports = router;
