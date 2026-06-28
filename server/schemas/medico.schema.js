import mongoose from "mongoose";
import {Medico} from "../domain/medico.js";

const disponibilidadSchema = new mongoose.Schema({
  diaSemana: { type: Number, required: true },
  horaDesde: { type: String, required: true }, // Asumo que es String por tu .split(':')
  horaHasta: { type: String, required: true }
});

const medicoSchema = new mongoose.Schema({
  usuario: {
      nombre: String,
      mail: String,
      _id: {type: String, required: true}
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
  disponibilidades: [disponibilidadSchema],
  disponibilidadesAnteriores: [{
    diaSemana: { type: Number, required: true },
    horaDesde: { type: String, required: true },
    horaHasta: { type: String, required: true }
  }]
});

medicoSchema.loadClass(Medico);

export const MedicoModel = mongoose.model("Medico", medicoSchema, "medicos");