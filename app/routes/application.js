import Ember from 'ember';
const { inject: { service }, Route } = Ember;

export default Route.extend({
  gapi: service(),

  beforeModel() {
    return this.get('gapi').initAuth().then((isSignedIn) => {
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
