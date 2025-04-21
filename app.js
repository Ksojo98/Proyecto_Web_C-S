require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');
const apiRoutes = require('./routes/apiRoutes'); // Nuevas rutas API

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json()); // Para parsear JSON en las peticiones
app.use(express.urlencoded({ extended: true })); // Para formularios HTML
app.use(express.static(path.join(__dirname, 'public'))); // Archivos estáticos

app.use('/', mainRoutes); // Rutas principales (vistas)
app.use('/', userRoutes); // Rutas de usuario (vistas + /api/login|register)
app.use('/api', apiRoutes); // Todas las demás APIs (ej: /api/reviews)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor');
});

app.listen(PORT, () => {
  console.log(`\n=================================`);
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`=================================\n`);
});