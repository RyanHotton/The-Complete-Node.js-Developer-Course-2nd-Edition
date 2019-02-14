const request = require('request');
const yargs = require('yargs');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

const urlAddress = 'http://www.mapquestapi.com/geocoding/v1/address?key=6z9N5TVsSK3ConRKYx7p1bHq9y8rncRm&location='
var encodedAddress = encodeURIComponent(argv.address);

request({
  url: urlAddress + encodedAddress,
  json: true
}, (error, response, body) => {
  // Address
  console.log(`Address: ${body.results[0].locations[0].street}`);
  // Latitude
  console.log(`Latitude: ${body.results[0].locations[0].latLng.lat}`);
  // Longitude
  console.log(`Longitude: ${body.results[0].locations[0].latLng.lng}`);
});
