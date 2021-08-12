let mongoose = require('mongoose');

let commentSchema = new mongoose.Schema({
  datePost: new Date(),
  msg: {
    type: String,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }
})

var Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
