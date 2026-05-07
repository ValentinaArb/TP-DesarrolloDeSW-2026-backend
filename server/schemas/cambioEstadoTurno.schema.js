import mongoose from "mongoose";
import { Paciente } from "../domain/paciente";

const cambioEstadoTurnoSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    fechaInicioIngreso: { type: Date, required: true },
    estado: { type: String, enum: ["DISPONIBLE", "RESERVADO", "CANCELADO", "CONFIRMADO", "REALIZADO"], required: true },
    turnoId: { type: mongoose.Schema.Types.ObjectId, ref: "Turno", required: true },
    Paciente: {
        pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: "Paciente" },
        nombre: { type: String },
        apellido: { type: String },
    },
    motivo: { type: String }
});

export const CambioEstadoTurnoModel = mongoose.model("CambioEstadoTurno", cambioEstadoTurnoSchema);