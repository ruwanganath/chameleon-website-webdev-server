const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {
    app.post('/login', AuthenticationController.login)
    app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register),
    app.get('/chameleonserver', AuthenticationController.chameleon),
    app.post('/forgot', AuthenticationController.forgotPassword),
    app.get('/reset-password', AuthenticationController.resetPassword),
    app.post('/new-password', AuthenticationController.newPassword)

}
