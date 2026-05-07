import mongoose from "mongoose";
import { id } from "zod/locales";

const medicoSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  matricula: {
    type: String,
    required: true,
    unique: true
  },
  servicios : [{
    servicioId: { type: mongoose.Schema.Types.ObjectId, ref: "Servicio", required: true },
    nombre: { type: String, required: true }
  }],
  sedes: [{
    sedeId: { type: mongoose.Schema.Types.ObjectId, ref: "Sede", required: true },
    nombre: { type: String, required: true }
  }],
  disponibilidades: [{
    diaSemana: { type: String, enum: ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO", "DOMINGO"], required: true },
    fechaInicio: { type: Date, required: true },
    fechaFinal: { type: Date, required: true }
  }]
});

export const MedicoModel = mongoose.model("Medico", medicoSchema);