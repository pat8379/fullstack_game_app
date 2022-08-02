const express = require('express')
const path = require('path')
const dotenv = require('dotenv').config()
const passport = require('passport')
const session = require('express-session');
const mongoose = require('mongoose')
const {errorHandler} = require('./middleware/errorHandler')
const connectDB = require('./db')

const MongoStore = require('connect-mongo');

const app = express()

const port = process.env.PORT || 5001

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const sessionStore = MongoStore.create({ mongoUrl: process.env.ATLAS_URI, collectionName: 'sessions' });

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 6
    }
}));

require('./passport')

app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//   console.log(req.session);
//   console.log(req.user);
//   console.log(req.isAuthenticated())
//   next();
// });

// Routes
app.use('/api/users', require('./routes/usersRouter'))
app.use('/auth', require('./routes/oathRouter'))


// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../frontend/build')))
  
//     app.get('*', (req, res) =>
//       res.sendFile(
//         path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
//       )
//     )
//     // app.use(express.static(path.join(__dirname, '../frontend/public')))
// } else {
//     app.get('/', (req, res) => res.send('Please set to production'))
// }

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})