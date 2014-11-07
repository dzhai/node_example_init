var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: { type: String},
  password: { type: String}
});
mongoose.model('User', UserSchema);
