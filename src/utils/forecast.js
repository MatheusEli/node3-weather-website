const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d463b8742edbb406aae876d44d1c2e91&query='+latitude+','+longitude

    request({ url, json: true}, (error, { body }) => {
        
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }else if(body.error){
            callback('Unable to find loaction. Try another search.', undefined)
        }else{
            const answer = body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' degress out. It feels like '+body.current.feelslike+ ' degress out.'
            callback(undefined, answer)
        }
    })
}

module.exports = forecast