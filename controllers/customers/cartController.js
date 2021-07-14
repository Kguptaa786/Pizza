function cartController() {      //we making factory fn return object
    return {
        cart(req, res) {
            res.render('main/customers/cart')
        },
        update(req, res) {
            // let cart = {             //this is sample, cart object in which one more onject of item is present which tells us which type of pizza is there
            //     items: {
            //         pizzaId: { item: pizzaObject, qty: 0 }
            //     },
            //     totalQty: 0,
            //     totalPrice: 0
            // }


            //for the first time creating cart and adding basic object    
            if (!req.session.cart) {
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }
            let cart = req.session.cart

            if (!cart.items[req.body._id]) {
                cart.items[req.body._id] = {
                    item: req.body,
                    qty: 1
                }
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.price

            } else {
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.price
            }
            //console.log(req.body)
            //check item is present or not in cart
            // if (cart.items[req.body.pizza])

            return res.json({ totalQty: req.session.cart.totalQty })
        }
    }
}

module.exports = cartController