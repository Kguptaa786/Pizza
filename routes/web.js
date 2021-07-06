const homeController = require("../controllers/homeController")
const cartController = require("../controllers/customers/cartController")
const authController = require("../controllers/authController")

function initRoutes(app) {
    app.get('/', homeController().index)        //calling homecontroller then index

    app.get('/register', authController().register)

    app.get('/login', authController().login)

    app.get('/cart', cartController().cart)

    app.post('/update-cart', cartController().update)
}

module.exports = initRoutes