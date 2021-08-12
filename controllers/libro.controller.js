const Editorial = require('../models/editorial.model');
const Libro = require('../models/libro.model');

exports.getCatalogo = (req, res, next) => {
    return Libro.findAll()
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
    return Libro.findAll()
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
    return Libro.findAll({
            where: {
                isbn: req.params.isbn
            }
        })
        .then(libros => {
            const libro = libros[0];
            res.render('libros/detallesLibro', {
                pageTitle: libro.titulo,
                path: '/libros',
                libro: libro
            })
        })
        .catch(err => console.log(err));
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
    const autor = req.body.autorId;
    return Libro.findByPk(isbn)
        .then(libro => {
            if (libro) {
                return res.render('errors/generalError', {
                    pageTitle: 'Bad Request',
                    path: '/error',
                    errorCode: 400,
                    errorMessage: 'libro ya existe'
                });
            } else {
                return Editorial.findByPk(editorialId);
            }
        })
        .then(editorial => {
            // console.log(editorial);
            if (!editorial) {
                return res.render('errors/generalError', {
                    pageTitle: 'Bad Request',
                    path: '/error',
                    errorCode: 400,
                    errorMessage: 'editorial no existe'
                });
            }
            return editorial.createLibro({
                isbn: isbn,
                titulo: titulo,
                genero: genero,
                ejemplares: 1,
                idioma: idioma,
            });
        })
        .then(result => {
            // console.log(result);
            return Libro.findByPk(result.dataValues.isbn);
        })
        .then(libro => {
            res.redirect(`/libros/${libro.isbn}`);
        })
        .catch(err => console.log(err));
}

exports.getEditLibro = (req, res, next) => {
    const isbn = req.params.isbn;
    // console.log("isbn: ", isbn)
    return Libro.findByPk(isbn)
        .then(libro => {
            // console.log("getEditLibro para: ", libro);
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
    return Libro.findByPk(isbn)
        .then(libro => {
            console.log("you are editing 1");
            if (!libro) {
                console.log("you are editing 2");
                return res.render('errors/generalError', {
                    pageTitle: 'Bad Request',
                    path: '/error',
                    errorCode: 400,
                    errorMessage: 'libro no existe'
                });
            } else {
                console.log('you are editing 3');
                libro.titulo = titulo;
                libro.genero = genero;
                libro.idioma = idioma;
                libro.ejemplares = ejemplares;
                libro.save();
                res.redirect(`/libros/${libro.isbn}`);
            };
        })
        .catch(err => console.log(err));
}

exports.postDeleteLibro = (req, res, next) => {
    const isbn = req.body.isbn;
    return Libro.findByPk(isbn)
        .then(libro => {
            if (!libro) {
                res.render('errors/generalError', {
                    pageTitle: 'Bad Request',
                    path: '/error',
                    errorCode: 400,
                    errorMessage: 'libro no existe'
                });
            } else {
                libro.destroy();
                res.redirect('/libros/listalibros')
            }
        })
        .catch(err => console.log(err));
}