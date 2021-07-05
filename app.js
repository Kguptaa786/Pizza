const express = require('express')
const app = express()
const ejsMate = require('ejs-mate')
const path = require('path')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 4000


//database connection
const url = 'mongodb://localhost/pizza'

mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true })
const connection = mongoose.connection
connection.once('open', () => {
    console.log('Database Connected...')
}).catch(err => {
    console.log('Connection failed....')
})

app.engine('ejs', ejsMate)           //setting ejsMate as engine of ejs 
app.set('view engine', 'ejs')                //setting ejs view engine
app.set('views', path.join(__dirname, 'views'))   //setting views directory

app.use(express.static(path.join(__dirname, '/public')))

require('./routes/web')(app)        //we putting all routes to one file



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})