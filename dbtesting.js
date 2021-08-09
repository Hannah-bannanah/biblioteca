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
    isbn = 'prueba', titulo = 'prueba', id_editorial = 1, genero = 'prueba', idioma = 'prueba', numero_paginas = 10, ejemplares = 1
);

const libro2 = new Libro(
    isbn = 'prueba', titulo = 'PRUEBA2', id_editorial = 2, genero = 'GENERO2', idioma = 'CLINGON2', numero_paginas = 1022, ejemplares = 2
);

Libro.addBook(libro).then(result => console.log(result));