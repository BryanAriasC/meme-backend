const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'AAS32SDFN283NNasd3basd';

app.use(cors());

app.use(bodyParser.json());

let data;

fs.readFile('memes.json', 'utf8', (err, jsonData) => {
  if (err) {
    console.error('Error al leer el archivo memes.json:', err);
    return;
  }
  try {
    data = JSON.parse(jsonData);
    console.log('Datos cargados correctamente desde memes.json');
  } catch (parseError) {
    console.error('Error al parsear el contenido de memes.json:', parseError);
  }
});

// GET /memes: Obtiene la lista de memes.
app.get('/memes', (req, res) => {
  if (!data || !data.memes) {
    return res.status(500).json({ error: 'No se han cargado los datos correctamente' });
  }
  res.json(data.memes);
});

// GET /memes/:id: Obtiene un meme específico por su ID.
app.get('/memes/:id', (req, res) => {
  if (!data || !data.memes) {
    return res.status(500).json({ error: 'No se han cargado los datos correctamente' });
  }
  const memeId = parseInt(req.params.id);
  const meme = data.memes.find(m => m.id === memeId);
  if (!meme) {
    return res.status(404).json({ error: 'Meme not found' });
  }
  res.json(meme);
});

// POST /memes: Crea un nuevo meme.
app.post('/memes', (req, res) => {
  if (!data || !data.memes) {
    return res.status(500).json({ error: 'No se han cargado los datos correctamente' });
  }

  const newMeme = req.body;
  
  const newId = data.memes.length > 0 ? Math.max(...data.memes.map(m => m.id)) + 1 : 1;
  newMeme.id = newId;

  data.memes.push(newMeme);
  res.status(201).json(newMeme);
});

// GET /users: Obtiene la lista de usuarios.
app.get('/users', (req, res) => {
  if (!data || !data.users) {
    return res.status(500).json({ error: 'No se han cargado los datos correctamente' });
  }
  res.json(data.users);
});

// GET /users/:id: Obtiene un usuario específico por su ID.
app.get('/users/:id', (req, res) => {
  if (!data || !data.users) {
    return res.status(500).json({ error: 'No se han cargado los datos correctamente' });
  }
  const userId = parseInt(req.params.id);
  const user = data.users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// POST /login: Inicia sesión con un usuario existente.
app.post('/login', (req, res) => {
  if (!data || !data.users) {
    return res.status(500).json({ error: 'No se han cargado los datos correctamente' });
  }
  const { username, password } = req.body;
  const user = data.users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
  const token = jwt.sign({ username: user.username }, SECRET_KEY);
  res.json({ message: 'Login successful', user, token });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
