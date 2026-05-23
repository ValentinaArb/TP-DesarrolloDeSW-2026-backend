import mongoose from "mongoose";
import {ObraSocial} from "../domain/obraSocial.js";

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

obraSocialSchema.loadClass(ObraSocial);

export const ObraSocialModel = mongoose.model("ObraSocial", obraSocialSchema);