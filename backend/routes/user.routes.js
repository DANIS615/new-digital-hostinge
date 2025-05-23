// backend/routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Ruta para registrar un nuevo usuario
// POST /api/users/register
router.post('/register', userController.register);

// Ruta para iniciar sesión
// POST /api/users/login
router.post('/login', userController.login);

module.exports = router;