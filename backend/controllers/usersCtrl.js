const bcrypt = require('bcrypt');
const jwt = require ('../middleware/auth');
const models = require('../models');
const asyncLib = require("async");

// Routes
module.exports = {
    register: function(req, res) {
        //Params
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        console.log(req)
        if (email == null || username == null || password == null) {
            return res.status(400).json({ 'error': 'missing parameters'});
        }

        models.User.findOne({
            attributes: ['email'],
            where: { email: email }
        })
        .then(function(userFound) {
            if (!userFound) {
                bcrypt.hash(password, 5, function( err, bcryptedPassword ) {
                    const newUser = models.User.create({
                        email: email,
                        username: username,
                        password: bcryptedPassword,
                        isAdmin: 0,
                    })
                    .then(function(newUser) {
                        return res.status(201).json({
                            'userId': newUser.id,
                            'token': jwt.generateTokenForUser(newUser)
                        })
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error': 'cannot add user'});
                    })
                })
            } else {
                return res.status(409).json({ 'error': 'user already exist' });
            }
        })
        .catch(function(err) {

        });
    },
    login: function(req, res) {
        
        // Params
        const email = req.body.email;
        const password = req.body.password;

        if (email == null || password == null) {
            return res.status(400)({ 'error': 'missing parameters'});
        }
        // Regex & password

        models.User.findOne({
            where: { email: email }
        })
        .then(function(userFound) {
            if (userFound) {

                bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
                    if(resBycrypt) {
                        return res.status(200).json({
                            'email': userFound.email,
                            'isAdmin': userFound.isAdmin,
                            'user': userFound.username,
                            'userId': userFound.id,
                            'token': jwt.generateTokenForUser(userFound)
                        });
                    } else {
                        return res.status(403).json({ 'error': 'invalid password'})
                    }
                })
            } else {
                return res.status(404).json({ 'error': 'user not exist in DB'})
            }
        })
        .catch(function(err) {
            return res.status(500).json({ 'error': 'unbale to verify user'})
        })
    },
    getUserProfile: function(req, res) {
        // Getting auth header
        let headerAuth = req.headers['authorization'];
        let userId = jwtUtils.getUserId(headerAuth);

        if (userId < 0)
        return res.status(400).json({ 'error': 'wrong token'});

        models.User.findOne({
            attributes: [ 'id', 'email', 'username'],
            where: { id: userId }
        }).then(function(user) {
            if (user) {
                res.status(201).json(user);
            } else {
                res.status(404).json({ 'error': 'user not found'});
            }
        }).catch(function(err) {
            res.status(500).json({ 'error': 'cannot fetch user'})
        });
    },
    modifyUsers: function (req, res) {
        // // Getting auth header
        let headerAuth = req.headers["authorization"];
        let userId = jwt.getUserId(headerAuth);
    
        //Params
        let username = req.body.username;
        let email = req.body.email
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
                models.User.update(
                  { username: username,
                    email: email
                  },
                  { where: { id: userId } }
                ).then(function (updateUser) {
                    return res.status(200).json({
                        'email': updateUser.email,
                        'isAdmin': updateUser.isAdmin,
                        'user': updateUser.username,
                        'userId': updateUser.id,
                        'token': jwt.generateTokenForUser(updateUser)
                    });
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
      destroyUser: function (req, res) {
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
                models.User.destroy({
                  where: { id: userId },
                }).then(function (destroyUser) {
                  done(destroyUser);
                });
              } else {
                res.status(404).json({ error: "user not found" });
              }
            },
          ],
          function (destroyUser) {
            if (destroyUser) {
              return res.status(201).json(destroyUser);
            } else {
              return res.status(500).json({ error: "cannot destroy user" });
            }
          }
        );
      },
}