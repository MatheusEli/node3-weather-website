const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibWF0aGV1c2VsaTEyIiwiYSI6ImNrcjU0amx6MjMyYTEybmwzajVwYzYwaWwifQ.bv8SZx4Rzwv60kSckRPSZw&limit=1'

    request({ url, json: true}, (error, { body }) => {
        
        if(error){
            callback('Unable to connect to location service!', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find loaction. Try another search.', undefined)
        }else{
            const answer = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined, answer)
        }
    })
}

module.exports = geocode