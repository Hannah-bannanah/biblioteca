/** Route for teh socios endpoint */
// import necessary modules
const express = require('express');
const path = require('path');
const socioController = require('../controllers/socio.controller');

// initialize route
const router = express.Router();

// routes for socios endpoint
router.get("/", (req, res, next) => {
    res.writeHead(200, {
        'Content-Type': 'text'
    });
    res.write("<h2>Hola socio!</h2>");
    res.end();
});

router.get("/registerSocio", (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/socios/registerSocio.html'));
});

router.post("/registerSocio", socioController.register);
//route.post("/login", socioController.login);

module.exports = router;