const path = require('path')
const hbs = require('hbs')

const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//env is an object where we can access environment variables
//PORT will be set in Heroku
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public/aula')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Matheus eli'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Matheus eli'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Matheus eli',
        helpText: 'This is some helpful text.'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            errorMessage: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ errorMessage: error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ errorMessage: error })
            }
            
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })

    })

})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            errorMessage: 'You must provide a searh term!'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found.',
        name: 'Matheus eli'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.',
        name: 'Matheus eli'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})