const express = require('express');
const app = express()
const mongoose = require('mongoose');
const user = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv/config');

app.use(express.urlencoded({extended: false}))
app.use(express.json())

mongoose.set('useFindAndModify', false)
mongoose.connect(`mongodb://localhost:${process.env.DB_PORT}/${process.env.BD_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    //console.log('conectado ao db!')
  }).catch(error => console.log(error))

let User = mongoose.model('User', user);
  

app.get('/', (req, res) => {
  res.json({test:'ola'})
})

app.post('/user', async (req, res) => {
  var {name, email, password} = req.body;
  if (name == '', email == '', password == ''){
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
    res.json({email:email}); 
  } catch(error) {
    console.log(error)
    res.sendStatus(500);
  }
})

/* Rotas de desenvolvimento */
app.delete('/user/:email', async (req, res) => {
  await User.deleteOne({email:req.params.email})
  res.sendStatus(200)
})

module.exports = app;
