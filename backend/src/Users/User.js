let mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
  name: String, // Nome do usuário
  email: String, // Email
  username: String, // Nome de usuário
  password: String, // Senha
  bio: String, // Biografia
  img: String, // Imagem do usuário
  motivational: String, // Frase motivacional
  itemBio: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ItemBio' }], // Item bio
  posts: { type: mongoose.Schema.Types.ObjectId, ref:'Post'},
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Likes'
  }]
})

var User = mongoose.model('User', userSchema);
module.exports = User;
