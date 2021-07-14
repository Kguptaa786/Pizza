
const Order = require('../../models/order')
function orderController() {
    return {
        index(req, res) {
            //we find order which is not completed, sorting them in descending order of time and using populate method we get all data of filed: partiular id and exec is another method to execute what we get from populate
            Order.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 } }).populate('customerId', '-password').exec((err, orders) => {
                if (req.xhr) {
                    //ajax call jab karte h toh json bhejte hai
                    return res.join(orders)
                } else {
                    res.render('main/admin/orders')
                }
            })
        }

        // index(req, res) {
        //     const order = Order.find({ status: { $ne: 'completed' } })
        //     res.send(order.items)
        // }
    }
}


module.exports = orderController