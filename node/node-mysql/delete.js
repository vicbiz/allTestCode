const mysql = require('mysql');
const config = require('./config.js');
const connection = mysql.createConnection(config);

let id = process.argv[2];
let sql = `DELETE FROM todos WHERE id = `+mysql.escape(id);

connection.query(sql, (err, results, fields) => {
    if(err) return console.log(err.message);
    console.log('Deleted Row(s): '+results.affectedRows);
});

connection.end();