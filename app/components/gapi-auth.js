import Ember from 'ember';
const { inject: { service }, Component } = Ember;

export default Component.extend({
  gapi: service(),

  actions: {
    signIn() {
      this.get('gapi').signIn();
    },
    signOut() {
      this.get('gapi').signOut();
    }
  }
});
