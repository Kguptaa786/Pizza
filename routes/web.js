const homeController = require("../controllers/homeController")
const cartController = require("../controllers/customers/cartController")
const authController = require("../controllers/authController")
const guest = require('../middlewares/guest')

function initRoutes(app) {
    app.get('/', homeController().index)        //calling homecontroller then index

    app.get('/login', guest, authController().login)

    app.post('/login', authController().postLogin)

    app.get('/register', guest, authController().register)

    app.post('/register', authController().postRegister)

    app.post('/logout', authController().logout)

    app.get('/cart', cartController().cart)

    app.post('/update-cart', cartController().update)
}

module.exports = initRoutes