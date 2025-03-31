const db = require('./config/db');

async function testConnection() {
  try {
    const [rows] = await db.query('SELECT * FROM users LIMIT 1');
    console.log('✅ Conexión exitosa. Datos:', rows);
  } catch (err) {
    console.error('❌ Error de conexión:', err);
  }
}

testConnection();