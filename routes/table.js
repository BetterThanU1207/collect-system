var express = require('express');
var router = express.Router();
var db = require('../commonjs/db');

router.post("/item", function (req, res, next) {
  db.selectAll("item", function (err, result) {//查询所有news表的数据
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
router.post("/item/query", function (req, res, next) {
  var whereSQL = "";
  var custNo = req.body.no;
  var custName = req.body.name;
  if (custNo != "") {
    whereSQL += "where custNo = '" + custNo + "'";
  };
  if (custName != "") {
    whereSQL += "and custName = '" + custName + "'";
  };
  var selectSQL = "select * from item";
  if (custNo != "" && custName != "") {
    selectSQL += " where custNo = '" + custNo + "'" + " and custName = '" + custName + "'";
  } else if (custNo == "" && custName != "") {
    selectSQL += " where custName = '" + custName + "'";
  } else if (custNo != "" && custName == "") {
    selectSQL += " where custNo = '" + custNo + "'";
  };
  // db.selec("item", "", whereSQL, "", "", function (err, result) {//查询所有news表的数据
  db.querySql(selectSQL, "", function (err, result) {
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
router.post("/item/delete", function (req, res, next) {
  var custNo = req.body.param;
  var whereSQL = "where custNo = '" + custNo + "'";
  db.del(whereSQL, "", "item", function (err, result) {//查询所有news表的数据
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
router.post("/item/add", function (req, res, next) {
  var custName = req.body.name;
  var addObj = { "custName": custName };
  db.add(addObj, "item", function (err, result) {//查询所有news表的数据
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
  var updateObj = { "custName": custName };
  var whereObj = { "custNo": custNo };
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
router.post("/menu", function (req, res, next) {
  db.selectAll("menu", function (err, result) {//查询所有news表的数据
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
router.post("/menu/delete", function (req, res, next) {
  var id = req.body.param;
  var whereSQL = "where id = '" + id + "'";
  db.del(whereSQL, "", "menu", function (err, result) {//查询所有news表的数据
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
router.post("/menu/add", function (req, res, next) {
  var name = req.body.name;
  var fatherid = req.body.fatherid;
  var url = req.body.url;
  var rolelevel = req.body.rolelevel;
  var icon = req.body.icon;
  var addObj = { "name": name, "fatherid": fatherid, "url": url, "rolelevel": rolelevel, "icon": icon };
  db.add(addObj, "menu", function (err, result) {//查询所有news表的数据
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
router.post("/menu/modify", function (req, res, next) {
  var id = req.body.id;
  var name = req.body.name;
  var fatherid = req.body.fatherid;
  var url = req.body.url;
  var rolelevel = req.body.rolelevel;
  var icon = req.body.icon;

  var updateObj = { "name": name, "fatherid": fatherid, "url": url, "rolelevel": rolelevel, "icon": icon };
  var whereObj = { "id": id };
  db.update(updateObj, whereObj, "menu", function (err, result) {//查询所有news表的数据
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
