const User = require('../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')



function authController() {
    return {
        login(req, res) {
            res.render('main/login')
        },
        postLogin(req, res, next) {
            //the fn after local is done fn written in passport.js file
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    req.flash('error', info.message)
                    return next(err)
                }
                if (!user) {
                    req.flash('error', info.message)
                    return res.redirect('/login')
                }
                req.logIn(user, (err) => {
                    if (err) {
                        req.flash('error', info.message)
                        return next(err)
                    }
                    //we redirect to order page later
                    return res.redirect('/')
                })
            })(req, res, next)//this is because authenticate return fn and we need to call it
        },
        register(req, res) {
            res.render('main/register')
        },
        async postRegister(req, res) {
            const { name, email, password } = req.body
            if (!name || !email || !password) {
                req.flash('error', 'All fields are required')           //this is for flashing error, this functionality comes with connect-flash
                req.flash('name', name)
                req.flash('email', email)
                return res.redirect('/register')
            }
            //check if email exist
            User.exists({ email: email }, (err, result) => {
                if (result) {
                    req.flash('error', 'Email already taken')           //this is for flashing error, this functionality comes with connect-flash
                    req.flash('name', name)
                    req.flash('email', email)
                    return res.redirect('/register')
                }
            })

            const hashedPassword = await bcrypt.hash(password, 10)
            //create a user
            const user = new User({
                name,
                email,
                password: hashedPassword
            })

            user.save().then((user) => {
                //login
                return res.redirect('/')
            }).catch((err) => {
                req.flash('error', 'Email already taken')
                return res.redirect('/register')
            })
        },
        logout(req, res) {
            req.logout()        //this method comes from passport
            return res.redirect('/login')
        }
    }
}

module.exports = authController

