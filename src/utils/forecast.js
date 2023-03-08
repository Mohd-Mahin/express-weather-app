const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=0da88da2b3d69d1e932fabe416e3c860&query=${latitude},${longitude}&units=f`;

    request(url, { json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to service', undefined);
        } else if (response.body.error) {
            callback('Unable to find location', undefined);
        } else {
            const weatherBody = response.body;
            callback(undefined, weatherBody);
            // const { temperature, feelslike } = weatherBody.current;
        }
    });
};

module.exports = forecast;