const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('memes.json'); // Cambia el nombre del archivo según corresponda
const middlewares = jsonServer.defaults();
const PORT = 3001;

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Endpoint para consultar memes
server.get('/memes', (req, res) => {
    const memes = router.db.get('memes').value();
    res.status(200).json(memes);
});

// Endpoint para obtener un meme específico por su ID
server.get('/memes/:id', (req, res) => {
    const memeId = parseInt(req.params.id);
    const meme = router.db.get('memes').find({ id: memeId }).value();

    if (meme) {
        res.status(200).json(meme);
    } else {
        res.status(404).json({ message: 'Meme no encontrado' });
    }
});

// Endpoint para crear un nuevo meme
server.post('/memes', (req, res) => {
    const newMeme = req.body;
    router.db.get('memes').push(newMeme).write();
    res.status(201).json(newMeme);
});

// Endpoint para consultar usuarios
server.get('/users', (req, res) => {
    const users = router.db.get('users').value();
    res.status(200).json(users);
});

// Endpoint para obtener un usuario específico por su ID
server.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = router.db.get('users').find({ id: userId }).value();

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
});

// Endpoint para el login
server.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = router.db.get('users').find({ username, password }).value();

    if (user) {
        res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } else {
        res.status(401).json({ message: 'Credenciales incorrectas' });
    }
});

server.use(router);

server.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`);
});
