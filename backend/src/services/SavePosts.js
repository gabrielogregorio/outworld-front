const Save = require('../models/Save');

class SavePostsService {
  async FindByUser (user) {
    return await Save.find({user});
  }
}

module.exports = new SavePostsService()