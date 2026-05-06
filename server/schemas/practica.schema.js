import mongoose from "mongoose";

const practicaSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    codigo: { type: String, required: true },
    nombre: { type: String, required: true },
    duracionEnMins: { type: Number, required: true },
    costo: { type: Number, required: true }
});

export const PracticaModel = mongoose.model("Practica", practicaSchema);