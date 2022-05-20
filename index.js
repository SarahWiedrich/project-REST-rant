require ('dotenv').config()
const express = require('express')
const placeRoutes = require('./controllers/places')
const methodOverride = require('method-override')

const app = express()


//middleware/express settings
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//routes
app.use(express.static('public'))
app.use('/places', placeRoutes)

app.get('/', (req, res) => {
    res.render ('Home')
})

app.get('*', (req, res) => {
    res.render('error404')
})

app.listen(process.env.PORT)