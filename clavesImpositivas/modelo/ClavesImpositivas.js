const { Schema, model} = require("mongoose");

const ClavesFiscalesSchema = new Schema({
    nombreEmpresa: { type: String, required: [true, 'Error falta el campo username'], unique: true},
    claveFiscalAfip: { type: String },
    claveFiscalAgip: { type: String },
    claveFiscalArba: { type: String },
    cuitUsuario: { type: String },
    cuitEmpresa: { type: String },
    persona1: { type: String },
    persona2: { type: String },
})

module.exports = model("ClaveFiscal", ClavesFiscalesSchema, "clavesFiscales");