import mongoose from "mongoose";

const obraSocialSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    nombre: {
        type: String,
        required: true
    },
    planes: [
        {
            planId: { type: mongoose.Schema.Types.ObjectId, ref: "Plan", required: true },
            nombre: { type: String, required: true }
        }
    ]
});

export const ObraSocialModel = mongoose.model("ObraSocial", obraSocialSchema);