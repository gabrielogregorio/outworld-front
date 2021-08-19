const Comment = require('../models/Comment');

class CommentService {
  async DeleteOne(_id, user) {
    return await Comment.deleteOne({_id, user});
  }
}

module.exports = new CommentService()