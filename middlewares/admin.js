//this for validating user for that pages where only logged in user can go
function admin(req, res, next) {
    if (req.isAuthenticated() && req.user.role === 'admin') {    //isAuthenticated() fn comes from passport
        return next()
    }
    return res.redirect('/')
}

module.exports = admin