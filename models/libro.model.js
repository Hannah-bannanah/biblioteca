const db = require('../util/db.config');

module.exports = class Libro {
    constructor(isbn, titulo, id_editorial, genero, idioma, anyo_edicion, numero_paginas, ejemplares) {
        this.isbn = isbn;
        this.titulo = titulo;
        this.id_editorial = id_editorial;
        this.genero = genero;
        this.idioma = idioma;
        this.anyo_edicion = anyo_edicion;
        this.numero_paginas = numero_paginas;
        this.ejemplares = ejemplares;
    }

    static getAll() {
        return db.execute('SELECT * FROM libro');
    }

    static getLibro(isbn) {
        return db.execute('SELECT * FROM libro WHERE libro.isbn = ?', [isbn]);
    }

    static bookExists(isbn) {
        const output = false;
        Libro.getLibro('9788497932950').then(result => {
            if (result[0].length > 0) return true;
            else return false;
        });
    }

    addLibro2() {
        bookExists(this.isbn).then(result => console.log(result))
    }

    addLibro() {
        console.log("adding libro");
        // check whether the book exists before inserting
        Libro.getLibro(this.isbn)
            .then((result) => {
                console.log("getting libro");
                // if (result[0].length > 0) {
                // if the book exist
                console.log("book already exists");
                return result;
                // } else {
                //     console.log("brand new record");
                //     // add the book to the database
                //     const q = 'INSERT INTO libro (isbn, titulo, id_editorial, genero, idioma, año_edicion, numero_paginas, ejemplares) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
                //     const values = [
                //         this.isbn,
                //         this.titulo,
                //         this.id_editorial,
                //         this.genero,
                //         this.idioma,
                //         this.anyo_edicion,
                //         this.numero_paginas,
                //         this.ejemplares
                //     ];

                //     return db.execute(q, values);
                // }
            })
            .catch(err => console.log(err));

    }

    updateLibro() {
        Libro.getLibro(this.isbn)
            .then(([result]) => {
                if (result.length > 0) {
                    // update book in DB
                    const q = 'UPDATE libro SET titulo = ?, id_editorial = ?, genero = ?, idioma = ?, año_edicion = ?, numero_paginas = ?, ejemplares = ? WHERE isbn = ?'
                    const values = [
                        this.titulo,
                        this.id_editorial,
                        this.genero,
                        this.idioma,
                        this.anyo_edicion,
                        this.numero_paginas,
                        this.ejemplares,
                        this.isbn
                    ];

                    return db.execute(q, values);

                } else {
                    return {
                        success: 0,
                        message: "could not find book"
                    };
                }
            });
    }

    removeLibro() {
        return;
    }
}