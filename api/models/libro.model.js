const con = require('../config/db.config');
const db = require('../config/db.config');

// crear modelo de libro
const Libro = function (libro) {
    this.isbn = libro.isbn;
    this.titulo = libro.titulo;
    this.id_editorial = libro.id_editorial;
    this.genero = libro.genero;
    this.ejemplares = libro.ejemplares;
    this.idioma = libro.idioma;
    this.numero_paginas = libro.numero_paginas;
    this.año_edicion = libro.año_edicion;
}

// metodo getAll 
Libro.listBooks = result => {
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
Libro.create = (libro, id_autor, result) => {
    // si el isbn ya existe, aumentar el número de ejemplares
    db.query(`SELECT isbn FROM libro WHERE isbn = ${libro.isbn}`, (err, res) => {
        if (err) {
            console.log(err);
            result(err, 'No se ha podido añadir el libro');
            return;
        }
        if (res.length) {
            console.log("El libro ya existe: ", res);
            db.query(`UPDATE libro SET ejemplares = ejemplares + ${libro.ejemplares}`, (err, res) => {
                if (err) {
                    console.log(err);
                    result(err, 'No se ha podido añadir el libro');
                    return;
                }
                console.log("Aumentado el numero de ejemplares: ", {res});
                result(null, {res});  
                return;
            });
        } else {
            // si no existe, crear un registro nuevo
            db.beginTransaction((err) => {
                if (err) {
                    console.log(err);
                    result(err, 'No se ha podido añadir el libro');
                    return;
                }
                db.query(`INSERT INTO libro SET ?`, libro, (err, res) => {
                    if (err) {
                        db.rollback(() => {
                            console.log(err);
                            result(err, 'No se ha podido añadir el libro');
                            return;                   
                        });
                    }
                    
                    let sql = `INSERT INTO libro_autor (isbn, id_autor) VALUES (${libro.isbn}, ${id_autor})`;
                    db.query(sql, (err, res) => {
                        if (err) {
                            db.rollback(() => {
                                console.log(err);
                                result(err, 'No se ha podido añadir el libro');
                                return;                   
                            });
                        }
                        db.commit((err) => {
                            if (err) {
                                db.rollback(() => {
                                    console.log(err);
                                    result(err, 'No se ha podido añadir el libro');
                                    return;                   
                                });
                            }
                            
                            console.log("Libro añadido correctamente: ", {libro});
                            result(null, {libro});                    
                        });
                    
                    });
                });       
            }); 
        }
    
    });
}

//TODO eliminar registro de libro_autor
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