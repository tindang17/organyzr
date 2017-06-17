exports.up = function(knex, Promise) {
  return knex.schema.createTable('games', function (table){
    table.increments('id').notNullable();
    table.string('location');
    table.date('date');
    table.time('time');
    table.string('description');
    table.integer('team_id').unsigned();
    table.foreign('team_id').references('teams.id');
  });  
};

exports.down = function(knex, Promise) {
  return knex.raw('drop table games cascade');
};