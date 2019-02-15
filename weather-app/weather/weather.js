const request = require('request');

var getWeather = (latitude, longitude, callback) => {

  var apiKey = 'cb9204723f769ceb6b8ade17f6e7c586';

  request({
    url: `https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}?units=auto&lang=en`,
    json: true
  }, (error, response, body) => {
    try {
      if (!error && response.statusCode === 200) {
        callback(undefined, {
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature,
          degreeUnit: body.flags.units == 'us' ? 'F' : 'C',
          degreeUnicode: '\u00B0'
        });
      } else {
        callback("Unable to fetch weather.")
      }
    } catch (e) {
      callback('weather: An error has occured.');
    }
  });
};

// export modules
module.exports = {
  getWeather
};
