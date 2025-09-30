const express = require('express');
const cors = require('cors');
const app = express();

// 1) Corps JSON
app.use(express.json());

// 2) CORS
app.use(cors());

// ---------- Compteur RPS amélioré ----------
let rps = 0;          // compteur actuel
let rpsLast = 0;      // dernier RPS calculé

// middleware pour compter les requêtes (sauf /stats)
app.use((req, res, next) => {
  if (req.path !== '/stats') {
    rps++;
  }
  next();
});

// timer qui réinitialise le compteur toutes les 1s et sauvegarde la valeur
setInterval(() => {
  rpsLast = rps;
  rps = 0;
}, 1000);

// route stats
app.get('/stats', (req, res) => {
  res.json({ rps: rpsLast });
});
// ---------- fin compteur ----------

// 3) Récupère la clé et l’URL depuis les variables d’environnement
const CLE_SECRETE    = process.env.CLE_SECRETE;
const FIREBASE_URL   = process.env.FIREBASE_URL;
const CLOUDLINK_URL   = process.env.CLOUDLINK_URL;

// GET /
app.get('/', (req, res) => {
  const origin = req.get('Origin') || '';
  if (origin === 'https://jeux-jeux.github.io') {
    return res.json({ url: FIREBASE_URL, web_socket_server: CLOUDLINK_URL });
  }
  return res.status(403).json({ url: FIREBASE_URL, web_socket_server: CLOUDLINK_URL });
});

// POST /
app.post('/', (req, res) => {
  if (req.body.cle === CLE_SECRETE) {
    return res.json({ url: FIREBASE_URL, web_socket_server: CLOUDLINK_URL });
  }
  return res.status(403).json({ message: 'Accès refusé' });
});

// 4) Lancement
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`⚡️ sur port ${PORT}`));
