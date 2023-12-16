'use strict'

exports.up = async function (pgm) {
  // Создание таблицы постов
  await pgm.createTable('posts', {
    id: { type: 'serial', primaryKey: true },
    title: { type: 'varchar(255)', notNull: true },
    content: { type: 'text', notNull: true },
    user_id: {
      type: 'integer',
      references: 'users(id)',
      onDelete: 'CASCADE'
    }
  });
};

exports.down = async function (pgm) {
  await pgm.dropTable('posts');
};
