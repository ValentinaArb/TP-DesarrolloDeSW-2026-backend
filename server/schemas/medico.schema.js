import mongoose from "mongoose";
import { Medico } from "../domain/medico.js";
import { DisponibilidadModel } from "./disponibilidad.schema.js"; 

const medicoSchema = new mongoose.Schema({
  usuario: {
    nombre: String,
    mail: String,
    _id: { type: String, required: true }
  },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  matricula: { 
    type: String, 
    required: true, 
    unique: true,
    validate: {
      validator: function(v) {
        return /^\d+$/.test(v);
      },
      message: props => `La matrícula [${props.value}] es inválida. Solo se permiten números.`
    }
  },
  servicios: [{ nombre: { type: String, required: true } }],
  sedes: [{ nombre: { type: String, required: true } }],
  disponibilidades: [DisponibilidadModel.schema],
  disponibilidadesAnteriores: [DisponibilidadModel.schema]
});

medicoSchema.loadClass(Medico);

export const MedicoModel = mongoose.model("Medico", medicoSchema, "medicos");