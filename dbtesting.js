const Autor = require('./models/autor.schema');
const Editorial = require('./models/editorial.schema');
const Libro = require('./models/libro.schema');
const Sequelize = require('sequelize');
const badRequest = require('./util/customErrors');

// establish DB relations
Libro.belongsTo(Editorial, {
    constraints: true,
    onDelete: 'CASCADE'
});
Editorial.hasMany(Libro);
Libro.belongsToMany(Autor, {
    through: 'libroAutor'
});
Autor.belongsToMany(Libro, {
    through: 'libroAutor'
});

const isbn = 'isbn2';
const titulo = 'titulo22';
const editorialId = 1;
const genero = 'genero22';
const idioma = 'idioma22';
const autor = 1;
const ejemplares = 13;
const sinopsis = 'sinopsis22';
const coverUrl = null;
let fetchedLibro;
// let newLibro;

return Libro.findByPk(isbn)
    .then(libro => {
        if (!libro) {
            throw new badRequest(400, 'Libro no existe', '/error', 'Bad Request');
        } else {
            fetchedLibro = libro;
            return libro.getEditorial();
        }
    })
    .then(editorial => {
        if (editorial.id === editorialId) {
            return Libro.findByPk(isbn);
        } else {
            return fetchedLibro.destroy();
        }
    })
    .then(result => {
        console.log(result);
    })

    // .then(editorial => {
    //     console.log("got Editorial");
    //     if (editorial.id === editorialId) {
    //         fetchedLibro.titulo = titulo;
    //         fetchedLibro.genero = genero;
    //         fetchedLibro.idioma = idioma;
    //         fetchedLibro.ejemplares = ejemplares;
    //         fetchedLibro.sinopsis = sinopsis;
    //         fetchedLibro.coverUrl = coverUrl;
    //     } else {
    //         console.log('here!');
    //         fetchedLibro.isbn = 'tbdeleted';
    //     }
    //     console.log("fetchedLibro before saving: ", fetchedLibro.dataValues);
    //     return fetchedLibro.save();
    // })
    // .then(() => {
    //     console.log("fetchedLibro after saving: ", fetchedLibro.dataValues);
    //     return Editorial.findByPk(editorialId);
    // })
    // .then(editorial => {
    //     return editorial.createLibro({
    //         isbn: isbn,
    //         titulo: titulo,
    //         genero: genero,
    //         ejemplares: 1,
    //         idioma: idioma,
    //         sinopsis: sinopsis,
    //         coverUrl: coverUrl,
    //     });
    // })
    // .then(libro => {
    //     fetchedLibro = libro;
    //     return Libro.findByPk('tbdeleted');
    // })
    // .then(deletedLibro => {
    //     return deletedLibro.destroy();
    // })
    // .then(() => {
    //     return fetchedLibro;
    // })
    // .then((result) => {
    //     console.log(result);
    // })
    .catch(err => console.log(err));