const db = require("../models/index");

// Récupération du module 'file system' de Node permettant de gérer ici les téléchargements et modifications d'images
const fs = require("fs");

exports.createMessage = (req, res, next) => {
  let attachment;
  if (req.file) {
    attachment = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  }
  const message = db.Message.build({
    UserId: res.locals.userId,
    content: req.body.content,
    attachment: attachment,
    likes: 0,
  });
  message
    .save()
    .then(() => {    
      db.Message.findOne({
        where: { id: message.id},
        include: [
          {
            model: db.User,
            attributes: ["username"],
          },
        ],
      })
        .then((message) => res.status(200).json(message))
        .catch((error) => res.status(400).json({ error }));  
      
      
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyMessage = (req, res, next) => {
  db.Message.update(
    {
      content: req.body.content,
      //attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    },
    { where: { id: req.body.id } }
  )
    .then(() => res.status(200).json({ message: "Message modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.destroyMessage = (req, res, next) => {
  db.Message.destroy({
        where: { id: req.body.id },
      })
        .then(() => res.status(200).json({ message: "Message supprimé !" }))
        .catch((error) => res.status(400).json({ error }));
  // db.Message.findOne({
  //   where: { id: req.body.id },
  // }).then((message) => {
  //   if (message.attachment) {
  //     const filename = message.attachment.split("/images/")[1];
  //     fs.unlink(`images/${filename}`, () => {
  //       db.Message.destroy({
  //         where: { id: req.body.id },
  //       })
  //         .then(() => res.status(200).json({ message: "Message supprimé !" }))
  //         .catch((error) => res.status(400).json({ error }));
  //     });
  //   } else {
  //     db.Message.destroy({
  //       where: { id: req.body.id },
  //     })
  //       .then(() => res.status(200).json({ message: "Message supprimé !" }))
  //       .catch((error) => res.status(400).json({ error }));
  //   }
  // });
};

exports.listMessage = (req, res, next) => {
  db.Message.findAll({
    order: [["id", "DESC"]],
    include: [
      {
        model: db.User,
        attributes: ["username"],
      },
    ],
  })
    .then((messages) => res.status(200).json(messages))
    .catch((error) => res.status(400).json({ error }));
};
