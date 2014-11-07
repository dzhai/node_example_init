var config = require('./config');
//init express
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//session
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
//ejs layouts
var expressLayouts = require('express-ejs-layouts');
//压缩
var compress = require('compression');
//文件上传
var busboy = require('connect-busboy');
//routes
var routes = require('./src/routes');
//custom auth for cookie
var auth = require('./src/middlewares/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('layout', 'layout')
app.use(expressLayouts)

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false,limit:100*1024*10 }));
app.use(cookieParser(config.session_secret));
app.use(express.static(path.join(__dirname, '/public')));

//
app.use(compress());

//user session
app.use(session({
    secret: config.session_secret,
    cookie : {maxAge:config.cookie_maxAge},
    store: new MongoStore({
        url: config.db
    }),
    resave: true,
    saveUninitialized: true
}));

//文件上传大小
app.use(busboy({
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB
    }
}));

// custom middleware
app.use(auth.authUser);

//routes

routes(app);

// error handlers
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// will print stacktrace
if (config.debug) {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
} else {
    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}

app.set('port', process.env.PORT || config.port);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;
