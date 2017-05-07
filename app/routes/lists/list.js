import Ember from 'ember';
const { inject: { service }, Route, Object: EmberObject, computed } = Ember;

const taskExtend = (task, list, gapi, isNew = false) => {
  return {
    title: computed(function() {
      return isNew ? '' : task.title;
    }),
    taskList: list,
    isNew,
    isCompleted: computed('status', {
      get() {
        return this.get('status') === 'completed';
      },

      set(key, value) {
        this.set('status', 'completed');
        return value;
      }
    }),
    update(fields, body) {
      gapi.updateTask(task.id, list, fields, body)
    }
  }
};

export default Route.extend({
  gapi: service(),

  model({ list }) {
    let gapi = this.get('gapi');

    return gapi.getTasks(list).then((tasks) => {
      let items = tasks.result.items || [taskExtend({}, list, gapi, true)];
      return items.map((task) => {
        let emTask = EmberObject.create(task);
        return emTask.reopen(taskExtend(task, list, gapi))
      })

    })
  },

  actions: {
    checkTask(task, value) {
      task.set('isCompleted', value);
      task.update(['status'], { status: task.get('status') });
    }
  }
});
