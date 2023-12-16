'use strict'

exports.up = async function (pgm) {
  await pgm.createTable('commentsPosts', {
    id: { type: 'serial', primaryKey: true },
    content: { type: 'text', notNull: true },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
    post_id: {
      type: 'integer',
      references: 'posts(id)',
      onDelete: 'CASCADE'
    },
    user_id: {
      type: 'integer',
      references: 'users(id)',
      onDelete: 'CASCADE'
    }
  });
};

exports.down = async function (pgm) {
  await pgm.dropTable('commentsPosts');
};
