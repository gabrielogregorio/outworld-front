let mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
  name: String,
  email: String,
  username: String,
  password: String,
  img: String,
  posts: { type: mongoose.Schema.Types.ObjectId, ref:'Post'},
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Likes'
  }]
})

var User = mongoose.model('User', userSchema);
module.exports = User;
