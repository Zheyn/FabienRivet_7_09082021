const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/users', userCtrl);

module.exports = router;


// module.exports = app => {
//     const users = require("../controllers/user.js");
  
//     // Create a new Customer
//     app.post("/users", users.create);
// }