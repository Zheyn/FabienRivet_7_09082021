const express = require('express'); // Importation du framework Express
const app = express();

const userRoutes = require('./routes/user');

app.use(express.urlencoded({extended: true}));
app.use(express.json())

// Middleware qui permet de faire communiquer le serveur front et back ensemble
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// app.use('/images', express.static(path.join(__dirname, 'images'))); // Midleware qui permet de charger les fichiers qui sont dans le repertoire images


app.use('/api/user', userRoutes);

module.exports = app; // Export de l'application