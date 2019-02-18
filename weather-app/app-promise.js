const yargs = require('yargs');
const axios = require('axios');

const formattedAddress = require('./geocode/formatted_address');

// declare/retrieve arguments
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

var encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=6z9N5TVsSK3ConRKYx7p1bHq9y8rncRm&thumbMaps=false&maxResults=1&outFormat=json&location=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
  if (!response.data) {
    throw new Error('Unable to find that address.');
  } else if (response.data.results[0].locations[0].geocodeQualityCode === 'A1XAX') {
    throw new Error('Unable to find that address.');
  } else {
    var lat = response.data.results[0].locations[0].latLng.lat;
    var lng = response.data.results[0].locations[0].latLng.lng;
    var weatherKey = 'cb9204723f769ceb6b8ade17f6e7c586';
    var weatherUrl = `https://api.darksky.net/forecast/${weatherKey}/${lat},${lng}?units=ca&lang=en`;
    console.log(formattedAddress.get(response.data.results[0].locations[0]));
    return axios.get(weatherUrl);
  }
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature} C. It feels like ${apparentTemperature} C.`);
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers.');
  } else {
    console.log(e.message);
  }
});
