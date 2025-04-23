import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

let ranking = [];

app.use(cors()); // ¡Habilita CORS!
app.use(express.json());

// Ruta GET para ver el ranking
app.get('/api/ranking', (req, res) => {
  res.json(ranking);
});

// Ruta POST para guardar una nueva partida
app.post('/api/ranking', (req, res) => {
  const nuevaPartida = req.body;

  ranking.push(nuevaPartida);
  ranking.sort((a, b) => b.puntos - a.puntos);
  ranking = ranking.slice(0, 20);

  res.status(201).json({ mensaje: 'Partida guardada' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
