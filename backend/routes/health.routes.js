// backend/routes/health.routes.js
const express = require('express');
const router = express.Router();
const healthController = require('../controllers/health.controller');

// Definimos la ruta GET /api/health
// Cuando se acceda a esta ruta, se ejecutará la función getHealthStatus del controlador
router.get('/', healthController.getHealthStatus);

module.exports = router;