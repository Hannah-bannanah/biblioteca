const Sequelize = require('sequelize');
const Autor = require('../models/autor.model');
const Editorial = require('../models/editorial.model');
const LibroAutor = require('../models/libro-autor.model');
const Libro = require('../models/libro.model');
const sequelize = require('../util/db.config');

// establish DB relations
Libro.belongsTo(Editorial, {
    constraints: true,
    onDelete: 'CASCADE'
});
Editorial.hasMany(Libro);
Libro.belongsToMany(Autor, {
    through: LibroAutor
});
Autor.belongsToMany(Libro, {
    through: LibroAutor
});

const fillDB = () => {
    return Editorial.bulkCreate([{
                nombre: 'OReilly Media'
            },
            {
                nombre: 'Editorial Universitaria Ramon Areces'
            },
            {
                nombre: 'Booket'
            },
            {
                nombre: 'Vintage Publishing'
            },
            {
                nombre: 'DeBolsillo'
            },
            {
                nombre: 'pruebas'
            }
        ])
        .then(() => {
            return Autor.bulkCreate([{
                    nombre: 'Shyam',
                    apellidos: "Seshadri"
                },
                {
                    nombre: 'Eric A.',
                    apellidos: 'Meyer'
                },
                {
                    nombre: 'Jose Maria',
                    apellidos: 'Casas Sanchez'
                },
                {
                    nombre: 'Gianni',
                    apellidos: 'Rodari'
                },
                {
                    nombre: 'Joseph',
                    apellidos: 'Heller'
                },
                {
                    nombre: 'Michael',
                    apellidos: 'Chabon'
                },
            ]);
        })
        .then(() => {
            return Editorial.findByPk(1);
        })
        .then(editorial => {
            return editorial.createLibro({
                isbn: "9781491999837",
                titulo: "Angular: Up and Running",
                genero: "Informática",
                ejemplares: 1,
                idioma: "Inglés",
                sinopsis: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam saepe temporibus a, consectetur iure eum! Illum architecto inventore sint labore?"
            });
        })
        .then(() => {
            return Editorial.findByPk(1);
        })
        .then(editorial => {
            return editorial.createLibro({
                isbn: "9781449393199",
                titulo: "CSS: The Definitive Guide",
                genero: "Informática",
                ejemplares: 1,
                idioma: "Inglés",
                sinopsis: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam saepe temporibus a, consectetur iure eum! Illum architecto inventore sint labore?"
            });
        })
        .then(() => {
            return Editorial.findByPk(2);
        })
        .then(editorial => {
            return editorial.createLibro({
                isbn: "9788480046589",
                titulo: "Fórmulas y tablas estadísticas",
                genero: "Estadística",
                ejemplares: 1,
                idioma: "Castellano",
                sinopsis: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam saepe temporibus a, consectetur iure eum! Illum architecto inventore sint labore?"
            });
        })
        .then(() => {
            return Editorial.findByPk(3);
        })
        .then(editorial => {
            return editorial.createLibro({
                isbn: "9788484531643",
                titulo: "Gramática de la fantasia: Introducción al arte de contar historias",
                genero: "Psicología",
                ejemplares: 1,
                idioma: "Castellano",
                sinopsis: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam saepe temporibus a, consectetur iure eum! Illum architecto inventore sint labore?"
            });
        })
        .then(() => {
            return Editorial.findByPk(4);
        })
        .then(editorial => {
            return editorial.createLibro({
                isbn: "9780099470465",
                titulo: "Catch-22",
                genero: "Comedia",
                ejemplares: 1,
                idioma: "Inglés",
                sinopsis: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam saepe temporibus a, consectetur iure eum! Illum architecto inventore sint labore?"
            });
        })
        .then(() => {
            return Editorial.findByPk(5);
        })
        .then(editorial => {
            return editorial.createLibro({
                isbn: "9788497932950",
                titulo: "Las asombrosas aventuras de Kavalier y Clay",
                genero: "Ficción",
                ejemplares: 1,
                idioma: "Castellano",
                sinopsis: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam saepe temporibus a, consectetur iure eum! Illum architecto inventore sint labore?"
            });
        })
        .catch(err => console.log(err));
}

module.exports = fillDB;