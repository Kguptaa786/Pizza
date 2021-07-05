const Menu = require('../models/menu')
function homeController() {      //this is factory fn return object
    return {
        async index(req, res) {
            const pizzas = await Menu.find()            //we use async and await
            res.render('main/home', { pizzas: pizzas })
            // Menu.find().then(function (pizzas) {         //both does same function
            //     console.log(pizzas)
            //     res.render('main/home', { pizzas: pizzas })
            // })

        }
    }
}

module.exports = homeController