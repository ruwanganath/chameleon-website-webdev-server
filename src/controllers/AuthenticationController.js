const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const nodemailer = require("nodemailer");


function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

function resetToken(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.newAuthentication.newJwtSecret, {
    expiresIn: ONE_WEEK
  })
}



function sendEmail(email, link){
   // create reusable transporter object using the default SMTP transport
   let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "chameleonsemail@gmail.com", // generated ethereal user
      pass: "362$F566x", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let mailOptions = {
    from: '"Chameleon" <chameleonsemail@gmail.com>', // sender address
    to: email,
    subject: 'Account Activation Link',
    html: link
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });


}

module.exports = {
  async register(req, res) {
    try {
      const { email, password, confirmPassword } = req.body
      User.findOne({ email: email }, function (err, user) {
        if (!err) {
          if (user) {
            res.status(400).send({
              error: 'An account with that email address already exists!'
            })
          }
        }
      })
      if (password != confirmPassword) {
        res.status(400).send({
          error: 'Passwords do not match!'
        })
      }
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
  async chameleon(req, res) {
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

  async forgotPassword(req, res) {
    const { email } = req.body;

    User.findOne({email}, (err, user) => {
      if(err || !user) {
        return res.status(400).json({error: "User with this email does not exsits."});
      }

      const userJson = user.toJSON();
      tokenTemp = jwtSignUser(userJson);
      const secret = tokenTemp + user.password;

      const payload = {
        email: user.email,
        id: user.id,
      };

      const token = jwt.sign(payload, secret, {expiresIn: '15m'});
      const link = `http://localhost:8080/?#/web/reset-password/${user.id}/${token}`;

      sendEmail(email, link);

    })
  },

  async resetPassword(req, res) {
    const {id, token} = req.paras;
    res.send(req.params);

    const userJson = user.toJSON();
    tokenTemp = jwtSignUser(userJson);
    const secret = tokenTemp + user.password;

    try{

    }
    catch (error ){
        console.log(error.message)
        res.send(error.message)
    }

  }
}
