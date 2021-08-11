const db = require('../util/db.config');

module.exports = class Libro {
    constructor(isbn, titulo, id_editorial, genero, idioma, numero_paginas, ejemplares) {
        this.isbn = isbn;
        this.titulo = titulo;
        this.id_editorial = id_editorial;
        this.genero = genero;
        this.idioma = idioma;
        this.numero_paginas = numero_paginas;
        this.ejemplares = ejemplares;
    }

    static getAll() {
        return db.execute('SELECT * FROM libro');
    }

    static getBook(isbn) {
        return db.execute('SELECT * FROM libro WHERE libro.isbn = ?', [isbn]);
    }

    static bookExists(isbn) {
        return Libro.getBook(isbn).then(result => {
            if (result[0].length > 0) return true;
            else return false
        });
    }

    static addBook(libro, id_autor) {
        return Libro.bookExists(libro.isbn).then(result => {
                if (result) {
                    return libro.updateBook(libro);
                } else {
                    // TODO actualizar todas las tablas (rollback si hay error)
                    // add the book to the database
                    const q = 'INSERT INTO libro (isbn, titulo, id_editorial, genero, idioma, numero_paginas, ejemplares) VALUES (?, ?, ?, ?, ?, ?, ?)';
                    const values = [
                        libro.isbn,
                        libro.titulo,
                        libro.id_editorial,
                        libro.genero,
                        libro.idioma,
                        libro.numero_paginas,
                        libro.ejemplares
                    ];

                    // return db.execute(q, values);
                    return db.execute(q, values).then(result => {
                        return {
                            result: result,
                            success: 1,
                            action: 'create'
                        }
                    });
                }
            })
            .catch(err => console.log(err));
    }

    updateBook(libro) {
        return Libro.bookExists(this.isbn).then(result => {
            if (!result) {
                return {
                    success: 0,
                    bookExists: false,
                    message: 'isbn not found'
                }
            } else {
                // update the book in the database
                const q = `UPDATE libro SET titulo = ?, id_editorial = ?, genero = ?, idioma = ?, numero_paginas = ?, ejemplares = ? WHERE isbn = ?`
                const values = [
                    libro.titulo,
                    libro.id_editorial,
                    libro.genero,
                    libro.idioma,
                    libro.numero_paginas,
                    libro.ejemplares,
                    this.isbn
                ];

                return db.execute(q, values).then(result => {
                    return {
                        result: result,
                        success: 1,
                        action: 'update'
                    }
                });;
            }
        })
    }

    removeLibro() {
        return;
    }
}