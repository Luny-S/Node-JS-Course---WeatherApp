const request = require('request');
const fs = require('fs');

const getWeather = (address, weatherCallback) => {
    const authKeys = JSON.parse(fs.readFileSync('../auth_keys.json').toString());
    const authKey_Mapbox = authKeys.mapbox;

    let geocoding_url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?";
    geocoding_url += "access_token=" + authKey_Mapbox;
    geocoding_url += "&limit=1";

    request({url: geocoding_url, json: true} , (error,response) => {
        if(error) {
            weatherCallback("Unable to connect to geocoding service",undefined);
        } else if(response.body.features.length === 0) {
            weatherCallback("Unable to find the place with the following name: " + place, undefined);
        } else {
            longitude = response.body.features[0].center[0];
            latitude = response.body.features[0].center[1];

            weatherCallback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    });
};

module.exports = getWeather;