const { Pool } = require('pg');

const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'graphql',
    password: '9889',
    port: 5432,
}

const pool = new Pool(config)


pool.on('error', (error, client) => {
    console.log(error)
    process.exit(-1)
})

pool.on('connect', client => {
    console.log('New client')
})

pool.on('remove', client => {
    console.log('Client pool removed')
})

module.exports = {
    pool:                       pool,
}