DataUsers = require('./dataUsers');

class DataPosts {
  Build(post) {
    var newPost = {
      _id: post.id,
      title: post.title,
      body: post.body,
      img: post.img,
      user: "",
      likes: post.likes == undefined ? 0 : post.likes.length
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
