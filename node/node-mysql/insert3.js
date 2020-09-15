let mysql = require('mysql');
let config = require('./config.js');
let connection = mysql.createConnection(config);

let stmt = `INSERT INTO todos(title, completed) VALUES ? `;
let todos = [
    ['Insert multiple rows at a time', false],
    ['It should work perfectly', true]
];

connection.query(stmt, [todos], (err, results, fields) =>{
    if (err) return console.log(err.message);
    console.log('Row Insterted: '+results.affectedRows);
} );

connection.end();