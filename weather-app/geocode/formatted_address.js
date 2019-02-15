const diacritics = require('diacritics');

var get = (location, keepDiacritics = false) => {
  if (location) {
    var formattedAddress = '';
    if (location.street.length > 0) {
      formattedAddress = appendAddressString(formattedAddress, location.street);
    }
    if (location.adminArea5.length > 0) {
      formattedAddress = appendAddressString(formattedAddress, location.adminArea5);
    }
    if (location.adminArea4.length > 0) {
      formattedAddress = appendAddressString(formattedAddress, location.adminArea4);
    }
    if (location.adminArea3.length > 0) {
      formattedAddress = appendAddressString(formattedAddress, location.adminArea3, ' ');
    }
    if (location.postalCode.length > 0) {
      formattedAddress = appendAddressString(formattedAddress, location.postalCode, ' ');
    }
    if (location.adminArea1.length > 0) {
      formattedAddress = appendAddressString(formattedAddress, location.adminArea1);
    }
    if (keepDiacritics) {
      return formattedAddress;
    } else {
      return diacritics.remove(formattedAddress);
    }
  } else {
    return '';
  }
};

var appendAddressString = (addressString, newString, deliminator = ', ') => {
  if (addressString.length == 0) {
    return newString;
  } else {
    return `${addressString}${deliminator}${newString}`;
  }
};

// export modules
module.exports = {
  get
};
