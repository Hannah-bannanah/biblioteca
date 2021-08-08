// const db = require('../../util/db.config');
const db = require('../../util/dbconfig')

class Libro {
    constructor(isbn, titulo, id_editorial, genero, ejemplares, idioma, numero_paginas, año_edicion) {
        this.isbn = isbn;
        this.titulo = titulo;
        this.id_editorial = id_editorial;
        this.genero = genero;
        this.ejemplares = ejemplares;
        this.idioma = idioma;
        this.numero_paginas = numero_paginas;
        this.año_edicion = año_edicion;
    }

    static listBooks(callback) {
        let sql = `select l.isbn, l.titulo, e.nombre as editorial, l.genero, l.ejemplares, l.idioma, l.numero_paginas, l.año_edicion, a.nombre as nombreAutor, a.apellidos as apellidosAutor from libro as l join libro_autor on l.isbn = libro_autor.isbn join autor as a on libro_autor.id_autor = a.id_autor join editorial as e on l.id_editorial = e.id_editorial;`
        db.query(sql, (err, res) => {
            if (err) {
                console.log(err);
                callback(err, 'No se ha podido obtener la lista de libros');
                return;
            }

            console.log("mostrando libros");
            callback(null, res);
        });
    }

    getBook(callback) {
        let sql = `select l.isbn, l.titulo, e.nombre as editorial, l.genero, l.ejemplares, l.idioma, l.numero_paginas, l.año_edicion, a.nombre as nombreAutor, a.apellidos as apellidosAutor from libro as l join libro_autor on l.isbn = libro_autor.isbn join autor as a on libro_autor.id_autor = a.id_autor join editorial as e on l.id_editorial = e.id_editorial WHERE l.isbn = ${this.isbn}`;
        db.query(sql, (err, res) => {
            if (err) {
                console.log(err);
                callback(err, 'No se ha podido obtener el libro');
                return;
            }

            if (res.length) {
                console.log(`found book with isbn = ${this.isbn}`);
                callback(null, res);
                return;
            }

            callback({
                kind: "not found"
            }, null);
        })
    }

    create(id_autor, callback) {
        // si el isbn ya existe, aumentar el número de ejemplares
        db.query(`SELECT isbn FROM libro WHERE isbn = ?`, this.isbn, (err, res) => {
            console.log(this.isbn);
            if (err) {
                console.log(err);
                callback(err, 'No se ha podido añadir el libro 1');
                return;
            }
            if (res.length) {
                console.log("El libro ya existe: ", res);
                db.query(`UPDATE libro SET ejemplares = ejemplares + ${this.ejemplares}`, (err, res) => {
                    if (err) {
                        console.log(err);
                        callback(err, 'No se ha podido añadir el libro 2');
                        return;
                    }
                    console.log("Aumentado el numero de ejemplares: ", {
                        res
                    });
                    callback(null, {
                        res
                    });
                    return;
                });
            } else {
                // si no existe, crear un registro nuevo
                db.beginTransaction((err) => {
                    if (err) {
                        console.log(err);
                        callback(err, 'No se ha podido añadir el libro 3');
                        return;
                    }
                    db.query(`INSERT INTO libro SET ?`, this, (err, res) => {
                        if (err) {
                            db.rollback(() => {
                                console.log(err);
                                callback(err, 'No se ha podido añadir el libro 4');
                                return;
                            });
                        }

                        let sql = `INSERT INTO libro_autor (isbn, id_autor) VALUES (?, ?)`;
                        db.query(sql, [this.isbn, id_autor], (err, res) => {
                            if (err) {
                                db.rollback(() => {
                                    console.log(err);
                                    callback(err, 'No se ha podido añadir el libro 5');
                                    return;
                                });
                            }
                            db.commit((err) => {
                                if (err) {
                                    db.rollback(() => {
                                        console.log(err);
                                        callback(err, 'No se ha podido añadir el libro 6');
                                        return;
                                    });
                                }

                                console.log("Libro añadido correctamente: ", {
                                    isbn: this.isbn
                                });
                                callback(null, {
                                    isbn: this.isbn
                                });
                            });

                        });
                    });
                });
            }

        });
    }

    delete(callback) {
        //TODO eliminar registro de libro_autor
        let sql = `DELETE FROM libro WHERE isbn = ${this.isbn}`;
        db.query(sql, (err, res) => {
            if (err) {
                console.log(err);
                callback(err, 'No se ha podido eliminar el libro');
                return;
            }

            if (res.affectedRows == 0) {
                callback({
                    kind: "not found"
                }, null);
                return;
            }

            console.log("Eliminado el libro con isbn ", this.isbn);
            callback(null, res);
        });
    }
}

module.exports = Libro;