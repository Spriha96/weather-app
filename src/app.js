const path     = require('path')
const express  = require('express')
const hbs      = require('hbs')
const geocode  = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Initialise app
const app  = express()

//Initialise port
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath           = path.join(__dirname, '../templates/views')
const partialsPath        = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))
//For root route i.e., localhost:3000
// app.get('', (req, res) => {
//     res.send('Root')
// })

app.get('', (req, res) => {
    // res.send('weather')
    res.render('index', {
        title: 'Weather',
        name: 'Spriha'
    })

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Spriha'
    })
})

app.get('/weather', (req, res) => {
    if ( !req.query.address ) {
        return res.send({
            error: 'Please provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if ( error ) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (err, forecastData) => {
            if ( err ) {
                return res.send({
                    error: err
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/about/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Spriha',
        errorMessage: 'The requested about help page was not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Spriha',
        errorMessage: 'The requested page was not found'
    })
})

app.listen(port, () => {
    console.log('App is running')
})