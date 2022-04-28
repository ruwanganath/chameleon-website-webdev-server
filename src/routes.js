const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {
  app.post('/login',
    AuthenticationController.login)
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
}
