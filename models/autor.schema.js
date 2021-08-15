const Sequelize = require('sequelize');
const sequelize = require('../util/db.config');

const Autor = sequelize.define('autor', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },

    apellidos: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Autor;