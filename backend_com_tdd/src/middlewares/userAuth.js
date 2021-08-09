const jwt = require('jsonwebtoken')
require('dotenv/config')

module.exports = (req, res, next) => {
  const authToken = req.headers.authorization;
  if (authToken == '') {
    return res.sendStatus(403)
  }

  const bearer = authToken.split(' ');
  var auth = bearer[1];

  if (auth == undefined) {
    res.sendStatus(403)
  } else {
    try {
      var data = jwt.verify(auth, process.env.JWT_SECRET);
      if (data.email == undefined) {
        res.sendStatus(403)
      } else {
        next()
      }  
    } catch(error) {
      res.sendStatus(403)
    }
  }
}