const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const ALLOWED_TO_PRINCIPAL = process.env.ALLOWED_TO_PRINCIPAL;
const ALLOWED_TO_STOCKAGE = process.env.ALLOWED_TO_STOCKAGE;
const CLE_WBS_MNG = process.env.CLE_WBS_MNG;
const CLE_WBS_SRV = process.env.CLE_WBS_SRV;
const CLE_IPHONE = process.env.CLE_IPHONE;
const FIREBASE_URL = process.env.FIREBASE_URL;
const CLOUDLINK_URL = process.env.CLOUDLINK_URL;

// ✅ Route GET avec contrôle des origines
app.get('/', (req, res) => {
  const origin = req.get('Origin') || '';

  const allowedOrigins = [
    'tw-editor://.',
    'tw-editor://',
    'https://cloudlink-manager.onrender.com',
    'https://cloudlink-manager.onrender.com/',
    'https://jeux-jeux.github.io'
  ];

  if (allowedOrigins.includes(origin)) {
    return res.json({
      url: FIREBASE_URL,
      web_socket_server: CLOUDLINK_URL,
      access_to_cloudlink: ALLOWED_TO_WEBSOCKET
    });
  }

  return res.status(403).json({
    message: 'Accès refusé'
  });
});

// ✅ Route POST avec clé secrète
app.post('/', (req, res) => {
  if (req.body.cle === CLE_IPHONE) {
    return res.json({
      url: FIREBASE_URL,
      web_socket_server: CLOUDLINK_URL,
      access_to_cloudlink: ALLOWED_TO_WEBSOCKET
    });
  }

  return res.status(403).json({
    message: 'Accès refusé',
  });
});

// ✅ Route par défaut pour toutes les routes inconnues
app.use((req, res) => {
  res.status(404).json({ message: 'Accès refusé'});
});

// ✅ Render attribue le port via process.env.PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`⚡️ Proxy authentification actif sur le port ${PORT}`);
});
