/*
 user
 login
 register
 */

var UserDao = require('../proxy').User;
var authMiddleWare = require('../middlewares/auth');

exports.getLogin = function (req, res, next) {
    res.render('user/login');
};
exports.postLogin = function (req, res, next) {
    console.log(req.body.username + '-' + req.body.password);
    UserDao.getUserByLoginName(req.body.username,function(err,user){
        if (err) {
            return next(err);
        }
        if (!user) {
            console.log(123123);
        }else{
            req.session.user=user;
            console.log(user.username)
            res.redirect('/myhome');
        }

    })
};

exports.logout = function (req, res, next) {
    req.session.destroy();
    //res.clearCookie(config.auth_cookie_name, { path: '/' });
    res.redirect('/');
};

exports.getRegister= function (req, res, next) {
    res.render('user/register');
};

exports.postRegister = function (req, res, next) {
    console.log(req.body.username + '-' + req.body.password+'-'+req.body.repassword);
    UserDao.newAndSave(req.body.username,req.body.password,function(err,data){
        if (err) {
            return next(err);
        }
        res.redirect('/login');
    });
};

exports.getMyHome= function (req, res, next) {
    res.render('user/myhome');
};
