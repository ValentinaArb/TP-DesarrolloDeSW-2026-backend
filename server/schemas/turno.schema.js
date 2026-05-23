import mongoose from "mongoose";
import {Turno} from "../domain/turno.js";

const turnoSchema = new mongoose.Schema({
    medico: {
        _id: {type: String, required: true},
        nombre: { type: String, required: true },
        apellido: { type: String, required: true },
    },
    fechaInicio: { type: Date, required: true },
    fechaFinal: { type: Date, required: true },
    paciente: {
        _id: {type: String},
        nombre: { type: String },
        apellido: { type: String },
    },
    servicio: {
        _id: { type: String, required: true },
        nombre: { type: String, required: true },
        duracionTurno: { type: Number, required: true },
        costo: { type: Number, required: true }
    },
    sede: {
        nombre: { type: String, required: true },
        direccion: { type: String, required: true }
    },
    estado: { type: String, enum: ["DISPONIBLE", "RESERVADO", "CANCELADO", "REALIZADO"], required: true },
    historialDeEstados: [
        {
            fechaInicioIngreso: { type: Date, required: true },
            estado: { type: String, enum: ["DISPONIBLE", "RESERVADO", "CANCELADO", "REALIZADO"], required: true },
            motivo: { type: String },
        }
    ],
    costo: { type: Number }
});

turnoSchema.loadClass(Turno);

export const TurnoModel = mongoose.model("Turno", turnoSchema);