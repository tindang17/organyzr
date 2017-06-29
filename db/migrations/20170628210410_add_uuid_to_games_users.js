exports.up = function(knex, Promise) {
  return knex.schema.alterTable('games_users', function(table) {
    table.string('uuid');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('games_users', function(table) {
    table.dropColumn('uuid');
  })
};