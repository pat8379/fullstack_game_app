const asyncHandler = require('express-async-handler')
const passport = require('passport')
const usersRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/usersModel')
const OAuth = require('../models/oAuthModel')

function compare( a, b ) {
    if ( a.score < b.score ){
      return 1;
    }
    if ( a.score > b.score ){
      return -1;
    }
    return 0;
  }

usersRouter.get('/info', (req,res,next) => {
    if (req.isAuthenticated()){
        res.send(req.user)
    } else {
        res.status(400).send('No user is logged in')
    }
})

usersRouter.post('/login', passport.authenticate("local", {failureMessage: true}), (req,res) => {
    // console.log(req.user)
    // res.send("sent")
    res.send(req.user)
})

usersRouter.post('/register', asyncHandler(async (req,res,next) => {
    const {username, password} = req.body
    if (username && password){
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = {
            username,
            password: hashedPassword,
        }
        const user = await User.create(newUser)
        res.send(user)
    } else {
        res.status(400).json("Wrong username or password")
    }
})) 

usersRouter.get('/leaderboard', asyncHandler( async (req,res,next) => {
    const allUsers = await User.find({})
        .select({"username": 1, "score": 1, "_id" : 0})
        .sort({"score": -1})
        .limit(50)
    const allOAuths = await OAuth.find({})
    .select({"displayName": 1, "score": 1, "_id" : 0})
    .sort({"score": -1})
    .limit(50)

    const tempCombine = allUsers.concat(allOAuths).sort(compare)

    res.send(tempCombine)
})) 

usersRouter.put('/updateScore', (req,res,next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.status(400).json('Not Logged In')
    }
}, asyncHandler(async (req,res,next) => {
    const {score} = req.body
    let update
    if (score) {
        if (req.user.googleId) {
            update = await OAuth.findByIdAndUpdate(req.user.id, {score: score}, {new: true})
        } else if (req.user.id) {
            update = await User.findByIdAndUpdate(req.user.id, {score: score}, {new: true})
        }
        res.send(update)
    } else {
        res.status(400).json('No score input')
    }
}))

usersRouter.post('/logout', (req,res,next) => {
    req.session.destroy()
    req.logout(req.user, err => {
        if(err) return next(err)
    })
})

module.exports = usersRouter