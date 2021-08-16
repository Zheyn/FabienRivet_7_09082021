const express = require('express'); // Importation du framework Express
const app = express();
//const mysql = require('mysql');
// Importations des routes
const userRoutes = require('./routes/user');
// const sauceRoutes = require('./routes/sauce');
// const path = require('path'); // Plugin qui sert dans l'upload des images et permet de travailler avec les répertoires et chemin de fichier


// require('dotenv').config();
// Connexion à la base de données mongoDB et utilisation de process.env pour récupérer les informations de connexion caché dans le fichier .env (variable d'environnement)
// Installation du package dotenv - npm install dotenv
// const db = mysql.createConnection({

//   host: "localhost",
//   user: "root",

// });
// db.connect(function(err) {
//   if (err) throw err;
//   console.log("Connecté à la base de données MySQL!");
// });
// Middleware pour transformer le corps de la requête en JSON en objet JS.
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