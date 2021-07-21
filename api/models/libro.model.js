const db = require('../config/db.config');

// crear modelo libro
const Libro = function (libro) {
    this.isbn = libro.isbn;
    this.titutlo = libro.titulo;
    this.id_editorial = libro.id_editorial;
    this.genero = libro.genero;
    this.ejemplares = libro.ejemplares;
    this.idioma = libro.idioma;
    this.numero_paginas = libro.numero_paginas;
    this.año_edicion = libro.año_edicion;
}

// metodo getAll 
Libro.getAll = result => {
    let sql = `SELECT * FROM libro`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log(err);
            result(err, 'No se ha podido obtener la lista de libros');
            return;
        }

        console.log("mostrando libros");
        result(null, res);
    });
}

// metodo getBook
Libro.getBook = (isbn, result) => {
    let sql = `SELECT * FROM libro WHERE isbn = ${isbn}`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log(err);
            result(err, 'No se ha podido obtener el libro');
            return;
        }

        if (res.length) {
            console.log(`found book with isbn = ${isbn}`);
            result(null, res);
            return;
        }

        result({kind: "not found"}, null);
    })
}

// metodo create
Libro.create = (libro, result) => {
    let sql = `INSERT INTO libro SET ?`;
    db.query(sql, libro, (err, res) => {
        if (err) {
            console.log(err);
            result(err, 'No se ha podido añadir el libro');
            return;
        }

        console.log("Libro añadido correctamente: ", {libro});
        result(null, {libro});
    })
} 

Libro.delete = (isbn, result) => {
    let sql = `DELETE FROM libro WHERE isbn = ${isbn}`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log(err);
            result(err, 'No se ha podido eliminar el libro');
            return;
        }

        if (res.affectedRows == 0) {
            result({kind: "not found"}, null);
            return;
        }

        console.log("Eliminado el libro con isbn ", isbn);
        result(null, res);
    });
}

module.exports = Libro;