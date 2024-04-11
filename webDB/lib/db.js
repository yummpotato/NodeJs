// 202132118_박혜정

var mysql = require('mysql');

var db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '0408',
    database: 'webdb2023',
    multipleStatements: true
})
db.connect();
module.exports = db;