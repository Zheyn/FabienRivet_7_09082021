// Package de cryptage du mot de passe
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/index");

// Créé un compte utilisateur
exports.register = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10) // Fonction de cryptage du mot de passe
    .then((hash) => {
      const user = db.User.build({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        isAdmin: 0,
      });
      user
        .save() // Sauvegarde du compte utilisateur
        .then((user) =>
          res.status(201).json({
            email: user.email,
            isAdmin: user.isAdmin,
            user: user.username,
            userId: user.id,
            token: jwt.sign(
              // Création d'un token
              { userId: user.id }, // Encode l'id du compte utilisateur
              "RANDOM_TOKEN_SECRET",
              { expiresIn: "24h" } // Expiration du token,
            ),
          })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Récupère un compte utilisateur
exports.login = (req, res, next) => {
  db.User.findOne({
    where: { email: req.body.email },
  }) // Recherche du compte utilisateur
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password) // Vérification du mot de passe
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            email: user.email,
            isAdmin: user.isAdmin,
            user: user.username,
            userId: user.id,
            token: jwt.sign(
              // Création d'un token
              { userId: user.id }, // Encode l'id du compte utilisateur
              "RANDOM_TOKEN_SECRET",
              { expiresIn: "24h" } // Expiration du token
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.modifyUsers = (req, res, next) => {
  db.User.update(
    {
      email: req.body.email,
      username: req.body.username,
      //attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    },
    { where: { id: res.locals.userId } }
  )
    .then(() =>
      res.status(200).json({message: "Utilisateur modifié"}),
    )
    .catch((error) => res.status(400).json({ error }));
    
    db.User.findOne({
      where: { id: res.locals.userId },
    })
    .then((user) => {
      return res.status(200).json({
        email: user.email,
        isAdmin: user.isAdmin,
        user: user.username,
        userId: user.id
      });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.destroyUser = (req, res, next) => {
  db.User.destroy({
    where: { id: res.locals.userId },
  })
    .then(() => res.status(200).json({ message: "Utilisateur supprimé" }))
    .catch((error) => res.status(400).json({ error }));
};