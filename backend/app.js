const express = require('express');
const bodyParser = require('body-parser');
const messageRoutes = require('./routes/message');
const userRoutes = require('./routes/user');
const adminRoutes = require ('./routes/admin')
const path = require('path');

// Instantiate app
const app = express();

// Body-parser config
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


//multer
app.use('/images', express.static(path.join(__dirname, 'images')));


app.use('/api/auth', userRoutes);
app.use('/api/messages', messageRoutes)
app.use('/api/admin', adminRoutes)

module.exports = app; // Export de l'application