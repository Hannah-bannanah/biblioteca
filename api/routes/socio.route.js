/** Route for teh socios endpoint */
// import necessary modules
const express = require('express');
const socioController = require('../controllers/socio.controller');

// initialize route
const route = express.Router();

// routes for socios endpoint
route.get("/", (req, res, next) => {
    res.writeHead(200, {'Content-Type': 'text'});
    res.write("<h2>Hola socio!</h2>");
    res.end();
});

route.post("/register", socioController.register);
//route.post("/login", socioController.login);

module.exports = route;