const Order = require('../../models/order')
const moment = require('moment')    //this if for formatting time show in order function
function orderController() {
    return {
        store(req, res) {
            //validate request
            const { phone, address } = req.body
            if (!phone || !address) {
                req.flash('error', 'All fields are required!!!')
                return res.redirect('/cart')
            }
            //otherwise we storing order in database
            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone,
                address
            })

            order.save().then(result => {
                //to flash error message using flash module
                req.flash('success', 'Orders placed successfully')
                //we going to delete all orders from cart before redirecting
                delete req.session.cart
                //we redirect to order page later
                return res.redirect('/')
            }).catch(err => {
                req.flash('error', 'All fields are required!!!')
                return res.redirect('/cart')
            })
        },
        async index(req, res) {
            //req.user._id comes from seesion db
            const orders = await Order.find({ customerId: req.user._id },
                null,
                { sort: { 'createdAt': -1 } })
            //now we send the data of order in frontend
            res.render('main/customers/orders', { orders: orders, moment: moment })
            //sending moment module to use in frontene at orders.ejs page
            // console.log(orders)
        }
    }
}

module.exports = orderController