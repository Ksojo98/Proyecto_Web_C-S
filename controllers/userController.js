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
  processLogin: async (req, res) => {
    try {
      console.log('🛠️ BODY RECIBIDO:', req.body);
  
      const { email, password } = req.body;
  
      if (!email || !password) {
        console.log('⛔ Email o Password vacío');
        return res.status(400).json({ success: false, error: 'Email y contraseña son requeridos' });
      }
  
      const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email.trim()]);
      console.log('🔎 USUARIO ENCONTRADO:', user);
  
      if (!user || user.length === 0) {
        console.log('⛔ Usuario no encontrado en la base de datos');
        return res.status(401).json({ success: false, error: 'Usuario no encontrado' });
      }
  
      const validPassword = bcrypt.compareSync(password, user[0].password);
      if (!validPassword) {
        console.log('⛔ Contraseña inválida');
        return res.status(401).json({ success: false, error: 'Contraseña incorrecta' });
      }
  
      const token = jwt.sign(
        {
          id: user[0].user_id,
          name: user[0].name,
          email: user[0].email,
          role: user[0].role
        },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
      );
  
      console.log('✅ Login exitoso, token generado');
  
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
      console.error('💥 Error en processLogin:', error);
      res.status(500).json({ success: false, error: 'Error en el servidor' });
    }
  },

  processRegister: async (req, res) => {
    try {
      console.log('🛠️ BODY RECIBIDO EN REGISTRO:', req.body);

      const { name, lastname, email, password, phone } = req.body;

      if (!name || !lastname || !email || !password || !phone) {
        return res.status(400).json({ success: false, error: 'Todos los campos son requeridos' });
      }

      // Verificar si ya existe un usuario con ese email
      const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email.trim()]);
      if (existingUser.length > 0) {
        return res.status(409).json({ success: false, error: 'El correo electrónico ya está registrado' });
      }

      // Encriptar la contraseña
      const hashedPassword = bcrypt.hashSync(password, 10);

      // Insertar nuevo usuario
      await db.query(
        'INSERT INTO users (name, lastname, email, password, phone) VALUES (?, ?, ?, ?, ?)',
        [name.trim(), lastname.trim(), email.trim(), hashedPassword, phone.trim()]
      );

      console.log('✅ Registro exitoso');

      res.status(201).json({ success: true, message: 'Usuario registrado exitosamente' });
      
    } catch (error) {
      console.error('💥 Error en processRegister:', error);
      res.status(500).json({ success: false, error: 'Error en el servidor' });
    }
  },

  // =====================================
  // 3. Métodos de Perfil
  // =====================================
  getProfile: async (req, res) => {
    try {
      const userId = req.user.id;
      const [user] = await db.query(
        'SELECT user_id, name, lastname, email, phone FROM users WHERE user_id = ?', 
        [userId]
      );
      if (!user || user.length === 0) {
        return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
      }
      res.json({ success: true, user: user[0] });
    } catch (error) {
      console.error('Error en getProfile:', error);
      res.status(500).json({ success: false, error: 'Error al obtener perfil' });
    }
  },

  // =====================================
  // 4. CRUD de Usuarios (Admin)
  // =====================================
  getAllUsers: async (req, res) => {
    try {
      const [users] = await db.query('SELECT user_id, name, lastname, email, role, phone FROM users');
      res.json({ success: true, users });
    } catch (error) {
      console.error('Error en getAllUsers:', error);
      res.status(500).json({ success: false, error: 'Error al obtener usuarios' });
    }
  },

  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const [user] = await db.query('SELECT user_id, name, lastname, email, role, phone FROM users WHERE user_id = ?', [id]);
      if (!user || user.length === 0) {
        return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
      }
      res.json({ success: true, user: user[0] });
    } catch (error) {
      console.error('Error en getUserById:', error);
      res.status(500).json({ success: false, error: 'Error al obtener usuario' });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, lastname, email, role, phone } = req.body;
      await db.query(
        'UPDATE users SET name = ?, lastname = ?, email = ?, role = ?, phone = ? WHERE user_id = ?', 
        [name, lastname, email, role, phone, id]
      );
      res.json({ success: true, message: 'Usuario actualizado correctamente' });
    } catch (error) {
      console.error('Error en updateUser:', error);
      res.status(500).json({ success: false, error: 'Error al actualizar usuario' });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      await db.query('DELETE FROM users WHERE user_id = ?', [id]);
      res.json({ success: true, message: 'Usuario eliminado correctamente' });
    } catch (error) {
      console.error('Error en deleteUser:', error);
      res.status(500).json({ success: false, error: 'Error al eliminar usuario' });
    }
  }
};

module.exports = userController;
