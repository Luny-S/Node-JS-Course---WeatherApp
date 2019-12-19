const request = require('request');
const getWeather = require('./utils/geocode');
// const authKey_Darksky_ = authKeys.darksky;

const address = "Wrocław";
let latitude = 0;
let longitude = 0;


// let sendWeatherRequest = (longitude, latitude) => {
//     let url = "https://api.darksky.net/forecast/";
//     url += authKey_Darksky_ + "/";
//     url += latitude + "," + longitude;
//     url += "?units=si";
//     url += "&lang=en";
//
//     console.log(url);
//
//     request({ url: url, json: true }, (error, response, body) => {
//         if(error) {
//             console.log("Unable to connect to weather service");
//         } else if(response.body.error) {
//             console.log("Error in the response : (" + response.body.code + ") "+ response.body.error);
//         } else {
//             const data = response.body.currently;
//             console.log(response.body.daily.data[0].summary + " It is currently " + data.temperature +
//                 " degrees out. There is " + data.precipProbability + "% change of rain.");
//         }
//     });
// };

getWeather(address, (error, data) => {
    if(data){
        console.log("Weather for: " + data.location + "( Longitude: " + data.longitude + (data.longitude >= 0 ? "E" : "W") + ", Latitude: " + data.latitude + (data.latitude >= 0 ? "N" : "S") + " )");
    }
});