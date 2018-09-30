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
	// if(!req.session.user){ 					//到达/home路径首先判断是否已经登录
	// 	req.session.error = "请先登录"
	// 	res.redirect("/");				//未登录则重定向到 /login 路径
	// 	return;
	// }
	db.selectAll("menu", function (err, result) {//查询所有news表的数据
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
			console.log(content);
			// 写入文件内容（如果文件不存在会创建一个文件）
			// 写入时会先清空文件

			fs.writeFile('./public/homepage/data/menudata.js', content, function (err) {
				if (err) {
					throw err;
				}
				console.log('Saved.');
				// 写入成功后读取测试    
				fs.readFile('./public/homepage/data/menudata.js', 'utf-8', function (err, data) {
					if (err) {
						throw err;
					}
					console.log(data);
				});
			});
		}
	});
	res.render("home", { title: 'Home' });         //已登录则渲染home页面
});

router.get('/showtable.html', function (req, res, next) {


	res.render('showtable', { title: '' });
});
router.get('/edittable.html', function (req, res, next) {
	res.render('edittable');
});

/* GET logout page. */
router.get("/logout", function (req, res) {    // 到达 /logout 路径则登出， session中user,error对象置空，并重定向到根路径
	req.session.user = null;
	req.session.error = null;
	res.redirect("/");
});

module.exports = router;
