/** DB connection details */
// import necessary modules
// const mysql = require('mysql2');

// // connection parameters
// const connexionParams = {
//     host: 'localhost',
//     user: 'root',
//     password: 'mysqlpwd',
//     database: 'Biblioteca'
// };

// //create pool
// const con = mysql.createConnection(connexionParams);


// module.exports = con;

/** DB connection details */
// import necessary modules
const mysql = require('mysql2');

// connection parameters
const connexionParams = {
    host: 'localhost',
    user: 'root',
    password: 'mysqlpwd',
    database: 'Biblioteca'
};

//create pool
const pool = mysql.createPool(connexionParams);


module.exports = pool.promise();