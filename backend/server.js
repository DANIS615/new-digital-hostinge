// backend/server.js
require('dotenv').config();
const express = require('express');
const app = express();

const port = process.env.PORT || 3001;

// Importar rutas
const healthRoutes = require('./routes/health.routes');
const userRoutes = require('./routes/user.routes'); // <-- Nueva línea

// Middleware para parsear JSON
app.use(express.json());

// Usar las rutas
app.use('/api/health', healthRoutes);
app.use('/api/users', userRoutes); // <-- Nueva línea: Todas las rutas de usuario usarán el prefijo /api/users

app.get('/', (req, res) => {
  res.send('Welcome to the structured New Digital Host API!');
});

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