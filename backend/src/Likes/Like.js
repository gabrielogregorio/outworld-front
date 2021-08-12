let mongoose = require('mongoose');

let likeSchema = new mongoose.Schema({
  text: {
    type: String,
 },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

var Like = mongoose.model('Like', likeSchema);
module.exports = Like;
