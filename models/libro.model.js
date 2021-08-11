const Sequelize = require('sequelize');
const sequelize = require('../util/db.config');

const Libro = sequelize.define('libro', {
    isbn: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    genero: Sequelize.STRING,
    idioma: Sequelize.STRING,
    ejemplares: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 1
    }
});

module.exports = Libro;