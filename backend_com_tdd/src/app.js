const express = require('express');
const app = express()
const mongoose = require('mongoose');
const Image = require('./models/Image');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const userAuth = require('../src/middlewares/userAuth');
require('dotenv/config');

const jwtSecret = process.env.JWT_SECRET
const port = process.env.DB_PORT;
const dbname = process.env.BD_NAME;

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

mongoose.set('useFindAndModify', false)
mongoose.connect(`mongodb://localhost:${port}/${dbname}`,
  {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {}).catch(error => console.log(error))

app.get('/test', async (req, res) => {
  return res.json({ola:'oi'})
})

app.post('/validate', userAuth, (req, res) => {
  return res.sendStatus(200)
})


app.post('/user', async (req, res) => {
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

app.post('/image', async(req, res) => {
  let {name, href, user, test} = req.body;
  if (test == undefined) {
    test = false;
  }
  try {
    let newImage = new Image({name, href, user, test});
    await newImage.save();  
    res.json({sucess: true})
  } catch(error) {
    res.sendStatus(500)
  }
})

app.post('/auth', async (req, res) => {
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


app.get('/', async (req, res) => {
  var data = await Image.find().populate('user').exec();
  res.statusCode = 200
  res.json(data)
})


/* Rotas de desenvolvimento */
app.delete('/user/:email', async (req, res) => {
  await User.deleteMany({email:req.params.email})
  return res.sendStatus(200)
})


app.delete('/user2/:id', async (req, res) => {
  await User.deleteMany({id:req.params.id})
  return res.sendStatus(200)
})

app.delete('/image/:id', async (req, res) => {
  await Image.deleteMany({test:true})
  return res.sendStatus(200)
})



module.exports = { app, mongoose };
