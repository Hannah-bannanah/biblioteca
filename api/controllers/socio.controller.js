// import necessary modules
const Socio = require('../models/socio.model');

//register Socio
function register (req, res) {
    if (!req.body) {
        res.status(400).send({message: 'Socio vacío por sus adentros'});
    }

    // create socio object
    const socio = new Socio({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        nacionalidad: req.body.nacionalidad,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        email: req.body.email
    });

    // call the register method in Socio
    Socio.register(socio, (err, data) => {
        if(err) res.status(500).send({message: err.message || "Yo qué sé qué ha pasado!"});
        else res.send(data);
    });

}

module.exports = {register};