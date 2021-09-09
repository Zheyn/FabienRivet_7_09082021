const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/adminCtrl');
const messageCtrl = require('../controllers/messagesCtrl');
const auth = require('../middleware/auth')

router.get('/', auth, userCtrl.listUsers);
router.delete('/', auth, userCtrl.destroyUser);
router.delete('/destroy', auth, messageCtrl.destroyMessage);

module.exports = router;