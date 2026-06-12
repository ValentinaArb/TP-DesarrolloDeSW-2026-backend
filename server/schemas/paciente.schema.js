import mongoose from "mongoose";
import {Paciente} from "../domain/paciente.js";

const pacienteSchema = new mongoose.Schema({
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
    dni: {
        type: String,
        required: true,
        unique: true
    },
    fechaNacimiento: {
        type: Date,
        required: true
    },
    obraSocial: {
        nombre: { type: String }
    },
    plan: {
        nombre: { type: String }
    },
    sexo: {
        type: String,
        enum: ["M", "F"],
        required: true
    }
});

pacienteSchema.loadClass(Paciente);

export const PacienteModel = mongoose.model("Paciente", pacienteSchema, "pacientes");
