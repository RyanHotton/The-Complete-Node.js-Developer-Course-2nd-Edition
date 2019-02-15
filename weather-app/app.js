const request = require('request');
const yargs = require('yargs');

const geocode = require('./geocode/geocode');

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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(JSON.stringify(results, undefined, 2));
    getWeather(results.latitude, results.longitude);
  }
});

var getWeather = (latitude, longitude) => {

  var apiKey = 'cb9204723f769ceb6b8ade17f6e7c586';

  request({
    url: `https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}?units=auto&lang=en`,
    json: true
  }, (error, response, body) => {
    try {
      if (!error && response.statusCode === 200) {
        var degreeUnit = body.flags.units == 'us' ? 'F' : 'C';
        console.log(`Temperature: ${body.currently.temperature} \u00B0${degreeUnit}`);
      } else {
        console.log("Unable to fetch weather.")
      }
    } catch (e) {
      console.log('weather: An error has occured.');
    }
  });
};
