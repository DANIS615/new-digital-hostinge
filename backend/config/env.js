// backend/config/env.js
// (Más adelante cargaremos esto desde variables de entorno)
module.exports = {
    port: process.env.PORT || 3001, // Cambié el puerto para no confundir con el anterior
    // dbConnectionString: 'tu_string_de_conexion_a_db'
  };