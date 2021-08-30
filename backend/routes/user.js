const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/usersCtrl');
const auth = require('../middleware/auth')

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.put('/modify', auth, userCtrl.modifyUsers);
router.delete('/destroy', auth, userCtrl.destroyUser);
// router.get('/list', userCtrl.listUsers)

module.exports = router;