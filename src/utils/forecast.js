const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e50a5d9e9ca8e943309e0f4000949c0e&query=' + latitude + ',' + longitude + '&units=f'
    // request( { url : url, json : true } , (error, response) => {
    request( { url, json : true } , (error, { body }) => {
        if ( error ) {
            callback('Unable to connect to weather service', undefined)
        // } else if ( response.body.error ) {
        } else if ( body.error ) {
            callback('Unable to find location', undefined)
        } else {
            // console.log(response.body.current)
            // const current_temp = response.body.current.temperature
            // const apparent_temp = response.body.current.feelslike
            const current_temp = body.current.temperature
            const apparent_temp = body.current.feelslike
            callback(undefined, 'It is ' + current_temp + ' deggres out. It feels like ' + apparent_temp + ' degrees out.')
        }
    })
}

module.exports = forecast