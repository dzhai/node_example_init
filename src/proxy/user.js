var models = require('../models');
var User = models.User;

exports.getUserByLoginName = function (username, callback) {
  User.findOne({'username': username}, callback);
};

exports.newAndSave = function (username,password, callback) {
  var user = new User();
  user.username = username;
  user.password = password;
  user.save(callback);
};

exports.getAllUsers = function (callback) {
    User.find(callback);
};

exports.getUserById = function (id, callback) {
    User.findOne({_id: id}, callback);
};