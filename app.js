require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');
const apiRoutes = require('./routes/apiRoutes'); 

const app = express();
const PORT = process.env.PORT || 3000;

// ======================================
// Middleware base
// ======================================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================================
// Archivos estáticos (HTML, CSS, JS)
// ======================================
app.use(express.static(path.join(__dirname, 'public')));

// ======================================
// Rutas de vistas HTML (ej. "/", "/login", etc.)
// ======================================
app.use('/', mainRoutes);    
app.use('/', userRoutes);    

// ======================================
// Rutas de API protegidas y lógicas de backend
// ======================================
app.use('/api', apiRoutes); 

// ======================================
// Manejo de errores
// ======================================
app.use((err, req, res, next) => {
  console.error('💥 Error en middleware global:', err.stack);
  res.status(500).send('Error interno del servidor');
});

// ======================================
// Inicializar servidor
// ======================================
app.listen(PORT, () => {
  console.log(`\n=================================`);
  console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
  console.log(`=================================\n`);
});
