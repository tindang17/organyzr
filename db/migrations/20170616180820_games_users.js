exports.up = function(knex, Promise) {
  return knex.schema.createTable('games_users', function (table){
    table.increments('id').notNullable();
    table.integer('game_id').unsigned();
    table.foreign('game_id').references('games.id');
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.id');
    table.boolean('going').defaultTo(false);
  });  
};

exports.down = function(knex, Promise) {
  return knex.raw('drop table games_users cascade');
};
