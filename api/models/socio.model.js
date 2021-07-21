const db = require('../config/db.config');

//Crear modelo Socio
const Socio = function (socio) {
    this.nombre = socio.nombre;
    this.apellidos = socio.apellidos;
    this.nacionalidad = socio.nacionalidad;
    this.direccion = socio.direccion;
    this.telefono = socio.telefono;
    this.email = socio.email;
}

// método register 
Socio.register = (newSocio, result) => {
    let sql = "INSERT INTO socio SET ?";
    db.query(sql, newSocio, (err, res) => {
        if(err) {
            console.log(err);
            result(err, null);
            return;
        }

        console.log("Socio creado: ", {socio_id: res.insertId, ...newSocio});
        result(null, {socio_id:res.insertId, ...newSocio});
    })

}

module.exports = Socio;