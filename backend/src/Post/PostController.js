const express = require('express');
const Post = require('./Post');
const router = express.Router()
const DataPosts = require('../factories/dataPosts');
const multerImagePosts = require('../middlewares/multerImagePosts');
const userAuth = require('../middlewares/userAuth');
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
  var posts = await Post.find().sort({'_id': 'desc'}).populate('user').exec();

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

router.put('/post/:id', userAuth,  multerImagePosts.single('image'), async (req, res) => { 
  var {title, body} = req.body;
  var id = req.params.id;
  var user = req.data.id
  
  if (
    (title == '' || body == '' || id == '') ||
    (title == undefined || body == undefined || id == undefined)
    ){
    return res.sendStatus(400);
  }

  var upload = {title, body}

  
  if (req.file) {
    upload.img = req.file['filename']
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



router.post('/post/like/:id', userAuth,  async (req, res) => { 
  var id = req.params.id;
  var user = req.data.id;
  
  try {
    var post = await Post.findOne({_id:id});
    var listLikes = post.likes;
    var includeLike = listLikes.includes(user)

    // Usuário não deixou o like
    if (includeLike == false) {
      listLikes.push(user) // Adicione o like e salve no banco
    } else {
      // Usuário provavelmente deixou o like
      const index = listLikes.indexOf(user);
      if (index > -1) { listLikes.splice(index, 1); }
    }
    // Salvar no db
    await Post.findOneAndUpdate({_id:id}, {$set:{likes:listLikes}})

    return res.json({includeLike: !includeLike})

  } catch(error)  {
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