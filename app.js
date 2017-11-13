//>>引入模块
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
//require()是node.js提供的函数，可以让你引入其他模块以调用模块的函数和变量，默认下node.js会在$NODE_PATH和目前js所在目录下的node_modules文件夹下去寻找模块，express.js继承自connect模块，所以如果你的node_modules文件夹下没有connect模块也是不行的。



// view engine setup
//>>设置views路径和模板

//原始配置jade

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

//上面两行是设置views文件夹，即模板文件夹，__dirname是node.js里面的全局变量，即取得执行的js所在的路径，另外__dirname是目前执行的js文件名。所以，app.set(‘views’, __dirname + ‘/views’);是设置views的文件夹。

//而app.set('view engine', 'jade');是设置express.js所使用的render engine。除了Jade之外express.js还支持EJS(embedded javascript)、Haml、CoffeScript和jQuerytemplate等js模板


//修改jade->ejs
  app.set('views',path.join(__dirname , 'views') );
  app.engine('.html', require('ejs').__express);  
  app.set('view engine', 'html');





// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//>>app.use配置

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

//express.bodyParser()是Connect內建的middleware，设置此处可以将client提交过来的post请求放入request.body中。
// express.methodOverride()也是Connect內建的，可以协助处理POST请求伪装PUT、DELETE和其他HTTP methods。
// app.router()是route requests，但express.js的官方文件是这句可有可无，并且经过测试还真的是这样，不过还是写上吧。
// express.static()也是一个Connect內建的中间件来处理静态的requests，例如css、js、img文件等。所以static()里面指定的文件夹中的文件会直接作为静态资源吐出来。


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
