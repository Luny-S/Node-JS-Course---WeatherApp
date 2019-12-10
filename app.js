const request = require('request');



const authKey = "852cab1c66a15f0986b4f1c481adad49";
const longitude = '17.0333300';
const latitude = '51.1000000';

let url = "https://api.darksky.net/forecast/";
url += authKey + "/";
url += latitude + "," + longitude;
url += "?units=si";
url += "&lang=en";


console.log(url);

request({ url: url, json: true }, (error, response) => {
    const data = response.body.currently;
    console.log(response.body.daily.data[0].summary + " It is currently " + data.temperature +
        " degrees out. There is " + data.precipProbability + "% change of rain.");
});

