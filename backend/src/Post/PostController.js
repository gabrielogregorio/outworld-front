const express = require('express');
const Post = require('./Post');
const router = express.Router()
const DataPosts = require('../factories/dataPosts');
const multerImagePosts = require('../middlewares/multerImagePosts');
const userAuth = require('../middlewares/userAuth');
const Like = require('../Likes/Like')
const Comment = require('../Comment/Comment');

require('dotenv/config');

const jwtSecret = process.env.JWT_SECRET


router.post('/postLoadFile', userAuth, multerImagePosts.single('image'), async(req, res) => {
  user = `${req.data.id}`

  if (
    (user == '') ||
    (user == undefined)
    )
     {
      return res.sendStatus(400)
  }

  if (req.file) {
    img = req.file['filename']
  } else {
    img = ''
  }

  return res.json({file:img})
})


router.post('/post', userAuth, async(req, res) => {
  let {title, body, test, img} = req.body;

  user = `${req.data.id}`
  if (
    (title == '' || body == '' || user == '') ||
    (title == undefined || body == undefined || user == undefined)
    )
     {
      return res.sendStatus(400)
  }

  if (img == undefined) {
    img = ''
  }
  if (test == undefined) {
    test = false;
  }

  try {
    let newPost = new Post({title, body, user, test, img});
    var newPostSave = await newPost.save();  
    res.json({_id: newPostSave.id, user})
  } catch(error) {

    res.statusCode = 500;
    res.json({msg: "Usuário não registrado na base de dados!"})
  }
})

router.get('/posts', userAuth, async (req, res) => {
  var user = `${req.data.id}`

  var posts = await Post.find().sort({'_id': 'desc'}).populate('user comments likes').exec();

  var postFactories = []
  posts.forEach(post => {
    postFactories.push(DataPosts.Build(post, user))
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

router.put('/post/:id', userAuth,  multerImagePosts.single('image'), async (req, res) => { 
  var {title, body, img} = req.body;
  var id = req.params.id;
  var user = req.data.id
  
  if (
    (title == '' || body == '' || id == '') ||
    (title == undefined || body == undefined || id == undefined)
    ){
    return res.sendStatus(400);
  }

  var upload = {title, body}

  if (img != '') {
    upload.img = img
  }

  try {
    await Post.findOneAndUpdate({_id:id, user}, {$set:upload})
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

router.post('/post/comment/:id', userAuth,  async (req, res) => { 
  var id = req.params.id;
  var user = req.data.id;
  var text = req.body.text;

  if (text == '' || id == '' || user == '' || id == undefined || user == undefined || text == undefined) {
    return res.sendStatus(400)
  }

  try {
    var newComment = new Comment({post:id, user, text});
    await newComment.save();  

    var post = await Post.findById({_id:id})
    post.comments.push(newComment)
    await post.save();

    return res.json({id:newComment.id})
  } catch(error)  {
    return res.sendStatus(500)
  }
})


router.delete('/post/comment/:idComment', userAuth,  async (req, res) => { 
  var id = req.params.idComment;
  var user = req.data.id;

  if (id == '' || user == '' || id == undefined || user == undefined ) {
    return res.sendStatus(400)
  }

  try {
    await Comment.deleteOne({_id:id, user});
    return res.sendStatus(200)
  } catch(error)  {
    return res.sendStatus(500)
  }
})


router.put('/post/comment/:idComment', userAuth,  async (req, res) => { 
  var id = req.params.idComment;
  var user = req.data.id;
  var text = req.body.text;

  if (text == '' || id == '' || user == '' || id == undefined || user == undefined || text == undefined) {
    return res.sendStatus(400)
  }

  try {
    var comment = await Comment.findOneAndUpdate({_id:id, user}, {$set:{text}})
    if (comment == null) {
      return res.sendStatus(404)
    }

    return res.json({oi:'ola'})
  } catch(error)  {
    return res.sendStatus(500)
  }
})


router.post('/post/like/:id', userAuth,  async (req, res) => { 
  var id = req.params.id;
  var user = req.data.id;
  try {
    var likeExistente = await Like.findOne({post:id, user:user});
    if (likeExistente != null) {
      await Like.deleteOne({post:id, user:user});

      var post = await Post.findById({_id:id})
  
      post.likes = post.likes.filter(value => value != `${likeExistente._id}`)
      await post.save();
  
      return res.json({includeLike: false})  
    }
  } catch(error) {
    return res.sendStatus(500)
  }

  try {
    var newLike = new Like({post:id, user:user});
    await newLike.save();  

    var post = await Post.findById({_id:id})
    post.likes.push(newLike)
    await post.save();

    return res.json({includeLike: true})
  } catch(error)  {
    console.log(error)
    return res.sendStatus(500)
  }
})


router.delete('/post/:id', async (req, res) => {
  try {
    var resDelete = await Post.deleteOne({_id:req.params.id})
    if (resDelete.deletedCount == 1) {
      res.sendStatus(200)
    } else {
      res.sendStatus(404)
    }
  } catch(error ) {
    res.sendStatus(500)
  }
})


router.get('/myPosts', userAuth,  async (req, res) => { 
  var user = req.data.id
  
  if ((user == '') || (user == undefined)){
    return res.sendStatus(400);
  }

  try {
    var posts = await Post.find({user:user}).sort({'_id': 'desc'}).populate('user');

    var postFactories = []
    posts.forEach(post => {
      postFactories.push(DataPosts.Build(post))
    })

    return res.json(postFactories)

  } catch(error) {
    res.sendStatus(500)
  }
})




module.exports = router;