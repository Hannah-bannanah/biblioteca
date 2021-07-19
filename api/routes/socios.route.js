/** Route for teh socios endpoint */
// import necessary modules
const express = require('express');
const sociosController = require('../controllers/socios.controller');

// initialize route
const route = express.Router();

// routes for socios endpoint
route.get("/", (req, res) => {
    res.writeHead(200, {'Content-Type': 'text'});
    res.write("<h2>Hola socio!</h2>");
    res.end();
});

route.post("/register", sociosController.register);
//route.post("/login", sociosController.login);

module.exports = route;