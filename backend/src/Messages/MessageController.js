const express = require('express');
const Message = require('./Message');
const router = express.Router()
const userAuth = require('../middlewares/userAuth');
const { processId } = require('../util/textProcess');
const dataUser = require('../factories/dataUsers')
const User = require('../Users/User')


router.post('/message', userAuth, async (req, res) => {
  let from = processId(req.data.id)
  let to = processId(req.body.to)
  let message = req.body.message;
  let test = req.body.test;

  if (test == undefined) {
    test = false
  } else {
    test = true
  }

  if (from == undefined || to == undefined || message == undefined || message == '') {
    return res.sendStatus(400)
  }
 
  let newMessage = new Message({message:message, from, to, test})
  await newMessage.save()
  return res.json(newMessage)
})


router.get('/messages', userAuth, async (req, res) => {
  let id = processId(req.data.id)

  let messagesAllUsers = await Message.find({$or: [{to:id}, {from: id}]}).populate('from to')

  //let lista = []
  //messagesAllUsers.forEach(messages => {
  //})
  return res.json(messagesAllUsers) 
})


router.get('/message/:id', userAuth, async (req, res) => {
  let id = processId(req.data.id)
  let idOtherUser = processId(req.params.id)

  let messagesAllUsers = await Message.find({$or: [
    {to:id, from: idOtherUser},
    {to:idOtherUser, from:id}
  ]}).populate('from to') 
  return res.json(messagesAllUsers)
})


router.get('/messages/users', userAuth, async(req, res) => {
  let id = processId(req.data.id)

  // Lista de pessoas que o dono da conta segue.
  let userItem = await User.findById({_id:id}).populate('following')
  let ids = DataUsers.Build(userItem).followingIds;
  ids.push(id)

  // Pessoas que o dono segue
  let usersFolling = await User.find({_id:{$in:ids}}).populate()
    
  // Obter todas as mensagens que foram para o usuário ou que ele enviou
  let users = await Message.find({$or:
      [
        {to:id},
        {from:id}
      ]
    }).populate('from to')
  let listUsers = []
  let listIds = []
  let to = ''
  let from = ''

  // Varredura de dados para obter todas as pessoas unicas
  users.forEach(user => {
    to = user.to
    from = user.from

    if (`${to._id}` != `${id}`) {
      if (listIds.includes(`${to._id}`) == false ) {
        listUsers.push(dataUser.Build(to))
        listIds.push(`${to._id}`)
      }
    }

    if (`${from._id}` != `${id}`) {
      if (listIds.includes(`${from._id}`) == false ) {
        listUsers.push(dataUser.Build(from))
        listIds.push(`${from._id}`)
      }
    }
  })

  // Adição de pessoas que o dono segue
  usersFolling.forEach(usersFolling => {
    if (`${usersFolling._id}` != `${id}`) {
      if (listIds.includes(`${usersFolling._id}`) == false ) {
        listUsers.push(dataUser.Build(usersFolling))
        listIds.push(`${usersFolling._id}`)
      }
    }
  })

  // Todas as pessoas que o dono segue + pessoas que ele enviou ou recebeu mensagem!
  return res.json(listUsers)
})

module.exports = router;
