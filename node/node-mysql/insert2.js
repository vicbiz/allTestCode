const mysql = require('mysql');
const config = require('./config.js');
const connection = mysql.createConnection(config);

let stmt = `INSERT INTO todos(title, completed) VALUES(?,?)`;
let todo = ['Insert a new row with placeholders', false];

connection.query(stmt, todo, (err, results, fields) => {
    if (err) return console.log(err.message);
    console.log('Todo Id: '+ results.insertId);
});

connection.end();
