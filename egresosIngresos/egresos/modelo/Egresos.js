const { Schema, model } = require('mongoose');

const EgresoSchema = Schema({
  name: { type: String, required: true },
  egresos: { type: Number, required: true },
  fecha: { type: Date, required: true }
});

module.exports = model("Egreso", EgresoSchema, "Egresos");
