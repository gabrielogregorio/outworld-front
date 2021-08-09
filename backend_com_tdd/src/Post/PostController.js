const express = require('express');
const Post = require('./Post');
const router = express.Router()
require('dotenv/config');
const userAuth = require('../middlewares/userAuth');
const jwtSecret = process.env.JWT_SECRET
const DataPosts = require('../factories/dataPosts');

router.post('/post', userAuth, async(req, res) => {
  let {title, body, test} = req.body;

  user = `${req.data.id}`
  if (
    (title == '' || body == '' || user == '') ||
    (title == undefined || body == undefined || user == undefined)
    )
     {
      return res.sendStatus(400)
  }

  if (test == undefined) {
    test = false;
  }
  try {
    let newPost = new Post({title, body, user, test});
    var newPostSave = await newPost.save();  
    res.json({_id: newPostSave.id, user})
  } catch(error) {

    res.statusCode = 500;
    res.json({msg: "Usuário não registrado na base de dados!"})
  }
})

router.get('/posts', userAuth, async (req, res) => {
  var posts = await Post.find().populate('user').exec();

  var postFactories = []
  posts.forEach(post => {
    postFactories.push(DataPosts.Build(post))
  })

  res.statusCode = 200
  res.json(postFactories) 
})


router.get('/post/:id', userAuth, async (req, res) => {
  try {
    var posts = await Post.find({_id:req.params.id}).populate('user').exec();
  } catch(error) {
    return res.sendStatus(500)
  }

  if (posts.length == 0) {
    return res.sendStatus(404)
  }

  var postFactories = []
  posts.forEach(post => {
    postFactories.push(DataPosts.Build(post))
  })

  res.json(postFactories) 
})

router.put('/post/:id', userAuth,  async (req, res) => { 
  var {title, body} = req.body;
  var id = req.params.id;
  var user = req.data.id
  
  if (
    (title == '' || body == '' || id == '') ||
    (title == undefined || body == undefined || id == undefined)
    ){
    return res.sendStatus(400);
  }

  try {
    await Post.findOneAndUpdate({_id:id, user}, {$set:{title, body}})
    var postNew = await Post.findOne({_id:id, user}).populate('user');
    if (postNew == null) {
      res.statusCode = 403
      return res.json({'msg': "Você não tem permissão para editar este post!"})
    }
    return res.json(DataPosts.Build(postNew))
  } catch(error)  {
    return res.sendStatus(500)
  }
})

module.exports = router;