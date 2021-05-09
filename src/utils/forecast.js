const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8e9c07a129face1e334e3b882d71b874&query='+ latitude  + ',' + longitude + '&units=s'

    request ({url, json : true}, (error,response) => {
        if (error) {
            callback('Unable to connect internet',undefined)
        } else if (response.body.error){
            callback('Try another search, Cannot find this location',undefined)
        } else {
            callback(undefined,{
                forecast: response.body.current.weather_descriptions[0]
            })
        }
    })
}

module.exports = forecast