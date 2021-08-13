let mongoose = require('mongoose');

let followSchema = new mongoose.Schema({
  text: {
    type: String,
 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

var Follow = mongoose.model('Follow', followSchema);
module.exports = Follow;
