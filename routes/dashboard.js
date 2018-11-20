var express = require('express');
var router = express.Router();
var db = require('../commonjs/db');

router.post("/bar", function (req, res, next) {
  db.selectAll("bar", function (err, result) {//查询所有news表的数据
    // console.log(result);
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
module.exports = router;
