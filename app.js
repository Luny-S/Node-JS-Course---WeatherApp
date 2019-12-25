const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

let latitude = 0;
let longitude = 0;

const address = process.argv[2];

if(!address) {
    console.log("Please provide an address.");
}
else {
    geocode(address, (error, {latitude, longitude, location}) => {
        if (error) {
            return console.log(error);
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return console.log(error);
            }
            console.log("Weather for: " + location + "( Longitude: " + longitude + (longitude >= 0 ? "E" : "W") + ", Latitude: " + latitude + (latitude >= 0 ? "N" : "S") + " )");
            console.log(forecastData);
        });
    });

}