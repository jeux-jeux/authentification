const express = require('express');
const app = express();

// Pour pouvoir lire le corps des requêtes POST en JSON
app.use(express.json());

// Configuration
const PORT = process.env.PORT || 3000;
const ALLOWED_ORIGIN = 'https://le-jeu/';
const SECRET_KEY = '4927-3047-4398-3947-0274';

// Route GET « / »
app.get('/', (req, res) => {
  const origin = req.get('Origin') || '';
  if (origin === ALLOWED_ORIGIN) {
    return res.json({ url: 'daniel' });
  }
  return res.status(403).json({ message: 'Accès refusé' });
});

// Route POST « / »
app.post('/', (req, res) => {
  const { cle } = req.body;
  if (cle === SECRET_KEY) {
    return res.json({ url: 'daniel' });
  }
  return res.status(403).json({ message: 'Accès refusé' });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
