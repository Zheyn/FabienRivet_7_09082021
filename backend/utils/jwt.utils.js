// Import
const jwt = require("jsonwebtoken");

const jwtSecret = "faeznfizebfgubgijomfnvkozgzegz56eg4z56e4gz65g65g4";
// Exported functions
module.exports = {
  generateTokenForUser: function (userData) {
    return jwt.sign(
      {
        userId: userData.id,
        isAdmin: userData.isAdmin
      },
      jwtSecret,
      {
        expiresIn: "24h",
      }
    );
  },
  parseAuthorization: function(authorization) {
    return (authorization != null) ? authorization.replace('Bearer ', '') : null;
  },
  getUserId: function(authorization) {
    let userId = -1;
    let token = module.exports.parseAuthorization(authorization);
    if(token != null) {
      try {
        let jwtToken = jwt.verify(token, jwtSecret);
        if(jwtToken != null)
        userId = jwtToken.userId;
      } catch(err) { }
    }
    return userId;
  }
};
