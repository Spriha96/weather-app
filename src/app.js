const path    = require('path')
const express = require('express')
const hbs     = require('hbs')

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
        return res.send('Please provide an address')
    }

    res.send({
        address: req.query.address,
        message: "Done"
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