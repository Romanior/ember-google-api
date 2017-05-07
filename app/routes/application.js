import Ember from 'ember';
const { inject: { service }, Route } = Ember;

export default Route.extend({
  gapi: service(),

  beforeModel() {
    return this.get('gapi').auth().then((isSignedIn) => {
      if (isSignedIn) {
        this.transitionTo('lists');
      } else {
        this.transitionTo('auth');
      }
    })
  },

  actions: {
    signOut() {
      this.get('gapi').signOut().then(() => {
        this.transitionTo('auth');
      })
    }
  }
});
