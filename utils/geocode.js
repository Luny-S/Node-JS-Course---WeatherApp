const request = require('request');
const fs = require('fs');

const geocode = (address, weatherCallback) => {
    const authKeys = JSON.parse(fs.readFileSync('../auth_keys.json').toString());
    const authKey_Mapbox = authKeys.mapbox;

    let url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?";
    url += "access_token=" + authKey_Mapbox;
    url += "&limit=1";

    request({url, json: true}, (error, {body}) => {
        if (error) {
            weatherCallback("Unable to connect to geocoding service", undefined);
        } else if (body.features.length === 0) {
            weatherCallback("Unable to find the place with the following name: " + address, undefined);
        } else {
            longitude = body.features[0].center[0];
            latitude = body.features[0].center[1];

            weatherCallback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;