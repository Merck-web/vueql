const {pool} = require("../../dependes");
const {errorLog} = require("../../winston");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const registerUser = async (_, object) => {
    const {username, password, email} = object;
    // Подключение к базе данных
    const client = await pool.connect();

    if ([username, password, email].some(value => !value)) {
        errorLog('Данные ведены некорректно')
    }
    // Если пользователь не найден, добавить нового пользователя
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
        // Проверка наличия пользователя с данными username, password и email
        const queryCheckUser = `
                    SELECT *
                    FROM users
                    WHERE username = $1
                       OR email = $2
                `;
        const resultCheckUser = await client.query(queryCheckUser, [username, email]);

        // Если найден хотя бы один пользователь, выдать ошибку
        if (resultCheckUser.rows.length > 0) {
            errorLog('Пользователь с такими данными уже существует')
        }
        else {
            // Если пользователь не найден, добавить нового пользователя
            const queryAddUser = `
                        INSERT INTO users (username, password, email)
                        VALUES ($1, $2, $3)
                        RETURNING *
                    `;
            const resultAddUser = await client.query(queryAddUser, [username, hashedPassword, email]);

            // Здесь можно вернуть данные нового пользователя, если это необходимо
            return {
                email: resultAddUser.rows[0].email,
                username: resultAddUser.rows[0].username,
            };
        }
    }
    catch (error) {
        // Обработка ошибки
        errorLog(`Ошибка при регистрации пользователя: ${error.message}`)
    }
    finally {
        // Закрытие подключения к базе данных
        client.release();
    }
}

module.exports = {
    registerUser: registerUser,
}