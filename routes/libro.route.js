const path = require('path');

const express = require('express');
const libroController = require('../controllers/libro.controller');

const router = express.Router();

// router.get("/", (req, res, next) => {
//     res.sendFile(path.join(__dirname, '../views/catalogo/catalogo.html'));
// });

router.get("/", libroController.getCatalogo);
router.get("/catalogo", libroController.getCatalogo);

router.get('/listaLibros', libroController.getLibros);

router.get("/registerBook", libroController.getCreateLibro);

router.post('/registerBook', libroController.postCreateLibro)


router.get("/editBook", libroController.getEditLibro);
router.get("/editBook/:isbn", libroController.getEditLibro);


router.post('/editBook', libroController.postEditLibro);

router.post('/deleteBook', libroController.postDeleteLibro);

router.get('/:isbn', libroController.getLibro);



module.exports = router;