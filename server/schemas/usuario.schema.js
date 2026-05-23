import mongoose from "mongoose";
import {Usuario} from "../domain/usuario.js";

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    mail: { type: String, required: true },
    password: { type: String, required: true }
});

usuarioSchema.loadClass(Usuario);

export const UsuarioModel = mongoose.model("Usuario", usuarioSchema);