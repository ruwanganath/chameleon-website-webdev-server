const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register(req, res) {
    try {
      const { email, password } = req.body
      User.findOne({ email: email }, function (err, user) {
        if (!err) {
          if (user) {
            res.status(400).send({
              error: 'An account with that email address already exists!'
            })
          }
        }
      }) 
      let user = await User.create(req.body)
      res.send(user.toJSON())
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'user create error on DB.'
      })
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body
      User.findOne({ email: email }, function (err, user) {
        if (!err) {
          if (!user) {
            return res.status(200).send({
              error: 'Unknown username or e-mail'
            })
          }
          const isPasswordValid = user.comparePassword(password)
          if (!isPasswordValid) {
            return res.status(200).send({
              error: 'Invalid password'
            })
          }
          const userJson = user.toJSON()
          res.send({
            user: userJson,
            token: jwtSignUser(userJson)
          })
        } else {
          return res.status(403).send({
            error: 'user login error on DB.'
          })
        }
      })
    } catch (err) {
      res.status(400).send({
        error: 'user login error on DB.'
      })
    }
  },
  async chameleon (req, res) {
    try {
      res.send({
        'Message': 'Chameleon service is working'
      })
    } catch (err) {
      res.status(400).send({
        error: 'Chameleon error'
      })
    }
  },
  async profile(req, res) {
    try {
      console.log('quickstart start')
      console.log(req.body.file1)
//生成multiparty对象，并配置上传目标路径
var form = new multiparty.Form({ uploadDir: './public/images' });
form.parse(req, function(err, fields, files) {
    console.log(fields, files,' fields2')
    if (err) {
    } else {
        res.json({ imgSrc: files.image[0].path })
    }
});


      // Imports the Google Cloud client library
      const vision = require('@google-cloud/vision');

      // Creates a client
      const client = new vision.ImageAnnotatorClient();
      // Performs label detection on the image file
      // const [result] = await client.labelDetection('./resources/wakeupcat.jpg');
      // const labels = result.labelAnnotations;
      // labels.forEach(label => console.log(label.description));

      res.send({
        'Message': ''
      })
    } catch (err) {
      res.status(400).send({
        error: err
      })
    }

  }




}
