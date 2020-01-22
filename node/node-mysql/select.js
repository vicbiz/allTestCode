let mysql = require('mysql');
let config = require('./config');
let connection = mysql.createConnection(config);

let sql = `SELECT * FROM todos`;

connection.query(sql, (err, results, fields) => {
    if(err) return console.log(err.message);
    console.log(results);
});

connection.end();