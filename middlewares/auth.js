//this for validating user for that pages where only logged in user can go
function auth(req, res, next) {
    if (req.isAuthenticated()) {    //isAuthenticated() fn comes from passport
        return next()
    }
    return res.redirect('/login')
}

module.exports = auth