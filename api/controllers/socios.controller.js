/** Controller para el moodulo de socios */
// import necessary modules
const sociosService = require('../services/socios.service');

function register (req, res, next) {
    //TODO: Data validation

    // After data validation, create record object
    const data = {
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        nacionalidad: req.body.nacionalidad,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        email: req.body.email
    };

    //Call the register service with the record object
    sociosService.register(data, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).send({success: 0, data:'Bad request'});
        };
        return res.status(200).send({
            success: 1,
            data: result
        });
    });

};

function login (req, res, next) {
    const data = {
        email: req.body.email,
        password: req.body.email
    }

    sociosService.login(data, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).send({success: 0, data: 'Bad request'});
        };
        return res.status(200).send({
            success: 1,
            data: result
        });
    });
}

module.exports = {register, login};