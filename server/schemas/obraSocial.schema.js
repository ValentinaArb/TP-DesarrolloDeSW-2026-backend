import mongoose from "mongoose";

const obraSocialSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    planes: [
        {
            nombre: { type: String, required: true },
            coberturas: [{ servicio: { nombre: { type: String, required: true } },}]
        }
    ]
});

export const ObraSocialModel = mongoose.model("ObraSocial", obraSocialSchema);