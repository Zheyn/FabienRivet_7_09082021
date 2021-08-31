const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      res.locals.userId = userId
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};







// // Import
// const jwt = require("jsonwebtoken");

// const jwtSecret = "faeznfizebfgubgijomfnvkozgzegz56eg4z56e4gz65g65g4";
// // Exported functions
// module.exports = {
//   generateTokenForUser: function (userData) {
//     return jwt.sign(
//       {
//         userId: userData.id,
//         isAdmin: userData.isAdmin
//       },
//       jwtSecret,
//       {
//         expiresIn: "24h",
//       }
//     );
//   },
//   parseAuthorization: function(authorization) {
//     return (authorization != null) ? authorization.replace('Bearer ', '') : null;
//   },
//   getUserId: function(authorization) {
//     let userId = -1;
//     let token = module.exports.parseAuthorization(authorization);
//     if(token != null) {
//       try {
//         let jwtToken = jwt.verify(token, jwtSecret);
//         if(jwtToken != null)
//         userId = jwtToken.userId;
//       } catch(err) { }
//     }
//     return userId;
//   }
// };
