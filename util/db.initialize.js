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
        .catch(err => console.log(err));
}

module.exports = fillDB;