const { Schema, model } = require('mongoose');

const IngresoSchema = Schema({
  name: { type: String, required: true },
  ingresos: { type: Number, required: true },
  fecha: { type: Date, required: true }
});

module.exports = model("Ingreso", IngresoSchema, "Ingresos");
