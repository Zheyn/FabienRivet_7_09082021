const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./apiRouter').router;

// Instantiate server
const server = express();

server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
// Body-parser config
server.use(bodyParser.urlencoded({ extended: true}));
server.use(bodyParser.json());

// Configure routes
server.get('/', function (req, res) {
  res.setHeader('Content-type', 'text/html');
  res.status(200).send('Hello!');
});

server.use('/api/', apiRouter)

// Launch server
server.listen(3000, function() {
  console.log('Serveur en écoute');
});