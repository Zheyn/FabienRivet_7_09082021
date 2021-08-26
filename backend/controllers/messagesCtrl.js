// Imports
const models = require("../models");
const asyncLib = require("async");
const jwt = require("../middleware/auth");

// Constants
const ITEMS_LIMIT = 50;

// Routes
module.exports = {
  createMessage: function (req, res) {
    // Getting auth header
    let headerAuth = req.headers["authorization"];
    let userId = jwt.getUserId(headerAuth);

    //Params
    let title = req.body.title;
    let content = req.body.content;
    //let attachment = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

    // if (title == null || content == null) {
    //     return res.status(400).json({ 'error': 'missing parameters'});
    // }
    // if (title.length <= 2 || content.length <= 4) {
    //     return res.status(400).json({ 'error': 'invalid parameters'});
    // }

    asyncLib.waterfall(
      [
        function (done) {
          models.User.findOne({
            where: { id: userId },
          })
            .then(function (userFound) {
              done(null, userFound);
            })
            .catch(function (err) {
              return res.status(500).json({ error: "unable to verify user" });
            });
        },
        function (userFound, done) {
          if (userFound) {
            models.Message.create({
              // attachment: attachment,
              title: title,
              content: content,
              likes: 0,
              UserId: userFound.id,
            }).then(function (newMessage) {
              done(newMessage);
            });
          } else {
            res.status(404).json({ error: "user not found" });
          }
        },
      ],
      function (newMessage) {
        if (newMessage) {
          return res.status(201).json(newMessage);
        } else {
          return res.status(500).json({ error: "cannot post message" });
        }
      }
    );
  },
  listMessage: function (req, res) {
    let fields = req.query.fields;
    let limit = parseInt(req.query.limit);
    let offset = parseInt(req.query.offset);
    let order = req.query.order;

    if (limit > ITEMS_LIMIT) {
      limit = ITEMS_LIMIT;
    }

    models.Message.findAll({
      order: [order != null ? order.split(":") : ["title", "ASC"]],
      attributes: fields !== "*" && fields != null ? fields.split(",") : null,
      limit: !isNaN(limit) ? limit : null,
      offset: !isNaN(offset) ? offset : null,
      include: [
        {
          model: models.User,
          attributes: ["username"],
        },
      ],
    })
      .then(function (messages) {
        if (messages) {
          res.status(200).json(messages);
        } else {
          res.status(404).json({ error: "no messages found" });
        }
      })
      .catch(function (err) {
        console.log(err);
        res.status(500).json({ error: "invalid fields" });
      });
  },
  destroyMessage: function (req, res) {
    let headerAuth = req.headers["authorization"];
    let userId = jwt.getUserId(headerAuth);

    asyncLib.waterfall(
      [
        function (done) {
          models.User.findOne({
            where: { id: userId },
          })
            .then(function (userFound) {
              done(null, userFound);
            })
            .catch(function (err) {
              return res.status(500).json({ error: "unable to verify user" });
            });
        },
        function (userFound, done) {
          if (userFound) {
            let messageId = req.body.id;
            models.Message.destroy({
              where: { id: messageId },
            }).then(function (destroyMessage) {
              done(destroyMessage);
            });
          } else {
            res.status(404).json({ error: "user not found" });
          }
        },
      ],
      function (destroyMessage) {
        if (destroyMessage) {
          return res.status(201).json(destroyMessage);
        } else {
          return res.status(500).json({ error: "cannot destroy message" });
        }
      }
    );
  },
  modifyMessage: function (req, res) {
    // // Getting auth header
    let headerAuth = req.headers["authorization"];
    let userId = jwt.getUserId(headerAuth);

    //Params
    let content = req.body.content;
    let messageId = req.body.id;
    //let attachment = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    asyncLib.waterfall(
      [
        function (done) {
          models.User.findByPk(userId)
            .then(function (userFound) {
              done(null, userFound);
            })
            .catch(function (err) {
              console.log(err);
              return res.status(500).json({ error: "unable to verify user" });
            });
        },
        function (userFound, done) {
          if (userFound) {
            models.Message.update(
              { content: content },
              { where: { id: messageId } }
            ).then(function (updateMessage) {
              done(updateMessage);
            });
          } else {
            res.status(404).json({ error: "user not found" });
          }
        },
      ],
      function (newMessage) {
        if (newMessage) {
          return res.status(201).json(newMessage);
        } else {
          return res.status(500).json({ error: "cannot post message" });
        }
      }
    );
  },
};