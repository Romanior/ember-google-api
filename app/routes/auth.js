import Ember from 'ember';
const { inject: { service }, Route } = Ember;

export default Route.extend({
  gapi: service(),

  redirect() {
    if (this.get('gapi.isSignedIn')) {
      this.transitionTo('lists')
    }
  },

  actions: {
    signIn() {
      this.get('gapi').signIn().then(() => {
        debugger
        this.transitionTo('lists');
      }, () => {
        // error handling
      })
    }
  }
});
