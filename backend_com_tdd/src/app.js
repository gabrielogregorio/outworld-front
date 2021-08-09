const express = require('express');
const app = express()
const mongoose = require('mongoose');
const Post = require('./Post/Post');
const User = require('./Users/User');
const UserController = require('./Users/UserController');
const PostController = require('./Post/PostController');
const userAuth = require('../src/middlewares/userAuth');
const cors = require('cors');
const bcrypt = require('bcrypt')
require('dotenv/config');


const port = process.env.DB_PORT;
const dbname = process.env.BD_NAME;

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use('/', UserController)
app.use('/', PostController)

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






/* Rotas de desenvolvimento */
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
