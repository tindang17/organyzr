exports.up = function(knex, Promise) {
  return knex.schema.alterTable('users', function(t) {
    t.unique('phone')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('users', function(t) {
    t.dropUnique('phone')
  })
};
