import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('gapi-auth', 'Integration | Component | gapi auth', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{gapi-auth}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#gapi-auth}}
      template block text
    {{/gapi-auth}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
