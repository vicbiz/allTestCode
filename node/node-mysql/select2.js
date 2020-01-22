let mysql = require('mysql');
let config = require('./config');
let connection = mysql.createConnection(config);

let sql = `SELECT * FROM todos WHERE completed=?`;

connection.query(sql, [true], (err, results, fields) => {
    if(err) return console.log(err.message);
    console.log(results);
});

connection.end();