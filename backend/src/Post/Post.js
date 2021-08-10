let mongoose = require('mongoose');

let postSchema = new mongoose.Schema({
  title: String,
  body: String,
  test: Boolean,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

var Post = mongoose.model('Post', postSchema);
module.exports = Post;
