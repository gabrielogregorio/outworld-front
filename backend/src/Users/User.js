let mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  posts: { type: mongoose.Schema.Types.ObjectId, ref:'Post'}
})

var User = mongoose.model('User', userSchema);
module.exports = User;
