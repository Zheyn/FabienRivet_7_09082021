const User = require("../models/user.js");
const bcrypt = require("bcrypt");

// Créer et sauvegarde un nouvel utilisateur
exports.create = (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    // Créer un utilisateur

    const user = new User({
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: hash,
    });

    // Sauvegarde un utilisateur
    User.create(user, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer.",
        });
      else res.send(data);
    });
  });
};
