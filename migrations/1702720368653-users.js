'use strict'

exports.up = async (pgm) => {
    await pgm.addColumns('users', {
        role: {type: 'integer', notNull: true, default: 1}
    });
};

exports.down = async (pgm) => {
    await pgm.dropColumns('users', 'role');
};