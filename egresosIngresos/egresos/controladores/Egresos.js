const Egresos = require("../modelo/Egresos")

const crear = (req, res) => {

    //recoger todos los datos de post
    let parametros = req.body;

    //crear el objeto a guardar
    const Egreso = new Egresos(parametros);

    //guardar articulo en la base de datos
    Egreso.save((error, egresoGuardado) => {

        if (error || !egresoGuardado) {
            return res.status(400).json({
                status: "error",
                mensaje: 'no se ha guardado'
            });
        }

        //devolver el resultado
        return res.status(200).json({
            status: 'success',
            mensaje: 'se ha guardado la informacion',
            egresoGuardado
        });
    })

}

const listar = (req, res) => {

    Egresos.find()
        // .sort({fecha: -1})
        .exec((error, egreso) => {
            if (error || !egreso || egreso.length <= 0) {
                return res.status(404).json({
                    status: "error",
                    mensaje: "no se ha encontrado ningun articulo"
                })
            }

            res.status(200).json({
                status: "success",
                egreso
            })
        })
}


module.exports = {
    crear,
    listar

}
