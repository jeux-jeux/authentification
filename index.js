const express = require('express');
const cors = require('cors');
const app = express();


// 1) Corps JSON
app.use(express.json());

// 2) CORS :
//    - Pour autoriser TOUTES les origines (très simple, mais moins sécurisé) :
app.use(cors());

//    // OU pour n’autoriser que quelques origines :
//    // app.use(cors({
//    //   origin: [
//    //     'https://le-jeu/',
//    //     'https://turbowarp.org',
//    //     'https://scratch.mit.edu',
//    //   ],
//    //   methods: ['GET','POST','OPTIONS'],
//    //   allowedHeaders: ['Content-Type'],
//    // }));

// 3) Routes

// GET /
app.get('/', (req, res) => {
  const origin = req.get('Origin') || '';
  if (origin === 'https://le-jeu/') {
    return res.json({ url: 'daniel' });
  }
  return res.status(403).json({ message: 'Accès refusé' });
});

// POST /
app.post('/', (req, res) => {
  if (req.body.cle === 'sk86jkbh8jvt8nvu9nhunbg9jhgujgf8jbgyjvkj87bgujg5jgruhf8dg6466h') {
    return res.json({ url: 'daniel' });
  }
  return res.status(403).json({ message: 'Accès refusé' });
});

// 4) Lancement
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`⚡️ sur port ${PORT}`));
