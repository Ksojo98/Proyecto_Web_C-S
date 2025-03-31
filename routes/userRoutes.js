// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middlewares/auth');

// Vistas HTML
router.get('/login', userController.login);
router.get('/register', userController.register);
router.get('/formulario', userController.formulario);

// API
router.post('/api/login', userController.processLogin);
router.post('/api/register', userController.processRegister);
router.get('/api/profile', authenticate, userController.getProfile);

module.exports = router;