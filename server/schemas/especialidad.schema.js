import mongoose from "mongoose";

const especialidadSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    nombre: { type: String, required: true },
    duracionTurno: { type: Number, required: true },
    costo: { type: Number, required: true }
});

export const EspecialidadModel = mongoose.model("Especialidad", especialidadSchema);