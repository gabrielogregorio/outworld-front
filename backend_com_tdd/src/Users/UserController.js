const express = require('express');
const User = require('./User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const userAuth = require('../../src/middlewares/userAuth');
const router = express.Router()
const DataUsers = require('../factories/dataUsers');
require('dotenv/config');
const jwtSecret = process.env.JWT_SECRET

router.post('/user', async (req, res) => {
  var {name, email, password} = req.body;

  if ((name == '') || (email == '') || (password == '')){
    return res.sendStatus(400);
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

    let newUser = new User({name, email, password:hash})
    await newUser.save()  
    res.json({email:email, id:newUser._id}); 
  } catch(error) {
    console.log(error)
    res.sendStatus(500);
  }
})


router.get('/users', userAuth,  async (req, res) => { 
  var users = await User.find()
  var userFactories = []
  users.forEach(user => {
    userFactories.push(DataUsers.Build(user))
  })
  return res.json(userFactories);
})

router.get('/user/:id', userAuth,  async (req, res) => { 
  try {
    var users = await User.find({_id: req.params.id})
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



router.post('/auth', async (req, res) => {
  let {email, password} = req.body;

  let user = await User.findOne({email});
  if(user == undefined) {
    res.sendStatus(403)
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
      res.json({token})
      return;
    }
  })
})



module.exports = router;