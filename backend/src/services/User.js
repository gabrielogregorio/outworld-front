const User = require('../models/User');
const dataUser = require('../factories/dataUsers');

class UserService {
  async FindByListIds(ids){
    let usersList = await User.find({_id:{$in:ids}}).populate()
    return usersList;
  }

  async FindById(id) {
    let user = await User.findById({_id:id}).populate('following')
    return user;
  }

  async findFollowingUsers(id, includedUser=false) {
    let userItem = await this.FindById(id)
  
    let ids = dataUser.Build(userItem).followingIds;
    if (includedUser) {
      ids.push(id)
    }
    let usersFolling = await this.FindByListIds(ids)

    return usersFolling;
  }
}

module.exports = new UserService();