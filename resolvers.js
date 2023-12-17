const {pool} = require("./dependes");
const bcrypt = require('bcrypt');
const {errorLog} = require("./winston");
const registration = require("./handlers/registration/registration");


module.exports = {
    Mutation: {
        ...registration,

        addTodoToDB:  async (_, {task, completed}) => {
            const client = await pool.connect();
            try {
                const query = `INSERT INTO todos(task, completed) VALUES($1, $2) RETURNING *`
                const result = await client.query(query, [task, completed]);
                return result.rows[0];
            } finally {
                client.release();
            }
        },
    },
}