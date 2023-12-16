exports.up = async (pgm) => {
    await pgm.createTable('new_table', {
        id: { type: 'serial', primaryKey: true },
        column1: { type: 'varchar(1000)', notNull: true },
        column2: { type: 'integer', default: 0 },
        // Здесь можно добавить другие колонки
    });
};

exports.down = async (pgm) => {
    await pgm.dropTable('new_table');
};
