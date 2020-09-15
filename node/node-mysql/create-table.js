let mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'todoapp'
});

connection.connect( (err) => {
    if(err) return console.log('error: '+err.message);

    let createTodos = `create table if not exists todos(
        id int primary key auto_increment,
        title varchar(255) not null,
        completed tinyint(1) not null default 0
    )`;

    connection.query(createTodos, (err, results, fields) => {
        if(err) console.log(err.message);
    });

    connection.end((err) => {
        if(err) return console.log(err.message);
    });
});



// const connectDB = () => {
//     let mysql = require('mysql');

//     let connection = mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'mysql',
//         database: 'todoapp'
//     })
    
//     connection.connect((err) => {
//         if(err) return console.log('error: '+err.message);
//         console.log('Connected to the MySql server');
//     });
    
//     connection.end((err) => {
//         if(err) return console.log('error: '+err.message);
//         console.log('Closed te database connection');
//     });
// }

// exports.connectDB = connectDB;
