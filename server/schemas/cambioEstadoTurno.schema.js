import mongoose from "mongoose";
import {CambioEstadoTurno} from "../domain/cambioEstadoTurno.js";

const cambioEstadoTurnoSchema = new mongoose.Schema({
    fechaInicioIngreso: { type: Date, required: true },
    estado: { type: String, enum: ["DISPONIBLE", "RESERVADO", "CANCELADO", "REALIZADO"], required: true },
    turno: {
        fechaInicio: { type: Date, required: true },
        fechaFinal: { type: Date, required: true },
        estado: { type: String, required: true }
    },
    paciente: {
        _id: { type: String, required: true },
        nombre: { type: String },
        apellido: { type: String },
    },
    motivo: { type: String }
});

cambioEstadoTurnoSchema.loadClass(CambioEstadoTurno);

export const CambioEstadoTurnoModel = mongoose.model("CambioEstadoTurno", cambioEstadoTurnoSchema);