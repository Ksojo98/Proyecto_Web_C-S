const db = require('../config/db');

const adminController = {
  getAllContacts: async (req, res) => {
    try {
      const [contacts] = await db.query('SELECT * FROM ContactForm ORDER BY creation_date DESC');

      if (!contacts || contacts.length === 0) {
        return res.status(200).json({
          success: true,
          contacts: [],
          message: 'No hay contactos disponibles'
        });
      }

      res.status(200).json({
        success: true,
        contacts
      });

    } catch (error) {
      console.error('❌ Error al obtener contactos:', error.message);
      res.status(500).json({
        success: false,
        error: 'Error del servidor al obtener contactos'
      });
    }
  }
};

module.exports = adminController;
