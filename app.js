const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

let latitude = 0;
let longitude = 0;

const address = process.argv[2];

if(!address) {
    console.log("Please provide an address.");
}
else {
    geocode(address, (error, data) => {
        if (error) {
            return console.log(error);
        }

        forecast(data.longitude, data.latitude, (error, forecastData) => {
            if (error) {
                return console.log(error);
            }
            console.log("Weather for: " + data.location + "( Longitude: " + data.longitude + (data.longitude >= 0 ? "E" : "W") + ", Latitude: " + data.latitude + (data.latitude >= 0 ? "N" : "S") + " )");
            console.log(forecastData);
        });
    });

}