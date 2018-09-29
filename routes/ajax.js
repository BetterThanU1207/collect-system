var express = require('express');
var router = express.Router();
var db = require('../commonjs/db')

router.post("/login", function(req, res, next) {
  var  username=req.body.username;
  var password=req.body.password;
  console.log("*************get login***************");
  console.log(username);
  console.log(password);
  var selectSQL = "select * from login_user where name = '"+username+"' and passwd = '"+password+"'";
  db.querySql(selectSQL, "", function (err, result) {//查询所有news表的数据
    console.log(result);
    if(result.recordset.length > 0){
      console.log("find it!");
      var user = {
        username : username,
        password : password,
        level : result.recordset[0].level
      };
      req.session.user = user;
      res.jsonp("1");
    }
    else{
      console.log("Not exit!");
      res.jsonp("0");
    }
    //res.render('newsList', {results:records.recordset, moment:moment});
  });
});
module.exports = router;
