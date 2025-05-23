// backend/controllers/user.controller.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- ALMACENAMIENTO EN MEMORIA (TEMPORAL) ---
// Reemplazaremos esto con una base de datos más adelante
const users = [];
let userIdCounter = 1;
// --- FIN DE ALMACENAMIENTO EN MEMORIA ---

const register = async (req, res) => {
  try {
    const { email, password, username } = req.body; // Añadimos username

    // Validación básica (puedes mejorarla con librerías como Joi o express-validator)
    if (!email || !password || !username) {
      return res.status(400).json({ message: 'Por favor, proporciona email, nombre de usuario y contraseña.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres.' });
    }

    // Verificar si el email o username ya existen (en nuestro array temporal)
    const existingUserByEmail = users.find(user => user.email === email);
    if (existingUserByEmail) {
      return res.status(400).json({ message: 'El email ya está registrado.' });
    }
    const existingUserByUsername = users.find(user => user.username === username);
    if (existingUserByUsername) {
      return res.status(400).json({ message: 'El nombre de usuario ya está en uso.' });
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear el nuevo usuario (simulado)
    const newUser = {
      id: userIdCounter++,
      username,
      email,
      password: hashedPassword,
      createdAt: new Date()
    };
    users.push(newUser); // Guardar en nuestro array temporal

    console.log('Usuario registrado:', newUser); // Para depuración
    console.log('Todos los usuarios:', users);   // Para depuración

    // No envíes la contraseña hasheada de vuelta en la respuesta productiva
    res.status(201).json({
      message: 'Usuario registrado exitosamente.',
      user: { id: newUser.id, username: newUser.username, email: newUser.email }
    });

  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ message: 'Error interno del servidor al registrar el usuario.' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Por favor, proporciona email y contraseña.' });
    }

    // Encontrar al usuario por email (en nuestro array temporal)
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas (email no encontrado).' });
    }

    // Comparar la contraseña proporcionada con la hasheada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas (contraseña incorrecta).' });
    }

    // Si las credenciales son correctas, generar un token JWT
    const payload = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email
        // Puedes añadir más datos aquí si lo necesitas, pero mantenlo ligero
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }, // El token expirará en 1 hora (puedes ajustarlo)
      (err, token) => {
        if (err) throw err;
        res.json({
          message: 'Inicio de sesión exitoso.',
          token,
          user: { id: user.id, username: user.username, email: user.email }
        });
      }
    );

  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor al iniciar sesión.' });
  }
};

module.exports = {
  register,
  login,
};