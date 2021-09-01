const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/adminCtrl');
const auth = require('../middleware/auth')

router.get('/', auth, userCtrl.listUsers);
router.delete('/', auth, userCtrl.destroyUser);
// router.get('/list', userCtrl.listUsers)

module.exports = router;