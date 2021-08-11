const Sequelize = require('sequelize');
const sequelize = require('../util/db.config');

const Editorial = sequelize.define('editorial', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Editorial;