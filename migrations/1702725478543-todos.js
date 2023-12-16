'use strict'

exports.up = async function (pgm) {
  await pgm.createTable('todos', {
    task: { type: 'varchar(100)' },
    completed: { type: 'boolean', notNull: true },

  });
};

exports.down = async function (pgm) {
  await pgm.dropTable('todos');
};
