const User = require("../models/user.js");

// Créer et sauvegarde un nouvel utilisateur
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Créer un utilisateur
  console.log(req.body)
  const user = new User({
    email: req.body.email,
    name: req.body.name,
  });

  // Sauvegarde un utilisateur
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};