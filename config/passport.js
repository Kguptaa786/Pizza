const LocalStrategy = require('passport-local')
const User = require('../models/user')
const bcrypt = require('bcrypt')

function init(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        //login

        //check if email exists
        const user = await User.findOne({ email: email })
        if (!user) {
            return done(null, false, { message: 'No user with this email' })
        }
        bcrypt.compare(password, user.password).then(match => {
            if (match) {
                return done(null, user, { message: 'Logged in succesfully' })
            }
            return done(null, false, { message: 'Wrong username or password' })
        }).catch(err => {
            return done(null, false, { message: 'Something went wrong' })
        })
    }))

    //we use this to store current user id in session
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    //to get all data of logged in user which store in session and req.user can be use convieniently
    //first parameter is id which we received from serialise
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })
}

module.exports = init