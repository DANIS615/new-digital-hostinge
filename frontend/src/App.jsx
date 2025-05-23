// src/App.jsx
import React from 'react';
// import LoginPage from './pages/LoginPage.jsx'; // Comenta o elimina esta
import RegisterPage from './pages/RegisterPage.jsx'; // Importa la página de registro
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>New Digital Host</h1>
      </header>
      <main>
        {/* <LoginPage /> */}
        <RegisterPage /> {/* Muestra la página de registro */}
      </main>
    </div>
  );
}

export default App;