const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/users', user.create);

module.exports = router;
