exports.up = function(knex, Promise) {
  return knex.schema.alterTable('teams', function(table) {
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('teams', function(table) {
    table.dropTimestamps()
  })
};
