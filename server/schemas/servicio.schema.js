import mongoose from "mongoose";

const servicioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    duracion: { type: Number, required: true },
    costo: { type: Number, required: true }
});

export const ServicioModel = mongoose.model("Servicio", servicioSchema);