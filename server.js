import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

let ranking = [];

app.use(cors({
  origin: 'https://melanyaalcaraz.netlify.app',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());


app.get('/api/ranking', (req, res) => {
  res.json(ranking);
});

app.post('/api/ranking', (req, res) => {
  const nuevaPartida = req.body;

  ranking.push(nuevaPartida);
  ranking.sort((a, b) => b.puntos - a.puntos);
  ranking = ranking.slice(0, 20);

  res.status(201).json({ mensaje: 'Partida guardada' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
