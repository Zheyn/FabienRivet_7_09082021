const sql = require("./db.js");

// constructor
const User = function(user) {
    this.email = user.email;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.password = user.password
  };
  
  User.signup = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created User: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  };


  // User.login = (userId, result) => {
  //   sql.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {
  //     if (err) {
  //       console.log("error: ", err);
  //       result(err, null);
  //       return;
  //     }
  
  //     if (res.length) {
  //       console.log("found user: ", res[0]);
  //       result(null, res[0]);
  //       return;
  //     }
  
  //     // not found Customer with the id
  //     result({ kind: "not_found" }, null);
  //   });
  // };

  module.exports = User;