let mysql = require('mysql');
let config = require('./config');
let connection = mysql.createConnection(config);

let id = process.argv[2];
let sql = `SELECT * FROM todos WHERE id=`+mysql.escape(id); // Prevent MySql code Injection

connection.query(sql, (err, results, fields) => {
    if(err) return console.log(err.message);
    console.log(results);
});

connection.end();