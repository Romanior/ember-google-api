import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    checkTask(task, value) {
      task.set('isCompleted', value)
    }
  }
});
