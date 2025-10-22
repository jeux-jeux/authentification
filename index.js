const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const ALLOWED_TO_WEBSOCKET = process.env.ALLOWED_TO_WEBSOCKET;
const ALLOWED_TO_WEBSOCKET_LEVEL = process.env.ALLOWED_TO_WEBSOCKET_LEVEL;
const ALLOWED_TO_PRINCIPAL = process.env.ALLOWED_TO_PRINCIPAL;
const ALLOWED_TO_PRINCIPAL_LEVEL = process.env.ALLOWED_TO_PRINCIPAL_LEVEL;
const ALLOWED_TO_STOCKAGE = process.env.ALLOWED_TO_STOCKAGE;
const ALLOWED_TO_STOCKAGE_LEVEL = process.env.ALLOWED_TO_STOCKAGE_LEVEL;
const ALLOWED_TO_MAIL_LEVEL = process.env.ALLOWED_TO_MAIL_LEVEL;
const ALLOWED_BY_IPHONE_LEVEL = process.env.ALLOWED_BY_IPHONE_LEVEL;
const ALLOWED_TO_MANAGER_LEVEL = process.env.ALLOWED_TO_MANAGER_LEVEL;
const CLE_ULTRA = process.env.CLE_ULTRA;
const CLE_ULTRA_LEVEL = process.env.CLE_ULTRA_LEVEL;
const CLE_MAIL = process.env.ALLOWED_TO_STOCKAGE;
const CLE_WBS_MNG = process.env.CLE_WBS_MNG;
const CLE_WBS_SRV = process.env.CLE_WBS_SRV;
const CLE_WBS_SRV_CONNECT = process.env.CLE_WBS_SRV_CONNECT;
const CLE_WBS_SRV_CONNECT_LEVEL = process.env.CLE_WBS_SRV_CONNECT_LEVEL;
const CLE_INT_PROXY = process.env.CLE_INT_PROXY;
const CLE_INT_PROXY_LEVEL = process.env.CLE_INT_PROXY_LEVEL;
const CLE_IPHONE = process.env.CLE_IPHONE;
const FIREBASE_URL = process.env.URL_FIREBASE;
const CLOUDLINK_URL = process.env.URL_CLOUDLINK;

// ✅ Route GET avec contrôle des origines
app.get('/', (req, res) => {
  const origin = req.get('Origin');
  const allowedOrigins = ALLOWED_TO_PRINCIPAL;
  // Si aucune origine n'est fournie, on refuse tout de suite
  if (!origin) {
    return res.json({
      message: 'Accès refusé'
    });
  }

  if (allowedOrigins.includes(origin)) {
    return res.json({
      url: FIREBASE_URL,
      web_socket_server: CLOUDLINK_URL
    });
  }

  return res.json({
    message: 'Accès refusé'
  });
});


// ✅ Route POST avec clé secrète
app.post('/', (req, res) => {
  if (req.body.cle === CLE_IPHONE && ALLOWED_BY_IPHONE_LEVEL === "code") {
    return res.json({
      allowed_to_websocket: ALLOWED_TO_WEBSOCKET,
      allowed_to_websocket_level: ALLOWED_TO_WEBSOCKET_LEVEL,
      allowed_to_principal: ALLOWED_TO_PRINCIPAL,
      allowed_to_principal_level: ALLOWED_TO_PRINCIPAL_LEVEL,
      allowed_to_stockage: ALLOWED_TO_STOCKAGE,
      allowed_to_stockage_level: ALLOWED_TO_STOCKAGE_LEVEL,
      allowed_to_mail_level: ALLOWED_TO_MAIL_LEVEL,
      allowed_by_iphone_level: ALLOWED_BY_IPHONE_LEVEL,
      allowed_to_manager_level: ALLOWED_TO_MANAGER_LEVEL,
      cle_ultra_level: CLE_ULTRA_LEVEL,
      cle_mail: CLE_MAIL,
      cle_wbs_mng: CLE_WBS_MNG,
      cle_wbs_srv: CLE_WBS_SRV,
      cle_wbs_srv_connect: CLE_WBS_SRV_CONNECT,
      cle_wbs_srv_connect_level: CLE_WBS_SRV_CONNECT_LEVEL,
      cle_int_proxy: CLE_INT_PROXY,
      cle_int_proxy_level: CLE_INT_PROXY_LEVEL,
      cle_iphone: CLE_IPHONE,
      firebase_url: FIREBASE_URL,
      cloudlink_url: CLOUDLINK_URL
    });
  } else if (req.body.cle === CLE_ULTRA && CLE_ULTRA_LEVEL === "code") { // <-- placeholder 1 : modifie la condition/action ici
    return res.json({
      allowed_to_websocket: ALLOWED_TO_WEBSOCKET,
      allowed_to_websocket_level: ALLOWED_TO_WEBSOCKET_LEVEL,
      allowed_to_principal: ALLOWED_TO_PRINCIPAL,
      allowed_to_principal_level: ALLOWED_TO_PRINCIPAL_LEVEL,
      allowed_to_stockage: ALLOWED_TO_STOCKAGE,
      allowed_to_stockage_level: ALLOWED_TO_STOCKAGE_LEVEL,
      allowed_to_mail_level: ALLOWED_TO_MAIL_LEVEL,
      allowed_by_iphone_level: ALLOWED_BY_IPHONE_LEVEL,
      allowed_to_manager_level: ALLOWED_TO_MANAGER_LEVEL,
      cle_ultra: CLE_ULTRA,
      cle_ultra_level: CLE_ULTRA_LEVEL,
      cle_mail: CLE_MAIL,
      cle_wbs_mng: CLE_WBS_MNG,
      cle_wbs_srv: CLE_WBS_SRV,
      cle_wbs_srv_connect: CLE_WBS_SRV_CONNECT,
      cle_wbs_srv_connect_level: CLE_WBS_SRV_CONNECT_LEVEL,
      cle_int_proxy: CLE_INT_PROXY,
      cle_int_proxy_level: CLE_INT_PROXY_LEVEL,
      cle_iphone: CLE_IPHONE,
      firebase_url: FIREBASE_URL,
      cloudlink_url: CLOUDLINK_URL
    });
  } else if (req.body.cle === CLE_WBS_SRV) { // <-- placeholder 1 : modifie la condition/action ici
    return res.json({
      allowed_origin: ALLOWED_TO_WEBSOCKET,
      level: ALLOWED_TO_WEBSOCKET_LEVEL,
    });
  } else if (req.body.cle === CLE_WBS_MNG) { // <-- placeholder 2 : modifie la condition/action ici
    return res.json({
      web_socket_server: CLOUDLINK_URL,
      level: ALLOWED_TO_MANAGER_LEVEL
    });
  } else if (req.body.cle === CLE_INT_PROXY) { // <-- placeholder 3 : modifie la condition/action ici
    return res.json({
      origine_stockage: ALLOWED_TO_STOCKAGE,
      level: ALLOWED_TO_STOCKAGE_LEVEL
    });
  } else if (req.body.cle === CLE_MAIL) { // <-- placeholder 3 : modifie la condition/action ici
    return res.json({
      level: ALLOWED_TO_MAIL_LEVEL
    });
  } else {
    return res.json({
      message: 'Accès refusé'
    });
  }
});

app.post('/cle-ultra', (req, res) => {
  if (req.body.cle === CLE_ULTRA && CLE_ULTRA_LEVEL === "code") {
    return res.json({
      access: 'true'
    });
  } else {
    return res.json({
      access: 'false'
    });
  }
});

app.post('/cle-wbs', (req, res) => {
  if (req.body.cle === CLE_WBS_SRV_CONNECT && CLE_WBS_SRV_CONNECT_LEVEL === "code") {
    return res.json({
      access: 'False'
    });
  } else {
    return res.json({
      access: 'false'
    });
  }
});

// ✅ Route par défaut pour toutes les routes inconnues
app.use((req, res) => {
  res.json({ message: 'Accès refusé'});
});

// ✅ Render attribue le port via process.env.PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`⚡️ Proxy authentification actif sur le port ${PORT}`);
});
