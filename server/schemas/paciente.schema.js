import mongoose from "mongoose";
import {Paciente} from "../domain/paciente.js";

const pacienteSchema = new mongoose.Schema({
    usuario: {
        nombre: String,
        mail: String,
        _id: {type: String, required: true}
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    dni: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\d+$/.test(v);
            },
            message: props => `El DNI [${props.value}] es inválido. Solo se permiten números.`
        }

    },
    fechaNacimiento: {
        type: Date,
        required: true,
        validate: {
            validator: function(valorFecha) {
                if (!valorFecha) return false;
                const hoy = new Date();
                let edad = hoy.getFullYear() - valorFecha.getFullYear();
                const diferenciaMeses = hoy.getMonth() - valorFecha.getMonth();
                if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < valorFecha.getDate())) {
                    edad--;
                }
                return edad >= 18;
            },
            message: "El paciente debe ser mayor de 18 años para registrarse."
        }
    },
    obraSocial: {
        nombre: { type: String }
    },
    plan: {
        nombre: { type: String }
    },
    sexo: {
        type: String,
        enum: ["M", "F"],
        required: true
    }
});

pacienteSchema.loadClass(Paciente);

export const PacienteModel = mongoose.model("Paciente", pacienteSchema, "pacientes");
