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

    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback("Unable to connect to weather service", undefined);
        } else if(body.error) {
            callback("Error in the response : (" + body.code + ") "+ body.error, undefined);
        } else {
            const data = body.currently;
            callback(undefined, body.daily.data[0].summary + " It is currently " + data.temperature +
                " degrees out. There is " + data.precipProbability + "% change of rain." );
        }
    });
};
module.exports = forecast;
