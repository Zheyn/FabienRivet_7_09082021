const express = require('express');
const router = express.Router(); 
const auth = require('../middleware/auth')
const messageCtrl = require('../controllers/messagesCtrl');
const multer = require('../middleware/multer-config');

router.post('/create', auth, multer, messageCtrl.createMessage);
router.put('/modify/', auth, multer, messageCtrl.modifyMessage);
router.get('/list', auth, messageCtrl.listMessage);

module.exports = router;