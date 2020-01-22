let mysql = require('mysql');
let config = require('./config.js');
let connection = mysql.createConnection(config);

let sql = `INSERT INTO todos(title, completed)
           VALUES('Learn how to insert a new row', true)`;

connection.query(sql);
connection.end();