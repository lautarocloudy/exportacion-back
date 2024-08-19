const Ingreso = require("../modelo/Ingreso");

const crear = async (req, res) => {
    try {
        // Recoger todos los datos de POST
        let parametros = req.body;

        // Crear el objeto a guardar
        const nuevoIngreso = new Ingreso(parametros);

        // Guardar articulo en la base de datos
        const ingresoGuardado = await nuevoIngreso.save();

        // Devolver el resultado
        return res.status(200).json({
            status: 'success',
            mensaje: 'Se ha guardado la información',
            ingresoGuardado
        });
    } catch (error) {
        // Manejar otros errores
        return res.status(400).json({
            status: "error",
            mensaje: 'No se ha guardado'
        });
    }
};

const listar = async (req, res) => {
    try {
        const ingresos = await Ingreso.find().exec();

        if (!ingresos || ingresos.length === 0) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se ha encontrado ningún artículo"
            });
        }

        return res.status(200).json({
            status: "success",
            ingresos
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error al listar los ingresos"
        });
    }
};

module.exports = {
    crear,
    listar
};
