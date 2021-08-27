const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/usersCtrl');

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.put('/modify', userCtrl.modifyUsers);
router.delete('/destroy', userCtrl.destroyUser);
router.get('/list', userCtrl.listUsers)

module.exports = router;