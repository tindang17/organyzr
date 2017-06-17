exports.up = function(knex, Promise) {
  return knex.schema.createTable('teams', function (table){
    table.increments('id').notNullable();
    table.string('name');
    table.string('logo');
    table.string('uuid');
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.raw('drop table teams cascade');
};
