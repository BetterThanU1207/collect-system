var express = require('express');
var router = express.Router();
var db = require('../commonjs/db');

router.post("/item", function (req, res, next) {
  db.selectAll("item", function (err, result) {//查询所有news表的数据
    console.log(result);
    if (result.recordset.length > 0) {
      console.log("find it!");
      res.json(result.recordset);
    }
    else {
      console.log("Not exit!");
      res.sendStatus(404);
      // res.send("0");
    }
  });
});
router.post("/item/delete", function (req, res, next) {
  var custNo = req.body.param;
  var selectSQL = "where custNo = '" + custNo + "'";
  db.del(selectSQL, "", "item", function (err, result) {//查询所有news表的数据
    console.log(result);
    if (result.rowsAffected > 0) {
      console.log("find it!");
      res.sendStatus(200);
      // res.json(result.recordset);
    }
    else {
      console.log("Not exit!");
      res.sendStatus(404);
      // res.send("0");
    }
  });
});
router.post("/item/modify", function (req, res, next) {
  var custNo = req.body.no;
  var custName = req.body.name;
  console.log(custNo);
  console.log(custName);
  var updateObj = { "custNo": custNo, "custName": custName };
  var whereObj = { "custNo": custNo};
  db.update(updateObj, whereObj, "item", function (err, result) {//查询所有news表的数据
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
