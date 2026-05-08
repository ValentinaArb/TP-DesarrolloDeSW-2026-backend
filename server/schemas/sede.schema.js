import mongoose from "mongoose";

const sedeSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    direccion: { type: String, required: true }
});

export const SedeModel = mongoose.model("Sede", sedeSchema);