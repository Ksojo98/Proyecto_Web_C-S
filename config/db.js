const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // Deja como '' si no tienes contraseña
  database: process.env.DB_NAME,
  port: 3306, // Puerto predeterminado de MySQL en XAMPP
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;