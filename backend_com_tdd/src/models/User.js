let mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  images: { type: mongoose.Schema.Types.ObjectId, ref:'Image'}
})

var User = mongoose.model('User', userSchema);
module.exports = User;
