import { moduleFor, test } from 'ember-qunit';

moduleFor('route:lists', 'Unit | Route | lists', {
  // Specify the other units that are required for this test.
  needs: ['service:gapi']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
