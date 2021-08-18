const User = require("../models/user.js");
const bcrypt = require("bcrypt");

// // Créer et sauvegarde un nouvel utilisateur
// exports.signup = (req, res) => {
//   bcrypt.hash(req.body.password, 10).then((hash) => {
//     // Validate request
//     if (!req.body) {
//       res.status(400).send({
//         message: "Content can not be empty!",
//       });
//     }
//     // Créer un utilisateur
//     const user = new User({
//       email: req.body.email,
//       firstname: req.body.firstname,
//       lastname: req.body.lastname,
//       password: hash,
//     });

//     // Sauvegarde un utilisateur
//     User.signup(user, (err, data) => {
//       if (err)
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while creating the Customer.",
//         });
//       else res.send(data);
//     });
//   });
// };

// // Find a single Customer with a customerId
// exports.login = (req, res) => {
//   User.findById(req.params.userId, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found User with id ${req.params.userId}.`
//         });
//       } else {
//         res.status(500).send({
//           message: "Error retrieving User with id " + req.params.userId
//         });
//       }
//     } else res.send(data);
//   });
// };


exports.signup = (req, res, next) => { 
  bcrypt.hash(req.body.password, 10) // Fonction de cryptage du mot de passe
  .then(hash => {
      const user = new User ({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: hash
      });
      User.signup(user, (err, data) => {
              if (err)
                res.status(500).send({
                  message:
                    err.message || "Some error occurred while creating the Customer.",
                });
              else res.send(data);
            });
  })
  .catch(error => res.status(500).json({ error }));
};

// // Récupère un compte utilisateur
// exports.login = (req, res, next) => {
//     User.findOne({ email: req.body.email }) // Recherche du compte utilisateur
//     .then(user => {
//       if (!user) {
//         return res.status(401).json({ error: 'Utilisateur non trouvé !' });
//       }
//       bcrypt.compare(req.body.password, user.password) // Vérification du mot de passe
//         .then(valid => {
//           if (!valid) {
//             return res.status(401).json({ error: 'Mot de passe incorrect !' });
//           }
//           res.status(200).json({
//             userId: user._id, 
//             token: jwt.sign( // Création d'un token
//                 { userId: user._id }, // Encode l'id du compte utilisateur
//                 'RANDOM_TOKEN_SECRET', 
//                 { expiresIn: '24h' } // Expiration du token
//             )
//           });
//         })
//         .catch(error => res.status(500).json({ error }));
//     })
//     .catch(error => res.status(500).json({ error }));
// };
