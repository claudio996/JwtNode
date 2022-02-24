const mysql = require('mysql2')

conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,

})
conexion.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('conexion !');
    }
})

module.exports = conexion