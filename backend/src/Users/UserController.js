const express = require('express');
const User = require('./User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const userAuth = require('../../src/middlewares/userAuth');
const router = express.Router()
const DataUsers = require('../factories/dataUsers');
const multerImage = require('../middlewares/multerImage');
const ItemBio = require('../ItemBio/ItemBio');
require('dotenv/config');
const jwtSecret = process.env.JWT_SECRET



router.post('/user', multerImage.single('image'), async (req, res) => {
  var {name, email, username, password} = req.body;

  if (
    (name == '' || email == '' || password == '' || username == '') ||
    (name == undefined || email == undefined || password == undefined || username == undefined) 
    ){
    return res.sendStatus(400);
  }

  if (req.file) {
    img = req.file['filename']
  } else {
    img = ''
  }

  try {
    let user = await User.findOne({email:req.body.email})
    if (user != undefined) {
      res.statusCode = 400;
      res.json({error: 'E-mail já cadastrado!'})
      return;
    }

    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt)

    let newUser = new User({name, email, username, password:hash, img})
    await newUser.save()  

    jwt.sign({email: newUser.email, name:newUser.name, id: newUser._id}, jwtSecret, {expiresIn: '24h'}, (error, token) => {
      if (error) {
        res.sendStatus(500)
        return;
      } else {  
        res.json({token, email:email, id:newUser._id}); 
        return;
      }
    })
  } catch(error) {
    console.log(error)
    res.sendStatus(500);
  }
})


router.post('/auth', async (req, res) => {
  let {email, password} = req.body;
  let user = await User.findOne({email});
  if(user == undefined) {
    res.sendStatus(404)
    return;
  }

  let valid = await bcrypt.compare(password, user.password);
  if(!valid) {
    res.sendStatus(403)
    return;
  } 

  jwt.sign({email, name:user.name, id: user._id}, jwtSecret, {expiresIn: '24h'}, (error, token) => {
    if (error) {
      res.sendStatus(500)
      return;
    } else {  
      res.json({token, id: user._id})
      return;
    }
  })
})

router.get('/users', userAuth,  async (req, res) => { 
  var users = await User.find().populate('itemBio')
  var userFactories = []
  users.forEach(user => {
    userFactories.push(DataUsers.Build(user))
  })
  return res.json(userFactories);
})

router.get('/user/:id', userAuth,  async (req, res) => { 
  try {
    var users = await User.find({_id: req.params.id}).populate('itemBio')
  } catch(error) {
    return res.sendStatus(500)
  }

  if (users.length == 0) {
    return res.sendStatus(404)
  }

  var userFactories = []
  users.forEach(user => {
    userFactories.push(DataUsers.Build(user))
  })
  return res.json(userFactories);
})
 
router.put('/user/:id', userAuth, multerImage.single('image'), async (req, res) => { 
  var {name, username, password, itemBio, bio, motivational} = req.body;

  
  var id = req.params.id;
  var user = req.data.id;
  
  if (id != `${user}`) {
    // Só pode alterar a si mesmo
    return res.sendStatus(403)
  }
  if (
    (name == '' || id == '' || username == '') ||
    (name == undefined || id == undefined || username == undefined)
    ){
    return res.sendStatus(400);
  }

  if (password == '' || password == undefined) {
    var updatePassword = false;
  } else {
    var updatePassword = true;
  }
  
  if (req.file) {
    img = req.file['filename']
  } else {
    img = ''
  }


  try {
    if (updatePassword) {
      let salt = await bcrypt.genSalt(10);
      let hash = await bcrypt.hash(password, salt)
      var update = {name, password:hash, username}
    } else {
      var update = {name, username}
    }

    if (img != '') {
      update.img = img
    }

    // Tem frase de motivação
    if (motivational != '' && motivational != undefined) {
      update.motivational = motivational
    }

    // Tem nova bio
    if (bio != '' && bio != undefined) {
      update.bio = bio
    }

    // Tem novos items para a bio
    if (itemBio != '' && itemBio != undefined) {
      update.itemBio = []

      // Loop para adicionar os novos itens
      for (i = 0; i < itemBio.length; i++) {
        // Relaciona os itens com o usuário
        var item = await new ItemBio({typeItem: itemBio[i][0], text: itemBio[i][1], user: id});
        await item.save()
        await update.itemBio.push(item._id)
      }
    }

    // Atualiza o perfil do usuário
    await User.findOneAndUpdate({_id:id}, {$set:update})

    // retorna os dados atualizados!
    var userNew = await User.findOne({_id:id}).populate('itemBio');

    if (userNew == null) {
      return res.sendStatus(404)      
    }
    return res.json(userNew)
  } catch(error)  {
    return res.sendStatus(500)
  }
})

router.get('/me', userAuth,  async (req, res) => { 
  var id = req.data.id;
  var users = await User.find({_id: id}).populate('itemBio');

  if (users.length == 0) {
    res.statusCode =404
    return res.json({msg: 'Identificador do usuário não encontrado'})
  }

  var userFactories = []
  users.forEach(user => {
    userFactories.push(DataUsers.Build(user))
  })
  return res.json(userFactories);
})





module.exports = router;
