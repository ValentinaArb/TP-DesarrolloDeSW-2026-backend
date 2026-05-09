import mongoose from "mongoose";

const medicoSchema = new mongoose.Schema({
  usuario: {
    mail: String
  },
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  matricula: {
    type: String,
    required: true,
    unique: true
  },
  servicios : [{
    nombre: { type: String, required: true }
  }],
  sedes: [{
    nombre: { type: String, required: true }
  }],
  disponibilidades: [{
    diaSemana: { type: Number, required: true },
    horaDesde: { type: Date, required: true },
    horaHasta: { type: Date, required: true }
  }]
});

export const MedicoModel = mongoose.model("Medico", medicoSchema);