// import necessary modules
const Libro = require('../models/libro.model');

// mostrar todos
function listBooks (req, res) {
    Libro.listBooks((err, data) => {
        if (err) res.status(500).send({message: err.message || 'No se ha podido obtener la lista de libros'});
        else res.send(data);
    }) 
}

// mostrar un libro
function getBook (req, res) {
    Libro.getBook(req.params.isbn, (err, data) => {
        if (err) {
            if (err.kind === "not found") res.status(404).send({message: `No hay libros con isbn = ${req.params.isbn}`});
            else res.status(500).send({message: err.message || 'No se ha podido obtener el libro'});
        } else {res.send(data);}
    })
}

// create libro
function create (req, res) {
    if (!req.body) {
        res.status(400).send({message: 'Libro vacío'});
    }

    // create libro object
    const libro = new Libro({
        isbn: req.body.isbn,
        titulo: req.body.titulo,
        id_editorial: req.body.id_editorial,
        genero: req.body.genero,
        ejemplares: 1,
        idioma: req.body.idioma,
        numero_paginas: req.body.numero_paginas,
        año_edicion: req.body.año_edicion
    });

    const id_autor = req.body.id_autor;
    //call the create method in Libro
    Libro.create(libro, id_autor, (err, data) => {
        if (err) res.status(500).send({message:err.message || "No se ha añadido el libro"});
        else res.send(data);
    });
}

// eliminar libro
function deleteBook (req, res) {
    Libro.delete(req.params.isbn, (err, data) => {
        if (err) {
            if (err.kind === "not found") res.status(404).send({message: `El libro con isbn ${req.params.isbn} no existe`});
            else res.status(500).send({message: `No se ha podido eliminar el libro de isbn ${req.params.isbn}`});
        } else {
            res.send({message: "Libro eliminado con exito"});
        }
    })
}

module.exports = {listBooks, getBook, create, deleteBook};