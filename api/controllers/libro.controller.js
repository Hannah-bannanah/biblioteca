// import necessary modules
const Libro = require('../models/libro.model');

// mostrar todos
function listBooks(req, res) {
    Libro.listBooks((err, data) => {
        if (err) res.status(500).send({
            message: err.message || 'No se ha podido obtener la lista de libros'
        });
        else res.send(data);
    })
}

// mostrar un libro
function getBook(req, res) {
    let libro = new Libro(req.params.isbn)
    libro.getBook((err, data) => {
        if (err) {
            if (err.kind === "not found") res.status(404).send({
                message: `No hay libros con isbn = ${req.params.isbn}`
            });
            else res.status(500).send({
                message: err.message || 'No se ha podido obtener el libro'
            });
        } else {
            res.send(data);
        }
    })
}

// create libro
function create(req, res) {
    if (!req.body) {
        res.status(400).send({
            message: 'Libro vacío'
        });
    }

    // create libro object
    const libro = new Libro(req.body.isbn,
        req.body.titulo,
        req.body.id_editorial,
        req.body.genero,
        req.body.ejemplares,
        req.body.idioma,
        req.body.numPaginas,
        req.body.anio
    );

    const id_autor = req.body.id_autor;
    // //call the create method in Libro
    // libro.create(id_autor, (err, data) => {
    //     if (err) res.status(500).send({
    //         message: err.message || "No se ha añadido el libro 0"
    //     });
    //     else res.send(data);
    // });

    // call the create method in Libro
    libro.create(id_autor, (err, data) => {
        if (err) {
            res.render('errors/generalError', {
                errorCode: 500,
                errorMessage: err.message
            });
        } else {
            res.redirect('/registerBook');
        };
    });
}

// eliminar libro
function deleteBook(req, res) {
    const libro = new Libro(req.params.isbn)
    libro.delete((err, data) => {
        if (err) {
            if (err.kind === "not found") res.status(404).send({
                message: `El libro con isbn ${req.params.isbn} no existe`
            });
            else res.status(500).send({
                message: `No se ha podido eliminar el libro de isbn ${req.params.isbn}`
            });
        } else {
            res.send({
                message: "Libro eliminado con exito"
            });
        }
    });
}

module.exports = {
    listBooks,
    getBook,
    create,
    deleteBook
};