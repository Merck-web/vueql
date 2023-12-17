const {pool} = require("./dependes");
const winston = require("winston");


module.exports = {
    Mutation: {
        registerUser: async (_, object) => {
            const {username, password, email} = object;
            console.log(object)
            // Подключение к базе данных
            const client = await pool.connect();
            console.log(client, 123)
            try {
                // Проверка наличия пользователя с данными username, password и email
                const queryCheckUser = `
                    SELECT *
                    FROM users
                    WHERE username = $1
                       OR password = $2
                       OR email = $3
                `;
                const resultCheckUser = await client.query(queryCheckUser, [username, password, email]);
                console.log(resultCheckUser)
                // Если найден хотя бы один пользователь, выдать ошибку
                if (resultCheckUser.rows.length > 0) {
                    winston.errorLog('Пользователь с такими данными уже существует')
                }
                else {
                    // Если пользователь не найден, добавить нового пользователя
                    const queryAddUser = `
                        INSERT INTO users (username, password, email)
                        VALUES ($1, $2, $3)
                        RETURNING *
                    `;
                    const resultAddUser = await client.query(queryAddUser, [username, password, email]);

                    // Здесь можно вернуть данные нового пользователя, если это необходимо
                    return resultAddUser.rows[0];
                }
            }
            catch (error) {
                // Обработка ошибки
                winston.errorLog(`Ошибка при регистрации пользователя: ${error.message}`)
            }
            finally {
                // Закрытие подключения к базе данных
                client.release();
            }
        },

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