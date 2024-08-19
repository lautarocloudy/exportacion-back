const Clave = require('../modelo/ClavesImpositivas');

const crear = (req, res) => {

    //recoger todos los datos de post
    let parametros = req.body;

    //crear el objeto a guardar
    const ClaveFiscal = new Clave(parametros);

    //guardar articulo en la base de datos
    ClaveFiscal.save((error, claveGuardado) => {

        if (error || !claveGuardado) {
            return res.status(400).json({
                status: "error",
                mensaje: 'no se ha guardado'
            });
        }

        //devolver el resultado
        return res.status(200).json({
            status: 'success',
            mensaje: 'se ha guardado la informacion',
            claveGuardado
        });
    })

}

const listar = (req, res) => {

    Clave.find()
        // .sort({fecha: -1})
        .exec((error, clave) => {
            if (error || !clave || clave.length <= 0) {
                return res.status(404).json({
                    status: "error",
                    mensaje: "no se ha encontrado ningun articulo"
                })
            }

            res.status(200).json({
                status: "success",
                clave
            })
        })
}

const editar = (req, res) => {

    let id = req.params.id;

    let parametros = req.body;



    Clave.findOneAndUpdate({ _id: id }, parametros, { new: true }, (error, claveActualizado) => {

        if (error || !claveActualizado) {
            return res.status(500).json({
                status: "error",
                mensaje: "error al actualizar el articulo"
            });
        }

        return res.status(200).json({
            status: "success",
            empresa: claveActualizado
        })
    })
}

const uno = (req, res) => {

    //recoger el id
    let id = req.params.id;

    //buscar articulos
    Clave.findById(id, (error, clave) => {

        if (error || !clave) {
            return res.status(404).json({
                status: "error",
                mensaje: 'no se ha podido encontrar datos'
            });
        }

        return res.status(200).json({
            status: "success",
            clave
        })

    })

}

const buscador = (req, res) => {

    let busqueda = req.params.busqueda;

    Clave.find({
        "$or": [
            { "nombreEmpresa": { "$regex": busqueda, "$options": "i" } },


        ]
    })
        // .sort({fecha: -1})
        .exec((error, claves) => {
            if (error || !claves || claves.length <= 0) {
                return res.status(404).json({
                    status: "error",
                    mensaje: "no se ha encontrado ningun articulo"
                })
            }

            res.status(200).json({
                status: "success",
                claves
            })
        })

}

const buscadorPersona = (req, res) => {
    let busqueda = req.params.busqueda;

    Clave.find({
        "$or": [
            { "persona1": { "$regex": busqueda, "$options": "i" } },
            { "persona2": { "$regex": busqueda, "$options": "i" } }
        ]
    }, (error, claves) => {
        if (error || !claves || claves.length <= 0) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se encontraron resultados"
            });
        }
        // Verificar si se encontraron resultados en persona1 o persona2
        let resultados = claves.filter(clave => {
            return clave.persona1.includes(busqueda) || clave.persona2.includes(busqueda);
        });

        if (resultados.length <= 0) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se encontraron resultados"
            });
        }

        res.status(200).json({
            status: "success",
            claves: resultados
        });
    });
};


module.exports = {
    crear,
    listar,
    editar,
    uno,
    buscador,
    buscadorPersona

}