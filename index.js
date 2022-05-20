require ('dotenv').config()
const express = require('express')
const placeRoutes = require('./controllers/places')

const app = express()

// app.use('/places', require('./controllers/places'))

app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public', placeRoutes))
app.use('/places', placeRoutes)

app.get('/', (req, res) => {
    res.render ('Home')
})

app.get('*', (req, res) => {
    res.render('error404')
})

app.listen(process.env.PORT)