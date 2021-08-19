const Comment = require('../models/Comment');

class CommentService {
  async Create({post, user, text, replie}) {
    let create = {post, user, text}
    if (replie != undefined) {create.replie = replie} 

    var newComment = new Comment(create);
    await newComment.save();  
    return newComment
  }

  async DeleteOne(_id, user) {
    return await Comment.deleteOne({_id, user});
  }

  async FindById(id) {
    return await Comment.findById({_id:id})
  }

  async FindByPosts(post) {
    return await Comment.find({post})
  }

  async FindOneAndUpdate(_id, user, update) {
    return await Comment.findOneAndUpdate({_id, user}, {$set:update})
  }
}

module.exports = new CommentService()