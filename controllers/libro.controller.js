const Editorial = require('../models/editorial.schema');
const Libro = require('../models/libro.service');
const Autor = require('../models/autor.schema');
const badRequest = require('../util/customErrors');

exports.getCatalogo = (req, res, next) => {
    return Libro.getLibros(req, res, next)
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
    return Libro.getLibros(req, res, next)
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
    return Libro.getLibro(req, res, next)
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
    return Libro.createLibro(req, res, next)
        .then(libro => {
            res.redirect(`/libros/${libro.isbn}`);
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
    return Libro.getLibro(req, res, next)
        .then(libro => {
            if (libro) return libro;
            else return false;
        })
        .then(libro => {
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
    return Libro.editLibro(req, res, next)
        .then(() => {
            res.redirect(`/libros/${req.body.isbn}`);

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
    return Libro.deleteLibro(req, res, next)
        .then(() => {
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