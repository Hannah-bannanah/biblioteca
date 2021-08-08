// import necessary modules
const express = require('express');
const libroController = require('../controllers/libro.controller');

// initialize route
const route = express.Router();

// routes for libros endpoint
route.get("/", libroController.listBooks);

route.post("/create", libroController.create);

route.get("/:isbn", libroController.getBook);
route.post("/:isbn", libroController.deleteBook);




module.exports = route;