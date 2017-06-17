
exports.up = function(knex, Promise) {
  return knex.schema.createTable('teams_users', function (table){
    table.increments('id');
    table.integer('team_id').unsigned();
    table.foreign('team_id').references('teams.id');
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.id');
  })    
};

exports.down = function(knex, Promise) {
  return knex.raw('drop table teams_users cascade')
};