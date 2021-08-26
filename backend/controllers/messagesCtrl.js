// Imports
const Message = require('../models/message')
const User = require('../models/user')

exports.createMessage = (req, res, next) => {
  const messageObject = JSON.parse(req.body.content);
  const message = new Message({
    ...messageObject,
    // attachment: attachment,
      title: title,
      content: content,
      likes: 0,
  });
  message.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.modifyMessage = (req, res, next) => {
  Message.update(
      { content: content },
      { where: { id: req.params.id } }
  )
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.destroyMessage = (req, res, next) => {
  Message.destroy(
    { where: { id: req.params.id } }
  )
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.listMessage = (req, res, next) => {
    let fields = req.query.fields;
    let limit = parseInt(req.query.limit);
    let offset = parseInt(req.query.offset);
    let order = req.query.order;
  Message.findAll({
    order: [order != null ? order.split(":") : ["title", "ASC"]],
    attributes: fields !== "*" && fields != null ? fields.split(",") : null,
    limit: !isNaN(limit) ? limit : null,
    offset: !isNaN(offset) ? offset : null,
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
}






// module.exports = {
  
//   listMessage: function (req, res) {
    // let fields = req.query.fields;
    // let limit = parseInt(req.query.limit);
    // let offset = parseInt(req.query.offset);
    // let order = req.query.order;

//     if (limit > ITEMS_LIMIT) {
//       limit = ITEMS_LIMIT;
//     }

    // models.Message.findAll({
    //   order: [order != null ? order.split(":") : ["title", "ASC"]],
    //   attributes: fields !== "*" && fields != null ? fields.split(",") : null,
    //   limit: !isNaN(limit) ? limit : null,
    //   offset: !isNaN(offset) ? offset : null,
    //   include: [
    //     {
    //       model: models.User,
    //       attributes: ["username"],
    //     },
    //   ],
    // })
//       .then(function (messages) {
//         if (messages) {
//           res.status(200).json(messages);
//         } else {
//           res.status(404).json({ error: "no messages found" });
//         }
//       })
//       .catch(function (err) {
//         console.log(err);
//         res.status(500).json({ error: "invalid fields" });
//       });
//   },
//   destroyMessage: function (req, res) {
//     let headerAuth = req.headers["authorization"];
//     let userId = jwtUtils.getUserId(headerAuth);

//     asyncLib.waterfall(
//       [
//         function (done) {
//           models.User.findOne({
//             where: { id: userId },
//           })
//             .then(function (userFound) {
//               console.log("COUCOU3333");
//               done(null, userFound);
//             })
//             .catch(function (err) {
//               console.log("COUCOU22222");
//               return res.status(500).json({ error: "unable to verify user" });
//             });
//         },
//         function (userFound, done) {
//           console.log("COUCOU4444");
//           if (userFound) {
//             let messageId = req.body.id;
//             models.Message.destroy({
//               where: { id: messageId },
//             }).then(function (destroyMessage) {
//               done(destroyMessage);
//             });
//           } else {
//             res.status(404).json({ error: "user not found" });
//           }
//         },
//       ],
//       function (destroyMessage) {
//         if (destroyMessage) {
//           return res.status(201).json(destroyMessage);
//         } else {
//           return res.status(500).json({ error: "cannot destroy message" });
//         }
//       }
//     );
//   },
//   modifyMessage: function (req, res) {
//     // Getting auth header
//     let headerAuth = req.headers["authorization"];
//     let userId = jwtUtils.getUserId(headerAuth);

//     //Params
//     let content = req.body.content;
//     let messageId = req.body.messageId;
//     //let attachment = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
//     console.log(userId);
//     asyncLib.waterfall(
//       [
//         function (done) {
//           models.User.findByPk(userId)
//             .then(function (userFound) {
//               done(null, userFound);
//             })
//             .catch(function (err) {
//               console.log(err);
//               return res.status(500).json({ error: "unable to verify user" });
//             });
//         },
//         function (userFound, done) {
//           console.log("COUCOU");
//           if (userFound) {
//             models.Message.update(
//               { content: content },
//               { where: { id: req.body.id } }
//             ).then(function (updateMessage) {
//               done(updateMessage);
//             });
//           } else {
//             res.status(404).json({ error: "user not found" });
//           }
//         },
//       ],
//       function (newMessage) {
//         if (newMessage) {
//           return res.status(201).json(newMessage);
//         } else {
//           return res.status(500).json({ error: "cannot post message" });
//         }
//       }
//     );
//   },
// };
