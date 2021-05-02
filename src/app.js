const path = require('path')
const express = require('express')

//Initialise app
const app = express()

const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')

//Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set('views', viewsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))
//For root route i.e., localhost:3000
// app.get('', (req, res) => {
//     res.send('Root')
// })

//For weather route i.e., localhost:3000/
app.get('', (req, res) => {
    res.render('index', {
        name: 'Sprihs',
        age: 24
    })
})

app.get('/weather', (req, res) => {
    // res.send('weather')
    res.send({
        forecast: 'Test',
        location: 'Patna'
    })

})

app.listen(port, () => {
    console.log('App is running')
})