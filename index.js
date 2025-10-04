const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const CLE_SECRETE  = process.env.CLE_SECRETE;
const FIREBASE_URL = process.env.FIREBASE_URL;
const CLOUDLINK_URL = process.env.CLOUDLINK_URL;

app.get('/', (req, res) => {
  const origin = req.get('Origin') || '';
  if (origin === 'https://jeux-jeux.github.io') {
    return res.json({
      url: FIREBASE_URL,
      web_socket_server: CLOUDLINK_URL
    });
  }
  return res.status(403).json({
    message: 'Origine non autorisée',
    url: FIREBASE_URL,
    web_socket_server: CLOUDLINK_URL
  });
});

app.post('/', (req, res) => {
  if (req.body.cle === CLE_SECRETE) {
    return res.json({
      url: FIREBASE_URL,
      web_socket_server: CLOUDLINK_URL
    });
  }
  return res.status(403).json({ 
    message: 'Accès refusé',
    url: FIREBASE_URL,
    web_socket_server: CLOUDLINK_URL
  });
});

// ✅ Render attribue le port via process.env.PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`⚡️ Proxy authentification actif sur le port ${PORT}`);
});
