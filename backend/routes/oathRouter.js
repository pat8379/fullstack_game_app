const passport = require('passport')
const oAuthRouter = require('express').Router()

oAuthRouter.get('/google', passport.authenticate('google', { scope: ['profile'] }))

oAuthRouter.get(
    '/google/callback',
    passport.authenticate('google', { failureMessage: true }),
    (req, res) => {
        // res.send("sent")
        res.send(req.user)
        // console.log(req.user)
        // res.redirect('/')
    }
  )

// oAuthRouter.get('/logout', (req, res) => {
//     // redirect logout to usersRouter's logout
//     req.logout()
// })

module.exports = oAuthRouter