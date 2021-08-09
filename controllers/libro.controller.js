const Libro = require('../models/libro.model');

exports.getAll = (req, res, next) => {
    Libro.getAll()
        .then(([libros, metadata]) => {
            res.render('catalogo/listaLibros', {
                path: '/catalogo/listaLibros',
                pageTitle: 'Lista de libros',
                books: libros
            });
        })
        .catch(err => console.log(err));
}

exports.addBook = (req, res, next) => {

    const libro = new Libro(
        req.body.isbn,
        req.body.titulo,
        req.body.id_editorial,
        req.body.genero,
        req.body.idioma,
        req.body.numPaginas,
        req.body.ejemplares
    )

    Libro.addBook(libro, req.body.id_autor).then(result => {
        console.log(result.action);
        res.redirect('/libros/registerBook');
    });
}

exports.updateBook = (req, res, next) => {

    const libro = new Libro(
        req.body.isbn,
        req.body.titulo,
        req.body.id_editorial,
        req.body.genero,
        req.body.idioma,
        req.body.numPaginas,
        req.body.ejemplares
    )

    libro.updateBook(libro).then(result => {
        console.log(result.action);
        res.redirect('/libros/editBook');
    });
}