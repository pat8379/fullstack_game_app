const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('./models/usersModel') // likely to change
const OAuth = require('./models/oAuthModel') // likely to change
const bcrypt = require('bcryptjs')

const locals = new LocalStrategy({usernameField: 'username', passwordField: 'password'}, async (username, password, done) => {
    try {
        const user = await User.findOne({username: username})
        if (user && (await bcrypt.compare(password, user.password))) {
            return done(null, user);
        } else {
            return done(null, false);
        }        
    } catch (error) {
        done(error)
    }

})

const googles = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
    const newUser = {
      googleId: profile.id,
      displayName: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
    }

    // console.log(profile)

    try {
      let user = await OAuth.findOne({ googleId: profile.id })

      if (user) {
        done(null, user)
      } else {
        user = await OAuth.create(newUser)
        done(null, user)
      }
    } catch (err) {
      console.error(err)
    }
  })

passport.use(locals)
passport.use(googles); 

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
    const user = await User.findById(userId)
    if (user) {
        done(null,user)
    } else {
        const oauth = await OAuth.findById(userId)
        if (oauth) {
            done(null, oauth)
        } else {
            done(err)
        }
    }

    // User.findById(userId)
    // .then((user) => {
    //     done(null, user);
    // })
    // .catch(err => done(err))
});