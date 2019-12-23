const request = require('request');
const fs = require('fs');

const forecast = (longitude, latitude, callback) => {
    const authKeys = JSON.parse(fs.readFileSync('../auth_keys.json').toString());
    const authKey_Darksky = authKeys.darksky;
    let url = "https://api.darksky.net/forecast/";
    url += authKey_Darksky + "/";
    url += latitude + "," + longitude;
    url += "?units=si";
    url += "&lang=en";

    request({ url: url, json: true }, (error, response, body) => {
        if(error) {
            callback("Unable to connect to weather service", undefined);
        } else if(response.body.error) {
            callback("Error in the response : (" + response.body.code + ") "+ response.body.error, undefined);
        } else {
            const data = response.body.currently;
            callback(undefined, response.body.daily.data[0].summary + " It is currently " + data.temperature +
                " degrees out. There is " + data.precipProbability + "% change of rain." );
        }
    });
};
module.exports = forecast;
