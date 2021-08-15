const Editorial = require('./editorial.schema');
const Libro = require('./libro.schema');
const Autor = require('./autor.schema');
const badRequest = require('../util/customErrors');


exports.getLibros = (req, res, next) => {
    return Libro.findAll({
        include: [{
            model: Autor,
        }, {
            model: Editorial
        }]
    });

}

exports.getLibro = (req, res, next) => {
    return Libro.findByPk(req.params.isbn, {
        include: [{
            model: Autor,
        }, {
            model: Editorial
        }]
    });
}

exports.createLibro = (req, res, next) => {
    const isbn = req.body.isbn;
    const titulo = req.body.titulo;
    const editorialId = req.body.editorialId;
    const genero = req.body.genero;
    const idioma = req.body.idioma;
    const autorId = req.body.autorId;
    const sinopsis = req.body.sinopsis;
    const coverUrl = req.body.portada !== '' ? req.body.portada : null;
    let newLibro;
    let fetchedAutor;
    let fetchedEditorial;
    return Libro.findByPk(isbn)
        .then(libro => {
            // console.log("looked for libro by pk (1)");
            if (libro) {
                throw new badRequest(400, 'Libro ya existe', '/error', 'Bad Request');
            } else {
                return Editorial.findByPk(editorialId);
            }
        })
        .then(editorial => {
            if (!editorial) {
                throw new badRequest(400, 'Editorial no existe', '/error', 'Bad Request');
            } else {
                fetchedEditorial = editorial;
                // console.log("editorial:", fetchedEditorial);
                return Autor.findByPk(autorId);
            }

        })
        .then(autor => {
            if (!autor) {
                throw new badRequest(400, 'Autor no existe', '/error', 'Bad Request');
            } else {
                fetchedAutor = autor;
                return fetchedEditorial.createLibro({
                    isbn: isbn,
                    titulo: titulo,
                    genero: genero,
                    ejemplares: 1,
                    idioma: idioma,
                    sinopsis: sinopsis,
                    coverUrl: coverUrl,
                });
            }
        })
        .then(result => {
            return Libro.findByPk(result.dataValues.isbn);
        })
        .then(libro => {
            newLibro = libro;
            return newLibro.addAutor(fetchedAutor);
        })
        .then(() => {
            return newLibro;
        });
}

exports.editLibro = (req, res, next) => {
    const isbn = req.body.isbn;
    const titulo = req.body.titulo;
    const editorialId = req.body.editorialId;
    const genero = req.body.genero;
    const idioma = req.body.idioma;
    const autor = req.body.autorId;
    const ejemplares = req.body.ejemplares;
    const sinopsis = req.body.sinopsis;
    const coverUrl = req.body.portada !== '' ? req.body.portada : null;
    let fetchedBook;
    let oldBook;
    let oldAutor;
    let oldEditorial;

    return Libro.findByPk(isbn)
        .then(libro => {
            if (!libro) {
                throw new badRequest(400, 'Libro no existe', '/error', 'Bad Request');
            } else {
                oldBook = {
                    ...libro
                };
                fetchedBook = libro;
                console.log('saved old book: ', oldBook.dataValues);
                return libro.getAutors();
            }
        })
        .then(autores => {
            oldAutor = autores[0].id;
            return fetchedBook.getEditorial();
        })
        .then(editorial => {
            oldEditorial = editorial.id;
            return fetchedBook.destroy();
        })
        .then(libro => {
            console.log('destroyed book: ', libro);
            return this.createLibro(req, res, next);
        })
        .catch(err => {
            if (err.name === 'badRequest' && err.errorMessage === "Libro no existe") {
                console.log('bad request error');
                throw err;
            } else {
                let dummyReq = {
                    body: {
                        ...oldBook.dataValues,
                        autorId: oldAutor,
                        editorialId: oldEditorial
                    }
                }
                return this.createLibro(dummyReq, res, next)
            }
        })
}

exports.deleteLibro = (req, res, next) => {
    const isbn = req.body.isbn;
    let fetchedLibro;
    return Libro.findByPk(isbn)
        .then(libro => {
            return libro.destroy();
        })
}