const homeController = require("../controllers/homeController")
const cartController = require("../controllers/customers/cartController")
const orderController = require("../controllers/customers/orderController")
const adminOrderController = require("../controllers/admin/orderController")
const statusController = require("../controllers/admin/statusController")
const authController = require("../controllers/authController")

//middlewares
const guest = require('../middlewares/guest')
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')


function initRoutes(app) {
    app.get('/', homeController().index)        //calling homecontroller then index

    app.get('/login', guest, authController().login)

    app.post('/login', authController().postLogin)

    app.get('/register', guest, authController().register)

    app.post('/register', authController().postRegister)

    app.post('/logout', authController().logout)

    app.get('/cart', cartController().cart)

    app.post('/update-cart', cartController().update)

    //customer routes
    app.post('/orders', auth, orderController().store)

    app.get('/customer/orders', auth, orderController().index)

    //admin routes
    app.get('/admin/orders', admin, adminOrderController().index)

    app.post('/admin/order/status', admin, statusController().update)
}

module.exports = initRoutes