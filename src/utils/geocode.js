const request = require('request');

const geoCode = (address, callback) => {
    const mapboxToken = 'pk.eyJ1IjoibWFoaW4zMDE2IiwiYSI6ImNsZTRkMDhtazAxcXozcG54eHI1eHhxNXkifQ.K5lnLBUOiulKkk543Fxv_w';
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxToken}`;

    request(url, { json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to geocode service', undefined);
        } else if (!response.body.features.length) {
            callback('Unable to find location', undefined);
        } else {
            // const [longitude, latitude] = response.body.features[0].center;
            const { center, place_name } = response.body.features[0];
            const [longitude, latitude] = center;

            callback(undefined, { latitude, longitude, location: place_name });
        }
    });
};

module.exports = geoCode;