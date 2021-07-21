// import necessary modules
const express = require('express');
const libroController = require('../controllers/libro.controller');

// initialize route
const route = express.Router();

// routes for libros endpoint
route.get("/", libroController.getAll);
route.get("/:isbn", libroController.getBook);

route.post("/create", libroController.create);

route.delete("/:isbn", libroController.deleteBook);

module.exports = route;