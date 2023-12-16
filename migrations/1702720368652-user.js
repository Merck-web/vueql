'use strict'

module.exports.up = async function (pgm) {
    await pgm.createTable('user', {
        id: { type: 'serial', primaryKey: true },
        username: { type: 'varchar(100)', notNull: true, unique: true },
        email: { type: 'varchar(100)', notNull: true },
        password: { type: 'varchar(100)', notNull: true },
        avatar: { type: 'varchar(100)' },
        joinDate: { type: 'timestamp', default: pgm.func('current_timestamp') },
        favorites: { type: 'jsonb', notNull: true },
    });
};

module.exports.down = async function (pgm) {
    await pgm.dropTable('user');
};
