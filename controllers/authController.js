function authController() {
    return {
        login(req, res) {
            res.render('main/login')
        },
        register(req, res) {
            res.render('main/register')
        }
    }
}

module.exports = authController