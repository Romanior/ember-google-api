/* eslint-env node */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'google-api-tasks',
    environment:  environment,
    rootURL:      '/',
    locationType: 'hash',
    EmberENV:     {
      FEATURES:          {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    GAPI: {
      CLIENT_ID: '1098270604340-a9l200qlatqarcccqdebnkbh6faeaaqc.apps.googleusercontent.com',
      SCOPES:    'https://www.googleapis.com/auth/tasks.readonly',
      SRC:       'https://apis.google.com/js/api.js',
      DOCS:      ['https://www.googleapis.com/discovery/v1/apis/translate/v2/rest']
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
