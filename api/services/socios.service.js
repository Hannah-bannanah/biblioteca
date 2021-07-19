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

module.exports = {register};