DataUsers = require('./dataUsers');

class DataPosts {
  Build(post, userId) {
    var newPost = {
      _id: post.id,
      title: post.title,
      body: post.body,
      img: post.img,
      comments: post.comments,
      user: "",
      likes: post.likes == undefined ? 0 : post.likes.length,
      likedByUser: false,
      sharePost: post.sharePost == undefined ? undefined : post.sharePost
    }

    if (post.user != undefined) {
      newPost.user = DataUsers.Build(post.user)
    } else {
      newPost.user = {}
    }

    post.likes.forEach(postLike => {
      if (userId == postLike.user) {
        newPost.likedByUser = true;
      }
    })
    return newPost;
  }
}

module.exports = new DataPosts();
