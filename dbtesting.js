const db = require('./util/db.config');
const Libro = require('./models/libro.model');

// db.execute("SELECT * FROM libro WHERE libro.isbn = 9780099470465").then(([result]) => {
//     if (result.length > 0) {
//         console.log("result");
//     } else {
//         console.log("no result");
//     }
// });

// Libro.getLibro('9780099470465').then(result => console.log(result));

const libro = new Libro(
    isbn = 'prueba4', titulo = 'prueba', id_editorial = 1, genero = 'prueba', idioma = 'prueba', numero_paginas = 10, anyo_edicion = 2020, ejemplares = 1
);

// Libro.getLibro('9788497932950').then(result => {
//     console.log(result[0]);
//     return result;
// }).then(result => {
//     if (result[0].length > 0) return true;
//     else return false;
// }).then(result => {
//     if (result) console.log("book exists");
//     else console.log("book doesn't exist");
// });

// Libro.bookExists('9788497932950').then(result => {
//     if (result) console.log("book exists");
//     else console.log("book doesn't exist");
// });

// Libro.getLibro('9788497932950').then(result => console.log(result));
Libro.bookExists('9788497932950').then(result => console.log(result));