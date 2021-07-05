const homeController = require("../controllers/homeController")
const cartController = require("../controllers/customers/cartController")
const authController = require("../controllers/authController")

function initRoutes(app) {
    app.get('/', homeController().index)        //calling homecontroller then index

    app.get('/cart', cartController().cart)

    app.get('/register', authController().register)

    app.get('/login', authController().login)
}

module.exports = initRoutes