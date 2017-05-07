import Ember from 'ember';
const { inject: { service }, Route } = Ember;

export default Route.extend({
  gapi: service(),

});
