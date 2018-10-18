var express = require('express');
var router = express.Router();

var fs = require('fs'); // 引入fs模块
var db = require('../commonjs/db');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('login', { title: '智能水表集抄系统' });
});

/* GET home page. */
router.get("/home", function (req, res) {
	var user = req.session.user;
    var name = user.username;
	var level = user.level;
	console.log("用户："+ name + "等级："+ level);
	var selectSQL = "select * from menu where rolelevel <= '" + level + "'";
	db.querySql(selectSQL, "", function (err, result) {//查询所有news表的数据
		// console.log(result);
		console.log(result.recordset);
		if (result.recordset.length > 0) {
			var datalist = [];
			for (var i = 0; i < result.recordset.length; i++) {
				if (result.recordset[i].fatherid == 0) {
					//创建data对象
					var data = {
						id: result.recordset[i].id,
						iconCls: result.recordset[i].icon,
						text: result.recordset[i].name,
						children: []
					};

					//通过for循环追加数据
					for (var j = 0; j < result.recordset.length; j++) {
						if (result.recordset[j].fatherid == result.recordset[i].id) {
							var obj = {
								id: result.recordset[j].id,
								iconCls: result.recordset[j].icon,
								text: result.recordset[j].name,
								url: result.recordset[j].url
							};
							data.children.push(obj);
						}
					}
					datalist.push(data);
				}
			}
			//把data对象转换为json格式字符串
			var content = "var menuData = " + JSON.stringify(datalist);
			//console.log(content);
			// 写入文件内容（如果文件不存在会创建一个文件）
			// 写入时会先清空文件
			// fs.writeSync(fs.openSync('./public/homepage/data/menudata.js','w'), content, function (err) {
			fs.writeFile('./public/homepage/data/menudata.js', content, function (err) {
				if (err) {
					throw err;
				}
				console.log('Saved.');
				// 存储完毕再渲染主页
				res.render("home", { title: '智能水表集抄系统', username: name });         //已登录则渲染home页面
				// 写入成功后读取测试    
				fs.readFile('./public/homepage/data/menudata.js', 'utf-8', function (err, data) {
					if (err) {
						throw err;
					}
					// res.render("home", { title: '智能水表集抄系统', username: name });         //已登录则渲染home页面
					//console.log(data);
				});
			});
		}
	});
	
});
router.get('/pswchange.html', function (req, res, next) {
	res.render('pswchange', { title: '' });
});

router.get('/DetailView.html', function (req, res, next) {
	res.render('tables/DetailView', { title: '' });
});
router.get('/editable.html', function (req, res, next) {
	res.render('tables/editable', { title: '' });
});
router.get('/edittable.html', function (req, res, next) {
	res.render('tables/edittable', { title: '' });
});
router.get('/export.html', function (req, res, next) {
	res.render('tables/export', { title: '' });
});
router.get('/Format.html', function (req, res, next) {
	res.render('tables/Format', { title: '' });
});
router.get('/jQueryshow.html', function (req, res, next) {
	res.render('tables/jQueryshow', { title: '' });
});
router.get('/Pagination.html', function (req, res, next) {
	res.render('tables/Pagination', { title: '' });
});
router.get('/Toolbar.html', function (req, res, next) {
	res.render('tables/Toolbar', { title: '' });
});
router.get('/x-editable.html', function (req, res, next) {
	res.render('tables/x-editable', { title: '' });
});


/* GET logout page. */
router.get("/logout", function (req, res) {    // 到达 /logout 路径则登出， session中user,error对象置空，并重定向到根路径
	req.session.user = null;
	req.session.error = null;
	res.redirect("/");
});

module.exports = router;
