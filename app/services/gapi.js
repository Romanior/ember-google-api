import Ember from 'ember';
import ENV from '../config/environment';

const { RSVP, Service, computed } = Ember;

export default Service.extend({
  isSignedIn: false,

  currentUser: computed('currentUserGapi', function() {
    let currentUserGapi = this.get('currentUserGapi');
    if (currentUserGapi) {
      let profile = currentUserGapi.getBasicProfile();

      return {
        email:  profile.getEmail(),
        avatar: profile.getImageUrl()
      }
    }
  }),

  /**
   * Load google api script and init client
   * @returns {RSVP.Promise}
   * @public
   */
  auth() {
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
      clientId:      ENV.GAPI.CLIENT_ID,
      scope:         ENV.GAPI.SCOPE,
      discoveryDocs: ENV.GAPI.DOCS
    }).then(() => {
      let updateStatus = (status) => {
        this.set('isSignedIn', status);

        if (status) {
          this.set('currentUserGapi', gapi.auth2.getAuthInstance().currentUser.get());
        } else {
          this.set('currentUserGapi', null);
        }
      };

      updateStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateStatus);

      return this.get('isSignedIn');
    });
  },

  /**
   *  Sign in
   * @returns {*}
   */
  signIn() {
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
  },

  getLists() {
    return gapi.client.tasks.tasklists.list();
  },

  getTasks(tasklist) {
    return gapi.client.tasks.tasks.list({ tasklist })
  }
});
