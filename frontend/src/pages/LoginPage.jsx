// src/pages/LoginPage.js
import React, { useState } from 'react';
import './LoginPage.css'; // Crearemos este archivo para los estilos

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Por favor, ingresa email y contraseña.');
      setLoading(false);
      return;
    }

    try {
      // Aquí haremos la llamada a la API
      console.log('Intentando iniciar sesión con:', { email, password });
      // Simulación de llamada a API
      // Reemplazar con la llamada real más adelante
      const response = await fetch('http://localhost:3001/api/users/login', { // Asegúrate que el puerto sea el de tu backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Si la respuesta no es OK (ej. 400, 401, 500), lanza un error con el mensaje del backend
        throw new Error(data.message || 'Error al iniciar sesión.');
      }

      // Si el login es exitoso:
      console.log('Login exitoso:', data);
      // Aquí guardarías el token (ej. en localStorage o en el estado global)
      // y redirigirías al usuario al dashboard o página principal.
      // Por ahora, solo mostramos un mensaje.
      alert(`Login exitoso! Token: ${data.token.substring(0, 30)}...`); // Solo muestra una parte del token
      // Ejemplo: localStorage.setItem('authToken', data.token);
      // Ejemplo: window.location.href = '/dashboard'; // O usar React Router para navegar

    } catch (err) {
      console.error('Error en el handleSubmit:', err);
      setError(err.message || 'Ocurrió un error. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
        {/* Podrías añadir un enlace a la página de registro aquí */}
        {/* <p>¿No tienes cuenta? <a href="/register">Regístrate</a></p> */}
      </div>
    </div>
  );
};

export default LoginPage;