import mongoose from "mongoose";

const practicaSchema = new mongoose.Schema({
    codigo: { type: String, required: true },
    nombre: { type: String, required: true },
    duracion: { type: Number, required: true },
    costo: { type: Number, required: true }
});

export const PracticaModel = mongoose.model("Practica", practicaSchema);