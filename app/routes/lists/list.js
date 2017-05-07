import Ember from 'ember';
const { inject: { service }, Route, Object: EmberObject, computed } = Ember;

export default Route.extend({
  gapi: service(),

  model({ list }) {
    return this.get('gapi').getTasks(list).then((tasks) => {
      return tasks.result.items.map((task) => {
        let emTask = EmberObject.create(task);

        return emTask.reopen({
          isCompleted: computed('status', {
            get() {
              return this.get('status') === 'completed';
            },

            set(key, value) {
              this.set('status', 'completed');
              return value;
            }
          })
        })
      })
    })
  }
});
