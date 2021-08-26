const bcrypt = require('bcrypt');
const jwtUtils = require ('../middleware/auth');
const models = require('../models');

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
                            'userId': newUser.id
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
                            'isAdmin': userFound.isAdmin,
                            'user': userFound.username,
                            'userId': userFound.id,
                            'token': jwtUtils.generateTokenForUser(userFound)
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
    // updateUserProfile: function(req, res) {
    //     // Getting auth header
    //     let headerAuth = req.headers['authorization'];
    //     let userId = jwtUtils.getUserId(headerAuth)

    //     //A faire !
    // }
}