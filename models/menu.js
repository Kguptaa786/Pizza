const monngoose = require('mongoose')
const Schema = monngoose.Schema

const menuSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true }
})

module.exports = monngoose.model('Menu', menuSchema)

