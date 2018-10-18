var express = require('express');
var router = express.Router();
var db = require('../commonjs/db');

router.post("/login", function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  console.log("*************get login***************");
  console.log(username);
  console.log(password);
  var selectSQL = "select * from login_user where name = '" + username + "' and passwd = '" + password + "'";
  db.querySql(selectSQL, "", function (err, result) {//查询所有news表的数据
    console.log(result);
    if (result.recordset.length > 0) {
      console.log("find it!");
      var user = {
        username: username,
        password: password,
        level: result.recordset[0].level
      };
      req.session.user = user;
      res.sendStatus(200);
      // res.send("1");
    }
    else {
      console.log("Not exit!");
      res.sendStatus(404);
      // res.send("0");
    }

  });
});
router.post("/modifyPwd", function (req, res, next) {
  var oldpasswd = req.body.oldpasswd;
  var newpasswd = req.body.newpasswd;
  console.log("*************get modifyPwd***************");
  var user = req.session.user;
  var username = user.username;
  var password = user.password;
  // if (oldpasswd != password) {
  //   console.log("原密码错误~");
  //   res.send("0");
  //   return;
  //   // res.sendStatus(404);
  // }
  // var selectSQL = "select * from login_user where name = '" + username + "' and passwd = '" + password + "'";
  var updateObj = { "name": username, "passwd": newpasswd };
  var whereObj = { "name": username, "passwd": oldpasswd };
  db.update(updateObj, whereObj, "login_user", function (err, result) {//查询所有news表的数据
    console.log(result);
    if (result.rowsAffected > 0) {
      console.log("find it!");
      // res.send("1");
      // return;
      res.sendStatus(200);
      // res.send("1");
    }
    else {
      console.log("Not exit!");
      res.sendStatus(404);
      return;
      // res.send("0");
    }

  });
});
module.exports = router;
