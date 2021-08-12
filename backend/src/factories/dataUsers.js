class DataUsers {
  Build(user) {

    var newUser = {
      _id: user._id,
      name: user.name,
      username: user.username == undefined ? '' : `${user.username}`,
      email: user.email,
      img: user.img,
      bio: user.bio,
      motivational: user.motivational,
      itemBio: user.itemBio
    }


  
    return newUser;
  }
}

module.exports = new DataUsers();

