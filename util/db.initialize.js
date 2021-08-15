// const Sequelize = require('sequelize');
const Autor = require('../models/autor.schema');
const Editorial = require('../models/editorial.schema');
const Libro = require('../models/libro.schema');
// const sequelize = require('../util/db.config');

// establish DB relations
Libro.belongsTo(Editorial, {
    constraints: true,
    onDelete: 'CASCADE'
});
Editorial.hasMany(Libro);
Libro.belongsToMany(Autor, {
    through: 'libroAutors'
});
Autor.belongsToMany(Libro, {
    through: 'libroAutors'
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
                sinopsis: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam saepe temporibus a, consectetur iure eum! Illum architecto inventore sint labore?",
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
                sinopsis: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam saepe temporibus a, consectetur iure eum! Illum architecto inventore sint labore?",
                coverUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2zv9n9-JWWHJ8uLwDx9Ye3gTplrIHzzvZERuwQFEm0xJ0dkev2pg2qfWBHWE&usqp=CAc"
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
                sinopsis: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam saepe temporibus a, consectetur iure eum! Illum architecto inventore sint labore?",
                coverUrl: ""
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
                sinopsis: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam saepe temporibus a, consectetur iure eum! Illum architecto inventore sint labore?",
                coverUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC2MQy-UurJhSjPPu-xZkvPwEYJVp4kSHfeI9cQXrp0PV6FPv-rXKbIT1jmFB9e0bD23UaA2c&usqp=CAc"
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
                sinopsis: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam saepe temporibus a, consectetur iure eum! Illum architecto inventore sint labore?",
                coverUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROhqd1Ln5Ldkr3-WU2fvjzwF14NLURNVqayQ&usqp=CAU"
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
                sinopsis: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam saepe temporibus a, consectetur iure eum! Illum architecto inventore sint labore?",
                coverUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuWa8c3-BWzc_OxJsINQiTV6MeDy7RAbNWlwaiva0xqaScXfH43phsjr1W5jb5F0tFg6dVMI0&usqp=CAc"
            });
        })
        .catch(err => console.log(err));
}

module.exports = fillDB;