DataUsers = require('./dataUsers');

class DataPosts {
  Build(post) {
    var newPost = {
      _id: post.id,
      title: post.title,
      body: post.body,
      user: ""
    }

    if (post.user != undefined) {
      newPost.user = DataUsers.Build(post.user)
    } else {
      newPost.user = {}
    }
    return newPost;
  }
}

module.exports = new DataPosts();
