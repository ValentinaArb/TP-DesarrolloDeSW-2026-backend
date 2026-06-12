import mongoose from "mongoose";
import {Medico} from "../domain/medico.js";

const medicoSchema = new mongoose.Schema({
  usuario: {
      nombre: String,
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
    horaDesde: { type: String, required: true },
    horaHasta: { type: String, required: true }
  }],
  disponibilidadesAnteriores: [{
    diaSemana: { type: Number, required: true },
    horaDesde: { type: String, required: true },
    horaHasta: { type: String, required: true }
  }]
});

medicoSchema.loadClass(Medico);

export const MedicoModel = mongoose.model("Medico", medicoSchema);