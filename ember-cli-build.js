/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

var env = EmberApp.env() || 'development';
var isProductionLikeBuild = ['production', 'staging'].indexOf(env) > -1;
var fingerprint = {
  enabled: isProductionLikeBuild,
  prepend: (env === 'production') ? '' : 'http://app.ember-google-api.com.s3-website.eu-central-1.amazonaws.com/',
  extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map', 'svg', 'pdf']
}

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
    fingerprint
  });


  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
