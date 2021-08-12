let mongoose = require('mongoose');

let postSchema = new mongoose.Schema({
  title: String,
  body: String,
  test: Boolean,
  img: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Like'
    }
  ]
  
})

var Post = mongoose.model('Post', postSchema);
module.exports = Post;
