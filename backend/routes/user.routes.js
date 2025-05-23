// backend/routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { protect } = require('../middlewares/auth.middleware'); // Asegúrate que esto esté importado

// Rutas públicas
router.post('/register', userController.register);
router.post('/login', userController.login);

// --- Ruta Protegida de Ejemplo ---
// Solo los usuarios con un token JWT válido podrán acceder a esta ruta
router.get('/profile', protect, (req, res) => { // <--- ESTA ES LA RUTA
  if (req.user) {
    res.json({
      message: 'Bienvenido a tu perfil (ruta protegida).',
      user: req.user
    });
  } else {
    res.status(401).json({ message: 'Usuario no encontrado en la solicitud.' });
  }
});
// --- Fin de Ruta Protegida de Ejemplo ---

module.exports = router;