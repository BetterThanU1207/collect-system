var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var ejs = require('ejs'); 
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ajaxRouter = require('./routes/ajax');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//设置session
app.use(cookieParser('sessionlogin'));
app.use(session({
  secret : 'sessionlogin',
  resave : true,
  saveUninitialized : true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24   //有效期一天
  }
}));
//登录拦截器
app.use(function (req, res, next) {
  var url = req.originalUrl;
  var arr = req.url.split('/');
  //去除get请求携带的参数
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].split('?')[0];
  }
  console.log(arr);
  console.log(url);
  console.log(req.session.user);
  if (url != "/" && url != "/ajax/login" && !req.session.user){
    // return res.redirect('/');
  };
  next();
})

app.use('/', indexRouter);  // 即为为路径 / 设置路由
//app.use('/login',indexRouter); // 即为为路径 /home 设置路由
app.use('/home',indexRouter); // 即为为路径 /home 设置路由
app.use('/showtable.html',indexRouter);
app.use('/edittable.html',indexRouter);
app.use("/logout",indexRouter); // 即为为路径 /logout 设置路由

app.use('/users', usersRouter); // 即为为路径 /users 设置路由

app.use('/ajax',ajaxRouter); // 即为为路径 /login 设置路由
//app.use('/login',indexRouter); // 即为为路径 /login 设置路由

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;