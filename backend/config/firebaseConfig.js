// backend/config/firebaseConfig.js
const admin = require('firebase-admin');

// Reemplaza con el path a tu archivo de credenciales JSON
const serviceAccount = require('./new-digital-host-firebase-adminsdk-fbsvc-27c135e9ae.json'); // <--- ASÍ

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

console.log('Firebase Admin SDK inicializado correctamente. Conectado a Firestore.');

module.exports = { admin, db };