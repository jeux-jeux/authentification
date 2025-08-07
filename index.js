const express = require('express');
const cors = require('cors');
const app = express();

// 1) Corps JSON
app.use(express.json());

// 2) CORS
app.use(cors());

// 3) Récupère la clé et l’URL depuis les variables d’environnement
const CLE_SECRETE    = process.env.CLE_SECRETE;      // ex. "sk86…"
const FIREBASE_URL   = process.env.FIREBASE_URL;     // ex. "https://…firebaseio.com/users"

// GET /
app.get('/', (req, res) => {
  const origin = req.get('Origin') || '';
  if (origin === 'https://jeux-jeux.github.io') {
    return res.json({ url: FIREBASE_URL });
  }
  return res.status(403).json({ url: FIREBASE_URL });
});

// POST /
app.post('/', (req, res) => {
  if (req.body.cle === CLE_SECRETE) {
    return res.json({ url: FIREBASE_URL });
  }
  return res.status(403).json({ message: 'Accès refusé' });
});

// 4) Lancement
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`⚡️ sur port ${PORT}`));
