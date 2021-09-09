const db = require("../models/index");

exports.listUsers = (req, res, next) => {
  if (req.body.isAdmin = true) {
    db.User.findAll()
      .then((users) => res.status(200).json(users))
      .catch((error) => res.status(400).json({ error }));
  } else {
    console.log("error");
  }
};

exports.destroyUser = (req, res, next) => {
    db.User.destroy({
      where: { id: req.body.idUser },
      //DELETE FROM `Users` WHERE `id` = Numéro Id
    })
      .then(() => res.status(200).json({ message: "Utilisateur supprimé" }))
      .catch((error) => res.status(400).json({ error }));
  };