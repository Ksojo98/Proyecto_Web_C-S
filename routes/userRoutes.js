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

// CRUD de usuarios (protegido, ideal para admin)
router.get('/api/users', authenticate, userController.getAllUsers);
router.get('/api/users/:id', authenticate, userController.getUserById);
router.put('/api/users/:id', authenticate, userController.updateUser);
router.delete('/api/users/:id', authenticate, userController.deleteUser);

module.exports = router;