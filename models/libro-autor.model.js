const Sequelize = require('sequelize');
const sequelize = require('../util/db.config');

const LibroAutor = sequelize.define('libroAutor', {});

module.exports = LibroAutor;