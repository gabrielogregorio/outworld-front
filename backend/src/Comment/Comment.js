let mongoose = require('mongoose');

// Essa parte precisa de um rework, preciso investigar o motivo que populate não funciona
// em busca por profundidade, desta forma, o sistema de comentário só permite atualmente um 
// nível de profundidade

let commentSchema = new mongoose.Schema({
  text: { type: String },
  replie: this, // está respondendo outro comentário
  replies: [this], // Respostas que o comentário recebeu
  post: { // post a qual ele pertence
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  user: { // usuário que comentou
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

var Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
