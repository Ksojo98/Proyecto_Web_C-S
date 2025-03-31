const db = require('../config/db');

class User {
  static async create({ name, lastname, email, password, phone }) {
    const [result] = await db.query(
      'CALL nuevoUsuario(?, ?, ?, ?, ?)',
      [name, lastname, email, password, phone]
    );
    return result;
  }

  static async findByEmail(email) {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  }
}

module.exports = User;