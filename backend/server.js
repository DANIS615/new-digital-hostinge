// backend/server.js
require('dotenv').config();
require('./config/firebaseConfig');
const express = require('express');
const cors = require('cors'); // <-- Importa cors
const app = express();

const port = process.env.PORT || 3001;

// --- Middlewares ---
// Habilita CORS para todas las rutas y orígenes (para desarrollo)
// Para producción, deberías configurarlo para permitir solo tu dominio de frontend
app.use(cors()); // <-- Usa cors

app.use(express.json()); // Parsear JSON

// --- Rutas ---
const healthRoutes = require('./routes/health.routes');
const userRoutes = require('./routes/user.routes');

app.use('/api/health', healthRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the structured New Digital Host API!');
});

// --- Manejo de Errores ---
app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

app.listen(port, () => {
  console.log(`Structured backend server listening at http://localhost:${port}`);
});