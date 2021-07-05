function cartController() {      //this is factory fn return object
    return {
        cart(req, res) {
            res.render('main/cart')
        }
    }
}

module.exports = cartController