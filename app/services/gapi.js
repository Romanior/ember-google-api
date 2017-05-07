import Ember from 'ember';
import ENV from '../config/environment';

const { RSVP, Service } = Ember;

export default Service.extend({
  isSignedIn: false,

  /**
   * Load google api script and init client
   * @returns {RSVP.Promise}
   * @public
   */
  initAuth() {
    return this.load().then(() => {
      return new RSVP.Promise((resolve, reject) => {
        gapi.load('client:auth2', () => {
          this.initClient().then(resolve, reject)
        });
      });
    });
  },

  /**
   * Initializes Google api client
   * @returns {RSVP.Promise}
   * @private
   */
  initClient() {
    return gapi.client.init({
      clientId: ENV.GAPI.CLIENT_ID,
      scope:    ENV.GAPI.SCOPES
    }).then(() => {
      let isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
      this.set('isSignedIn', isSignedIn);

      gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateStatus.bind(this, status));
      return isSignedIn;
    });
  },

  updateStatus(status) {
    this.set('isSignedIn', status);
  },

  /**
   *  Sign in
   * @returns {*}
   */
  signIn() {
    debugger
    return gapi.auth2.getAuthInstance().signIn();
  },

  /**
   * Sign out
   * @returns {*}
   */
  signOut() {
    return gapi.auth2.getAuthInstance().signOut();
  },

  /**
   * Load google api script
   * @returns {RSVP.Promise}
   * @private
   */
  load() {
    return new RSVP.Promise((resolve) => { // reject on timeout
      let tag = document.createElement('script');
      document.head.appendChild(tag);
      tag.onload = resolve;
      tag.async = true;
      tag.defer = true;
      tag.src = ENV.GAPI.SRC;
    });
  }
});
