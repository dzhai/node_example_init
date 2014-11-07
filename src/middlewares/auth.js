
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
var config = require('../../config');
var eventproxy = require('eventproxy');
var UserProxy = require('../proxy').User;

/**
 * 需要登录
 */
exports.userRequired = function (req, res, next) {
  if (!req.session || !req.session.user) {
    return res.redirect('login');
  }
  next();
};

exports.gen_session=function(user, res) {
  var auth_token = user._id + '$$$$'; // 以后可能会存储更多信息，用 $$$$ 来分隔
  res.cookie(config.auth_cookie_name, auth_token,
    {path: '/', maxAge: 1000 * 60 * 60 * 24 * 30, signed: true, httpOnly: true}); //cookie 有效期30天
}

// 使用中间件把user设置成动态视图助手
exports.authUser = function (req, res, next) {
    if (req.session.user) {
        res.locals.current_user = req.session.user
    }
    next();
};

/*
// 验证用户是否登录 使用cookie
exports.authUser = function (req, res, next) {
    var ep = new eventproxy();
    ep.fail(next);
    ep.all('get_user', function (user) {
        if (!user) {
            return next();
        }
        user = res.locals.current_user = req.session.user = new UserModel(user);
    });

    if (req.session.user) {
        ep.emit('get_user', req.session.user);
    } else {
        var auth_token = req.signedCookies[config.auth_cookie_name];
        if (!auth_token) {
            return next();
        }
        if (!auth_token) {
            res.cookie(config.auth_cookie_name, '', {signed: true});
            return res.redirect('/');
        }
        var auth = auth_token.split('$$$$');
        var user_id = auth[0];
        UserProxy.getUserById(user_id, ep.done('get_user'));
    }
};*/