const request = require('request');

request({
  url: 'http://www.mapquestapi.com/geocoding/v1/address?key=6z9N5TVsSK3ConRKYx7p1bHq9y8rncRm&location=1301%20lombard%20street%20philadelphia',
  json: true
}, (error, response, body) => {
  console.log(body);
  // Latitude
  console.log('Latitude:', body.results[0].locations[0].latLng.lat);
  // Longitude
  console.log('Longitude:', body.results[0].locations[0].latLng.lng);
});
