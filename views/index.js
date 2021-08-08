/** FE route handler */
// import necessary modules
const express = require('express');
const path = require('path');

// initialize web router
const webRouter = express.Router();
// configure web router
webRouter.use(express.urlencoded({extended: true}));
webRouter.use(express.json());

// TODO: mejorar estructura de carpetas de la parte web
webRouter.use(express.static('./')); //location of static files

//route
webRouter.get("/catalogo", (req, res) => {
    res.sendFile(path.join(__dirname, '/catalogo/catalogo.html'));
});

webRouter.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/home/index.html'));
});

webRouter.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, '/home/index.html'));
});

webRouter.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, '/socios/registerSocio.html'));
});
webRouter.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, '/socios/loginSocio.html'));
});

module.exports = webRouter;