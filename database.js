const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'sam',
    password: 'samsing17',
    database: 'store_app'
})


module.exports = pool