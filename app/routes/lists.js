import Ember from 'ember';
const { inject: { service }, Route, isPresent } = Ember;

export default Route.extend({
  gapi: service(),

  model() {
    return this.get('gapi').getLists().then((lists) => {
      return lists.result.items;
    })
  },

  afterModel(model) {
    if (isPresent(model)) {
      this.transitionTo('lists.list', model.get('firstObject.id'));
    }
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('gapi', this.get('gapi'));
  },

  actions: {
    transitionToList(listId) {
      this.transitionTo('lists.list', listId);
    }
  }
});
