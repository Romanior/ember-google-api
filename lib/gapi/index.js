/* eslint-env node */
'use strict';

module.exports = {
  name: 'gapi',

  isDevelopingAddon: function() {
    return true;
  },

  contentFor: function(type) {
    if (type === 'head') {
      return '<script async defer src="https://apis.google.com/js/api.js"></script>'
    } else {
      return '';
    }
  }
};
