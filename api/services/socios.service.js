/** Servicios del modulo de socios */
// import necessary modules
//const mysql = require ('mysql2');
const db = require('../config/db.config');

// register a new socio
function register (data, callback) {
    // connect to db
    db.connect((err) => {
        if (err) throw err;
        console.log("Connected to DB");
    });

    // Submit registration query
    const sql= "INSERT INTO socio (nombre, apellidos, nacionalidad, direccion, telefono, email) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [data.nombre, data.apellidos, data.nacionalidad, data.direccion, data.telefono, data.email];

    db.query(sql,values, (err, result, fields) => {
        if (err) return callback(err);
        return callback(null, 'Registration successful');
    });

};

/* function login (data, callback) {
    db.connect((err) => {
        if(err) throw err;
        console.log("Connected to DB")
    });

    const sql = `SELECT id_socio FROM users WHERE email = ? AND password = ?`;
    db.query(sql, [data.email, data.password], (err, result, fields) => {
        return;
    });
} */

function login (data, callback) {
    db.connect((err) => {
        if(err) throw err;
        console.log("Connected to DB")
    });

    const sql = `SELECT id_socio FROM socio WHERE email = ?`;
    db.query(sql, [data.email], (err, result, fields) => {
        if (err) return callback(err);
        if (result.length > 0) {
            return callback(null, "Login successful");
        } else {
            return callback("Invalid credentials");
        }
    });
}

module.exports = {register, login};