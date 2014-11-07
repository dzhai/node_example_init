var index = require('./../controller/index');
var users = require('./../controller/users');

//拦截器
var auth = require('../middlewares/auth');

module.exports = function (app) {
    // home page
    app.get('/', index.index);
    // users
    app.get('/login',users.getLogin);
    app.post('/login',users.postLogin);
    app.get('/register',users.getRegister);
    app.post('/register',users.postRegister);
    app.get('/logout',users.logout);

    app.get('/myhome',auth.userRequired,users.getMyHome);
};

