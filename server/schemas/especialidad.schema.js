import mongoose from "mongoose";

const especialidadSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    duracion: { type: Number, required: true },
    costo: { type: Number, required: true }
});

export const EspecialidadModel = mongoose.model("Especialidad", especialidadSchema);