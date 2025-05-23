// backend/controllers/health.controller.js

const getHealthStatus = (req, res) => {
    // Aquí podrías añadir lógica más compleja en el futuro,
    // como verificar la conexión a la base de datos.
    res.status(200).json({ status: 'UP', message: 'Backend is healthy and structured!' });
  };
  
  module.exports = {
    getHealthStatus,
  };