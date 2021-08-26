// Package de cryptage du mot de passe
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken'); 

// Créé un compte utilisateur
exports.register = (req, res, next) => { 
    bcrypt.hash(req.body.password, 10) // Fonction de cryptage du mot de passe
    .then(hash => {
        const user = new User.build ({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            isAdmin: 0
        });
        user.save() // Sauvegarde du compte utilisateur
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// Récupère un compte utilisateur
exports.login = (req, res, next) => {
    User.findOne({
          where: { email: req.body.email }
    }) 
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password) // Vérification du mot de passe
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            user: user.username,
            isAdmin: user.isAdmin,
            userId: user.id, 
            token: jwt.sign( // Création d'un token
                { userId: user.id }, // Encode l'id du compte utilisateur
                'faeznfizebfgubgijomfnvkozgzegz56eg4z56e4gz65g65g4', 
                { expiresIn: '24h' } // Expiration du token
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};















// const bcrypt = require('bcrypt');
// const jwtUtils = require ('../utils/jwt.utils');
// const models = require('../models');

// // Routes
// module.exports = {
//     register: function(req, res) {
//         //Params
//         const email = req.body.email;
//         const username = req.body.username;
//         const password = req.body.password;
//         console.log(req)
//         if (email == null || username == null || password == null) {
//             return res.status(400).json({ 'error': 'missing parameters'});
//         }

//         models.User.findOne({
//             attributes: ['email'],
//             where: { email: email }
//         })
//         .then(function(userFound) {
//             if (!userFound) {
//                 bcrypt.hash(password, 5, function( err, bcryptedPassword ) {
//                     const newUser = models.User.create({
//                         email: email,
//                         username: username,
//                         password: bcryptedPassword,
//                         isAdmin: 0,
//                     })
//                     .then(function(newUser) {
//                         return res.status(201).json({
//                             'userId': newUser.id
//                         })
//                     })
//                     .catch(function(err) {
//                         return res.status(500).json({ 'error': 'cannot add user'});
//                     })
//                 })
//             } else {
//                 return res.status(409).json({ 'error': 'user already exist' });
//             }
//         })
//         .catch(function(err) {

//         });
//     },
//     login: function(req, res) {
        
//         // Params
//         const email = req.body.email;
//         const password = req.body.password;

//         if (email == null || password == null) {
//             return res.status(400)({ 'error': 'missing parameters'});
//         }
//         // Regex & password

//         models.User.findOne({
//             where: { email: email }
//         })
//         .then(function(userFound) {
//             if (userFound) {

//                 bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
//                     if(resBycrypt) {
//                         return res.status(200).json({
//                             'isAdmin': userFound.isAdmin,
//                             'user': userFound.username,
//                             'userId': userFound.id,
//                             'token': jwtUtils.generateTokenForUser(userFound)
//                         });
//                     } else {
//                         return res.status(403).json({ 'error': 'invalid password'})
//                     }
//                 })
//             } else {
//                 return res.status(404).json({ 'error': 'user not exist in DB'})
//             }
//         })
//         .catch(function(err) {
//             return res.status(500).json({ 'error': 'unbale to verify user'})
//         })
//     },
//     getUserProfile: function(req, res) {
//         // Getting auth header
//         let headerAuth = req.headers['authorization'];
//         let userId = jwtUtils.getUserId(headerAuth);

//         if (userId < 0)
//         return res.status(400).json({ 'error': 'wrong token'});

//         models.User.findOne({
//             attributes: [ 'id', 'email', 'username'],
//             where: { id: userId }
//         }).then(function(user) {
//             if (user) {
//                 res.status(201).json(user);
//             } else {
//                 res.status(404).json({ 'error': 'user not found'});
//             }
//         }).catch(function(err) {
//             res.status(500).json({ 'error': 'cannot fetch user'})
//         });
//     },
    // updateUserProfile: function(req, res) {
    //     // Getting auth header
    //     let headerAuth = req.headers['authorization'];
    //     let userId = jwtUtils.getUserId(headerAuth)

    //     //A faire !
    // }
// }