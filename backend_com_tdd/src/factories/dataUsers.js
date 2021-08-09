class DataUsers {
  Build(user) {

    var newUser = {
      _id: user._id,
      name: user.name,
      email: user.email
    }

    return newUser;
  }
}

module.exports = new DataUsers();

