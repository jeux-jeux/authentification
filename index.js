const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const CLE_ULTRA = process.env.CLE_ULTRA;
const ALLOWED_TO_WEBSOCKET = process.env.ALLOWED_TO_WEBSOCKET;
const ALLOWED_TO_PRINCIPAL = process.env.ALLOWED_TO_PRINCIPAL;
const ALLOWED_TO_STOCKAGE = process.env.ALLOWED_TO_STOCKAGE;
const CLE_WBS_MNG = process.env.CLE_WBS_MNG;
const CLE_WBS_SRV = process.env.CLE_WBS_SRV;
const CLE_INT_PROXY = process.env.CLE_INT_PROXY;
const CLE_IPHONE = process.env.CLE_IPHONE;
const FIREBASE_URL = process.env.URL_FIREBASE;
const CLOUDLINK_URL = process.env.URL_CLOUDLINK;

// ✅ Route GET avec contrôle des origines
app.get('/', (req, res) => {
  const origin = req.get('Origin');
  const allowedOrigins = ALLOWED_TO_PRINCIPAL;
  // Si aucune origine n'est fournie, on refuse tout de suite
  if (!origin) {
    return res.status(403).json({
      message: 'Accès refusé'
    });
  }

  if (allowedOrigins.includes(origin)) {
    return res.json({
      url: FIREBASE_URL,
      web_socket_server: CLOUDLINK_URL
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
      origine_proxy: ALLOWED_TO_PRINCIPAL,
      origine_stockage: ALLOWED_TO_STOCKAGE
    });
  } else if (req.body.cle === CLE_WBS_SRV) { // <-- placeholder 1 : modifie la condition/action ici
    return res.json({
      allowed_origin: ALLOWED_TO_WEBSOCKET
    });
  } else if (req.body.cle === CLE_WBS_MNG) { // <-- placeholder 2 : modifie la condition/action ici
    return res.json({
      web_socket_server: CLOUDLINK_URL
    });
  } else if (req.body.cle === CLE_INT_PROXY) { // <-- placeholder 3 : modifie la condition/action ici
    return res.json({
      origine_stockage: ALLOWED_TO_STOCKAGE
    });
  } else {
    return res.status(403).json({
      message: 'Accès refusé',
    });
  }
});

app.post('/cle_ultra', (req, res) => {
  if (req.body.cle === CLE_IPHONE) {
    return res.json({
      acces: true
    });
  } else {
    return res.status(403).json({
      acces: false
    });
  }
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
