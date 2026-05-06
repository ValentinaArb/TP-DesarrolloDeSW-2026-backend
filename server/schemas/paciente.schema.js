import mongoose from "mongoose";

const pacienteSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
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
        obraSocialId: { type: mongoose.Schema.Types.ObjectId, ref: "ObraSocial" },
        nombre: { type: String }
    },
    plan: {
        planId: { type: mongoose.Schema.Types.ObjectId },
        nombre: { type: String }
    },
    sexo: {
        type: String,
        enum: ["MASCULINO", "FEMENINO"],
        required: true
    }
});

export const PacienteModel = mongoose.model("Paciente", pacienteSchema);