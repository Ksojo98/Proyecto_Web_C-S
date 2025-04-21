// middlewares/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Middleware para verificar el token JWT
 */
const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ error: 'Acceso no autorizado. Token requerido' });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // Agrega los datos del usuario al request
    next();
  } catch (error) {
    console.error('Error en authenticate:', error);
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

/**
 * Middleware para verificar si el usuario tiene rol de administrador
 */
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Se requieren privilegios de administrador' });
  }
  next();
};

module.exports = { authenticate, isAdmin };
