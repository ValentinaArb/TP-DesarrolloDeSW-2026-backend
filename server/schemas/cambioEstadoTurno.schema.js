import mongoose from "mongoose";

const cambioEstadoTurnoSchema = new mongoose.Schema({
    fechaInicioIngreso: { type: Date, required: true },
    estado: { type: String, enum: ["DISPONIBLE", "RESERVADO", "CANCELADO", "CONFIRMADO", "REALIZADO"], required: true },
    turno: {
        fechaInicio: { type: Date, required: true },
        fechaFinal: { type: Date, required: true },
        estado: { type: String, required: true }
    },
    Paciente: {
        id: { type: String, required: true },
        nombre: { type: String },
        apellido: { type: String },
    },
    motivo: { type: String }
});

export const CambioEstadoTurnoModel = mongoose.model("CambioEstadoTurno", cambioEstadoTurnoSchema);