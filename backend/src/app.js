const express = require('express');
const app = express()
const mongoose = require('mongoose');
const Post = require('./Post/Post');
const User = require('./Users/User');
const Like = require('./Likes/Like');
const ItemBio = require('./ItemBio/ItemBio');
const Comment = require('./Comment/Comment');
const UserController = require('./Users/UserController');
const PostController = require('./Post/PostController');
const userAuth = require('../src/middlewares/userAuth');
const cors = require('cors');
const bcrypt = require('bcrypt')
require('dotenv/config');

const port = process.env.DB_PORT;
const dbname = process.env.BD_NAME;
const test_user_name = process.env.TEST_USER_NAME
const test_user2_name = process.env.TEST_USER2_NAME


app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static('public'))
app.use(cors())
app.use('/', UserController)
app.use('/', PostController)

mongoose.set('useFindAndModify', false)
mongoose.connect(`mongodb://localhost:${port}/${dbname}`,
  {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {}).catch(error => console.log(error))

app.use('/static', express.static('public'));

app.get('/test', async (req, res) => {
  return res.json({ola:'oi'})
})

app.post('/validate', userAuth, (req, res) => {
  return res.sendStatus(200)
})


/* Rotas de desenvolvimento */
app.post('/configure', async (req, res) => {
  let salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(test_user_name, salt)
  let newUser = new User({name:test_user_name, email:test_user_name, password:hash, username:test_user_name})
  await newUser.save()  

  salt = await bcrypt.genSalt(10);
  hash = await bcrypt.hash(test_user2_name, salt)
  let newUser2 = new User({name:test_user2_name, email:test_user2_name, password:hash, username:test_user2_name})
  await newUser2.save()  

  res.json({email:test_user_name, id:newUser._id, email:test_user2_name, id2:newUser2._id,}); 
})

app.post('/endconfigure', async (req, res) => {
  await User.deleteMany({email:test_user_name})
  await User.deleteMany({email:test_user2_name})
  res.sendStatus(200)
})

app.delete('/user/:email', async (req, res) => {
  await User.deleteMany({email:req.params.email})
  return res.sendStatus(200)
})

app.delete('/user2/:id', async (req, res) => {
  await User.deleteMany({id:req.params.id})
  return res.sendStatus(200)
})

app.delete('/image', async (req, res) => {
  await Post.deleteMany({test:true})
  return res.sendStatus(200)
})


module.exports = { app, mongoose };
