const path = require('path');

const express = require('express');
const libroController = require('../controllers/libro.controller');

const router = express.Router();

// router.get("/", (req, res, next) => {
//     res.sendFile(path.join(__dirname, '../views/catalogo/catalogo.html'));
// });

router.get("/", (req, res, next) => {
    res.render("catalogo/catalogo", {
        pageTitle: 'Catalogo',
        path: '/libros/catalogo'
    })
});

router.get('/listaLibros', libroController.getAll);
// router.get('/:isbn', libroController.getByIsbn);

router.get("/registerBook", (req, res, next) => {
    res.render("catalogo/actualizacionEjemplar", {
        pageTitle: 'Registrar Libro',
        path: '/libros/registerBook'
    });
});

router.post('/registerBook', libroController.addBook)


router.get("/editBook", (req, res, next) => {
    res.render("catalogo/actualizacionEjemplar", {
        pageTitle: 'Editar Libro',
        path: '/libros/editeBook'
    });
});

router.post('/editBook', libroController.updateBook)


module.exports = router;