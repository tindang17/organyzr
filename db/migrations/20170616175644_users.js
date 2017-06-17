exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id');
    table.string('first_name');
    table.string('last_name');
    table.string('email');
    table.string('password');
    table.string('phone');
    table.string('facebook_id')
    table.boolean('text_notification');
    table.boolean('email_notification');
  });
};

exports.down = function(knex, Promise) {
  return knex.raw('drop table users cascade');
};

