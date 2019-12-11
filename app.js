const request = require('request');
const fs = require('fs');

const authKeys = JSON.parse(fs.readFileSync('../auth_keys.json').toString());
const authKey_Darksky_ = authKeys.darksky;
const authKey_Mapbox = authKeys.mapbox;

const place = "Wroclaw";
let latitude = 0;
let longitude = 0;

let getWeather = (place) => {
    let geocoding_url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + place + ".json?";
    geocoding_url += "access_token=" + authKey_Mapbox;
    geocoding_url += "&limit=1";

    request({url: geocoding_url, json: true} , (error,response) => {
        longitude = response.body.features[0].center[0];
        latitude = response.body.features[0].center[1];
        console.log("Weather for: " + response.body.features[0].place_name + "( Longitude: " + longitude + (longitude >= 0 ? "E" : "W") + ", Latitude: " + latitude + (latitude >= 0 ? "N" : "S") + " )");

        sendWeatherRequest(longitude, latitude);
    });
};

let sendWeatherRequest = (longitude, latitude) => {
    let url = "https://api.darksky.net/forecast/";
    url += authKey_Darksky_ + "/";
    url += latitude + "," + longitude;
    url += "?units=si";
    url += "&lang=en";

    request({ url: url, json: true }, (error, response) => {
        const data = response.body.currently;
        console.log(response.body.daily.data[0].summary + " It is currently " + data.temperature +
            " degrees out. There is " + data.precipProbability + "% change of rain.");
    });
};

getWeather(place);