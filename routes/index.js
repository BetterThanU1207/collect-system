var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: '智能水表集抄系统' });
});

/* GET home page. */
router.get("/home",function(req,res){ 
	// if(!req.session.user){ 					//到达/home路径首先判断是否已经登录
	// 	req.session.error = "请先登录"
	// 	res.redirect("/");				//未登录则重定向到 /login 路径
	// 	return;
	// }
	res.render("home",{title:'Home'});         //已登录则渲染home页面
});

/* GET logout page. */
router.get("/logout",function(req,res){    // 到达 /logout 路径则登出， session中user,error对象置空，并重定向到根路径
	req.session.user = null;
	req.session.error = null;
	res.redirect("/");
});

module.exports = router;
