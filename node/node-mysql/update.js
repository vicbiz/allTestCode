const mysql = require('mysql');
const config = require('./config.js');
const connection = mysql.createConnection(config);

let sql = `UPDATE todos SET completed = ? WHERE id = ?`;
let data = [false, 1];

connection.query(sql, data, (err, results, fields) => {
    if(err) return console.log(err.message);
    console.log('Rows affected: '+results.affectedRows);
});

connection.end();