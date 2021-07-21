const Socio = require('../models/socio.model');

function register (req, res) {
    if (!req.body) {
        res.status(400).send({message: 'Socio vacío por sus adentros'});
    }

    console.log(req.body);

    const socio = new Socio({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        nacionalidad: req.body.nacionalidad,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        email: req.body.email
    });


    Socio.register(socio, (err, data) => {
        if(err) res.status(500).send({message: err.message || "Yo qué sé qué ha pasado!"});
        else res.send(data);
    });

}

module.exports = {register}