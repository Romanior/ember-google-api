import Ember from 'ember';
const { inject: { service }, Controller } = Ember;

export default Controller.extend({
  gapi: service()
});
