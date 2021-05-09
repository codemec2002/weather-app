const reqeust = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + '.json?access_token=pk.eyJ1IjoiYXl1c2gxNDEiLCJhIjoiY2tvN2U1Zzg5MXY0MjJ3bHBvNDBsam14dyJ9.nE6IFbABUgUVcj_uIhh_IQ'

    reqeust ({url, json : true}, (error,response) =>{
        if (error){
            callback('Unable to connect',undefined)
        } else if (response.body.features.length === 0){
            callback('Try another search',undefined)
        } else {
            callback(undefined,{
                latitude : response.body.features[0].center[0],
                longitude : response.body.features[0].center[0],
                Location : response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
// 