const Autor = require('./models/autor.model');
const Editorial = require('./models/editorial.model');
const Libro = require('./models/libro.model');
const Sequelize = require('sequelize');

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

// sequelize.sync()
//     .then(() => {
//         return Editorial.bulkCreate([{
//                 nombre: 'OReilly Media'
//             },
//             {
//                 nombre: 'Editorial Universitaria Ramon Areces'
//             },
//             {
//                 nombre: 'Booket'
//             },
//             {
//                 nombre: 'Vintage Publishing'
//             },
//             {
//                 nombre: 'DeBolsillo'
//             },

//         ]);
//     })
//     .then(() => {
//         return Autor.bulkCreate([{
//                 nombre: 'Shyam',
//                 apellidos: "Seshadri"
//             },
//             {
//                 nombre: 'Eric A.',
//                 apellidos: 'Meyer'
//             },
//             {
//                 nombre: 'Jose Maria',
//                 apellidos: 'Casas Sanchez'
//             },
//             {
//                 nombre: 'Gianni',
//                 apellidos: 'Rodari'
//             },
//             {
//                 nombre: 'Joseph',
//                 apellidos: 'Heller'
//             },
//             {
//                 nombre: 'Michael',
//                 apellidos: 'Chabon'
//             },
//         ]);
//     })
//     .catch(err => console.log(err))

// Editorial.create({
//     nombre: 'prueba'
// }).then(result => console.log(result.dataValues.id));

// Editorial.findByPk(6)
//     .then(editorial => {
//         return editorial.createLibro({
//             isbn: 'prueba',
//             titulo: 'prueba',
//             genero: 'prueba',
//             ejemplares: 1,
//             idioma: 'prueba',
//         });
//     })
//     .then(result => console.log(result))
//     .catch(err => console.log(err));

// Libro.findByPk('isbn2')
//     .then(libro => {
//         return libro.getAutors();
//         // return fetchedLibro.getAutor();
//     })
//     .then((editorial) => {
//         console.log('libro: ', fetchedLibro);
//         console.log('editorial: ', editorial);
//     });

// Libro.findByPk('isbn1')
//     .then(libro => {
//         return libro.getEditorial();
//     })
//     .then(autors => {
//         console.log(autors);
//     });

// Libro.findAll({
//         include: [{
//                 model: Autor,
//                 // attributes: ['nombre', 'apellidos']
//             },
//             {
//                 model: Editorial
//             }
//         ]
//     })
//     .then(result => {
//         // let autor = result[6].autors;
//         // console.log(autor[0].nombre + ' ' + autor[0].apellidos);
//         console.log(result[6]);
//     });

// Libro.findByPk('isbn1', {
//         attributes: {
//             include: [
//                 [Sequelize.literal('editorial.nombre'), 'nombre_editorial'],
//                 // [Sequelize.literal('autor.nombre'), 'nombre_autor'],
//                 // [Sequelize.literal('autor.apellidos'), 'apellidos_autor']
//                 autors.forEach((autor => {
//                     return [autor.nombre, autor.apellidos]
//                 }))
//             ],
//         },
//         include: [{
//             model: Editorial,
//             as: 'editorial',
//             attributes: []
//         }, {
//             model: Autor,
//             as: 'autors'
//         }]
//     })
//     .then((libro) => {
//         // There will be a user.dataValues.profile_image_file value populated
//         // but not a user.profile_image_file unless you set it in afterFind()
//         console.log(libro.dataValues);
//     });

return Libro.findByPk('isbn12', {
        include: [{
                model: Autor
            },
            {
                model: Editorial
            }
        ]
    })
    .then(libro => {
        if (!libro) console.log('ein??');
        else console.log(libro);
    });