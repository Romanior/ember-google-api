import Ember from 'ember';
const { inject: { service }, Route, Object: EmberObject, computed } = Ember;

const newTask = (list) => {
  return {
    title:    '',
    taskList: list,
    isNew:    true
  }
};

export default Route.extend({
  gapi: service(),

  model({ list }) {
    let gapi = this.get('gapi');

    return gapi.getTasks(list).then((tasks) => {
      let items = tasks.result.items || [newTask(list)];
      return items.map((task) => {
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
          }),
        })
      })

    })
  },

  actions: {
    checkTask(task, value) {
      task.set('isCompleted', value);
    }
  }
});
