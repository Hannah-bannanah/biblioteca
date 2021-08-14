const Editorial = require('../models/editorial.model');
const Libro = require('../models/libro.model');
const Autor = require('../models/autor.model');
const badRequest = require('../util/customErrors');

exports.getCatalogo = (req, res, next) => {
    return Libro.findAll({
            include: [{
                model: Autor,
            }, {
                model: Editorial
            }]
        })
        .then(libros => {
            res.render("libros/catalogo", {
                pageTitle: 'Catálogo',
                path: '/libros/catalogo',
                libros: libros
            });
        })
        .catch(err => console.log(err));

}

exports.getLibros = (req, res, next) => {
    return Libro.findAll({
            include: [{
                model: Autor,
            }, {
                model: Editorial
            }]
        })
        .then(libros => {
            res.render('libros/listaLibros', {
                pageTitle: 'Lista de libros',
                path: '/libros/listaLibros',
                libros: libros
            })
        })
        .catch(err => console.log(err));
}

exports.getLibro = (req, res, next) => {
    return Libro.findByPk(req.params.isbn, {
            include: [{
                model: Autor,
            }, {
                model: Editorial
            }]
        })
        .then(libro => {
            if (!libro) {
                throw new badRequest(404, 'libro no existe', '/error', 'Bad Request');
            } else {
                res.render('libros/detallesLibro', {
                    pageTitle: libro.titulo,
                    path: '/libros',
                    libro: libro
                });
            }

        })
        .catch(err => {
            res.render('errors/generalError', {
                pageTitle: err.pageTitle,
                path: err.path,
                errorCode: err.errorCode,
                errorMessage: err.errorMessage
            });
            next(err);
        });
}

exports.getCreateLibro = (req, res, next) => {
    console.log("getCreateLibro req:", req.body);
    res.render("libros/actualizacionEjemplar", {
        pageTitle: 'Registrar Libro',
        path: '/libros/registerBook',
        editing: false,
        libro: false
    });
}

exports.postCreateLibro = (req, res, next) => {
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
                let err = {
                    pageTitle: 'Bad Request',
                    path: '/error',
                    errorCode: 400,
                    errorMessage: 'libro ya existe'
                };
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
            console.log('looked for autor by pk (3)')
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
            console.log('looked for the libro we just created (5)')
            newLibro = libro;
            return newLibro.addAutor(fetchedAutor);
        })
        .then(() => {
            console.log("added record to libroAutor? (6)")
            res.redirect(`/libros/${newLibro.isbn}`);
        })
        .catch(err => {
            res.render('errors/generalError', {
                pageTitle: err.pageTitle,
                path: err.path,
                errorCode: err.errorCode,
                errorMessage: err.errorMessage
            });
            next(err);
        });
}


exports.getEditLibro = (req, res, next) => {
    const isbn = req.params.isbn;
    return Libro.findByPk(isbn)
        .then(libro => {
            if (libro) return libro;
            else return false;
        })
        .then(libro => {
            console.log("render editLibro para: ", libro.isbn);
            return res.render("libros/actualizacionEjemplar", {
                pageTitle: 'Editar Libro',
                path: `/libros/editBook/${libro.isbn}`,
                editing: true,
                libro: libro
            });
        })
        .catch(err => console.log(err));
}

exports.postEditLibro = (req, res, next) => {
    console.log("you are editing 0");
    const isbn = req.body.isbn;
    const titulo = req.body.titulo;
    const editorialId = req.body.editorialId;
    const genero = req.body.genero;
    const idioma = req.body.idioma;
    const autor = req.body.autorId;
    const ejemplares = req.body.ejemplares;
    const sinopsis = req.body.sinopsis;
    const coverUrl = req.body.portada !== '' ? req.body.portada : null;

    return Libro.findByPk(isbn)
        .then(libro => {
            if (!libro) {
                throw new badRequest(400, 'Libro no existe', '/error', 'Bad Request');
            } else {
                libro.titulo = titulo;
                libro.genero = genero;
                libro.idioma = idioma;
                libro.ejemplares = ejemplares;
                libro.sinopsis = sinopsis;
                libro.coverUrl = coverUrl;
                libro.save();
                res.redirect(`/libros/${libro.isbn}`);
            };
        })
        .catch(err => {
            res.render('errors/generalError', {
                pageTitle: err.pageTitle,
                path: err.path,
                errorCode: err.errorCode,
                errorMessage: err.errorMessage
            });
            next(err);
        });
}

exports.postDeleteLibro = (req, res, next) => {
    const isbn = req.body.isbn;
    let fetchedLibro;
    return Libro.findByPk(isbn)
        .then(libro => {
            if (!libro) {
                throw new badRequest(400, 'Libro no existe', '/error', 'Bad Request')
            } else {
                fetchedLibro = libro
                return LibroAutor.destroy({
                    where: {
                        libroIsbn: isbn
                    }
                });
                // libro.destroy();
                // res.redirect('/libros/listalibros')
            }
        })
        .then(() => {
            fetchedLibro.destroy();
            res.redirect('/libros/listaLibros');
        })
        .catch(err => {
            res.render('errors/generalError', {
                pageTitle: err.pageTitle,
                path: err.path,
                errorCode: err.errorCode,
                errorMessage: err.errorMessage
            });
            next(err);
        });
}