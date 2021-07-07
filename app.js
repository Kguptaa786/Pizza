require('dotenv').config()  //requiring env variable
const express = require('express')
const app = express()
const ejsMate = require('ejs-mate')
const path = require('path')
const mongoose = require('mongoose')
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')

const PORT = process.env.PORT || 4000

const MongoDBStore = require('connect-mongo')      //this is for session store in db




//database connection
const url = 'mongodb://localhost/pizza'

mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true })
const connection = mongoose.connection
connection.once('open', () => {
    console.log('Database Connected...')
}).catch(err => {
    console.log('Connection failed....')
})





//flash middleware
app.use(flash())

//session store setup
const mongoStore = MongoDBStore.create({
    mongoUrl: url, //we previously setup connection and store in connection var
    collection: 'sessions'       //this is collection name, it create session table in db
})


//session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,          //storing session to mongoStore Collection
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }     //cookie expire time 24hours
}))

//passport config it must be after session config
const passportInit = require('./config/passport')

passportInit(passport)

app.use(passport.initialize())
app.use(passport.session())     //passort work with the help of session

//Global Middleware
app.use((req, res, next) => {
    res.locals.session = req.session        //we can access session globally
    res.locals.user = req.user    //user can be access globally
    next()
})


app.use(express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())     //by default express does not provide json file thats why we using this



app.engine('ejs', ejsMate)           //setting ejsMate as engine of ejs 
app.set('view engine', 'ejs')                //setting ejs view engine
app.set('views', path.join(__dirname, 'views'))   //setting views directory

require('./routes/web')(app)        //we putting all routes to one file



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})