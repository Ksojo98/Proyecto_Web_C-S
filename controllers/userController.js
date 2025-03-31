const path = require('path');
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userController = {
  // =====================================
  // 1. Métodos para servir vistas (GET)
  // =====================================
  login: (req, res) => res.sendFile(path.join(__dirname, '../views/login.html')),
  register: (req, res) => res.sendFile(path.join(__dirname, '../views/register.html')),
  formulario: (req, res) => res.sendFile(path.join(__dirname, '../views/formulario.html')),

  // =====================================
  // 2. Métodos para API (POST)
  // =====================================
  /**
   * Procesa el login de usuarios
   */
  processLogin: async (req, res) => {
    try {
      const { email, password } = req.body;

      // 1. Buscar usuario en la base de datos
      const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      if (!user || user.length === 0) {
        return res.status(401).json({ 
          success: false,
          error: 'Usuario no encontrado' 
        });
      }

      // 2. Verificar contraseña
      const validPassword = bcrypt.compareSync(password, user[0].password);
      if (!validPassword) {
        return res.status(401).json({ 
          success: false,
          error: 'Contraseña incorrecta' 
        });
      }

      // 3. Generar token JWT
      const token = jwt.sign(
        { 
          id: user[0].user_id, 
          role: user[0].role 
        },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
      );

      // 4. Responder con éxito
      res.json({
        success: true,
        token,
        user: {
          id: user[0].user_id,
          name: user[0].name,
          email: user[0].email,
          role: user[0].role
        }
      });

    } catch (error) {
      console.error('Error en processLogin:', error);
      res.status(500).json({ 
        success: false,
        error: 'Error en el servidor' 
      });
    }
  },

  /**
   * Registra un nuevo usuario
   */
  processRegister: async (req, res) => {
    try {
      const { name, lastname, email, password, phone } = req.body;

      // 1. Verificar si el email ya existe
      const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      if (existingUser && existingUser.length > 0) {
        return res.status(400).json({ 
          success: false,
          error: 'El email ya está registrado' 
        });
      }

      // 2. Hash de la contraseña
      const hashedPassword = bcrypt.hashSync(password, 10);

      // 3. Llamar al procedimiento almacenado
      await db.query('CALL nuevoUsuario(?, ?, ?, ?, ?)', [
        name,
        lastname,
        email,
        hashedPassword, // Usamos el hash en lugar de la contraseña plana
        phone
      ]);

      // 4. Responder con éxito
      res.status(201).json({ 
        success: true,
        message: 'Usuario registrado exitosamente' 
      });

    } catch (error) {
      console.error('Error en processRegister:', error);
      res.status(500).json({ 
        success: false,
        error: error.code === 'ER_DUP_ENTRY' 
          ? 'El correo electrónico ya está en uso' 
          : 'Error al registrar el usuario' 
      });
    }
  },

  /**
   * Obtiene información del usuario actual
   */
  getProfile: async (req, res) => {
    try {
      // El middleware authenticate ya validó el token
      const userId = req.user.id;

      const [user] = await db.query(
        'SELECT user_id, name, lastname, email, phone FROM users WHERE user_id = ?', 
        [userId]
      );

      if (!user || user.length === 0) {
        return res.status(404).json({ 
          success: false,
          error: 'Usuario no encontrado' 
        });
      }

      res.json({ 
        success: true,
        user: user[0] 
      });

    } catch (error) {
      console.error('Error en getProfile:', error);
      res.status(500).json({ 
        success: false,
        error: 'Error al obtener perfil' 
      });
    }
  }
};

module.exports = userController;