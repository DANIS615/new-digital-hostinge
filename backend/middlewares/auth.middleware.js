// backend/middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

  // Los tokens JWT usualmente se envían en la cabecera 'Authorization' con el prefijo 'Bearer'
  // Ejemplo: Authorization: Bearer <token>
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Obtener el token de la cabecera (quitando 'Bearer ')
      token = req.headers.authorization.split(' ')[1];

      // Verificar el token usando el mismo secreto con el que se firmó
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Añadir el payload decodificado del usuario al objeto 'req'
      // para que las rutas protegidas puedan acceder a la información del usuario
      req.user = decoded.user; // Asumiendo que el payload del token tiene una propiedad 'user'

      next(); // Si el token es válido, pasar al siguiente middleware o al controlador de la ruta
    } catch (error) {
      console.error('Error al verificar el token:', error.message);
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Token no válido.' });
      }
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expirado.' });
      }
      return res.status(401).json({ message: 'No autorizado, token falló.' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'No autorizado, no se proporcionó token.' });
  }
};

// (Opcional) Middleware para roles específicos, si lo necesitas en el futuro
// const authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!req.user || !roles.includes(req.user.role)) { // Asume que req.user.role existe
//       return res.status(403).json({ message: 'No tienes permiso para realizar esta acción.' });
//     }
//     next();
//   };
// };

module.exports = {
  protect,
  // authorize, // Descomenta si añades la función authorize
};