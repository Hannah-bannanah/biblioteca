/** DB connection details */
// import necessary modules
const Sequelize = require('sequelize');

const nombreBBDD = '' // insertar el nombre de la bbdd local
const usuario = '' // insertar vuestro nombre de usuario local
const password = '' // insertar la contraseña para el usuario de vuestra bbdd local

//create pool
const sequelize = new Sequelize(nombreBBDD, usuario, password, {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
