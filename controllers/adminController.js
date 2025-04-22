// controllers/adminController.js
const db = require('../config/db');

const adminController = {
    getAllContacts: async (req, res) => {
        try {
          const [contacts] = await db.query('SELECT * FROM ContactForm ORDER BY creation_date DESC');
          res.json({ success: true, contacts });
        } catch (error) {
          console.error('Error al obtener contactos:', error);
          res.status(500).json({ success: false, error: 'Error en el servidor' });
        }
      }
    };

module.exports = adminController;
