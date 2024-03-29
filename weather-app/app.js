const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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
    console.log(results.address);
    // get the weather
    weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`It's currently ${weatherResults.temperature}${weatherResults.degreeUnicode}${weatherResults.degreeUnit}. It feels like ${weatherResults.apparentTemperature}${weatherResults.degreeUnicode}${weatherResults.degreeUnit}.`);
      }
    });
  }
});
