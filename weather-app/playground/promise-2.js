const request = require('request');

const formattedAddress = require('../geocode/formatted_address');

var geocodeAddress = (address) => {

  const urlAddress = 'http://www.mapquestapi.com/geocoding/v1/address?key=6z9N5TVsSK3ConRKYx7p1bHq9y8rncRm&thumbMaps=false&maxResults=1&outFormat=json&location='
  var encodedAddress = encodeURIComponent(address);

  return new Promise((resolve, reject) => {
    request({
      url: urlAddress + encodedAddress,
      json: true
    }, (error, response, body) => {
      try {
        if (error || response.headers["content-length"] === "0") {
          reject('Unable to connect to the MapQuest servers.');
        } else if (body.info.statuscode === 400 || body.results[0].locations.length === 0) {
          reject('Unable to find that address.');
        } else if (body.info.statuscode === 0) {
          resolve({
            address: formattedAddress.get(body.results[0].locations[0]),
            latitude: body.results[0].locations[0].latLng.lat,
            longitude: body.results[0].locations[0].latLng.lng
          });
        }
      } catch (e) {
        reject('geocode: An error has occured.');
      }
    });
  });

};

geocodeAddress('19146').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
});
