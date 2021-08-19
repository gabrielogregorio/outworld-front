const Post = require('../models/Post')
const dataUser = require('../factories/dataUsers');
const UserService = require('./User');

class PostService {
  async Create({body, user, test, img}){
    let newPost = await new Post({body, user, test, img});
    return await newPost.save();  
  }

  async FindById(id) {
    return await Post.findById({_id:id})
  }

  async findFollowingPosts(id, includedUser=false) {
    let userItem = await UserService.FindById(id)
  
    let ids = dataUser.Build(userItem).followingIds;
    if (includedUser) {ids.push(id)}
    return await Post.find({ 'user':{$in:ids} }).sort({'_id': 'desc'}).populate('user comments likes');
  }

  async DeleteById(id) {
    return await Post.deleteOne({_id:id})
  }

  async FindByIdAndPopulate(_id) {
    return await Post.find({_id}).populate('user comments likes sharePost')
  }

  async FindOne(_id, user) {
    return await Post.findOne({_id, user}).populate('user');
  }

  async FindOneAndUpdate(_id, user, upload) {
    return await Post.findOneAndUpdate({_id, user}, {$set:upload})
  }

}

module.exports = new PostService()