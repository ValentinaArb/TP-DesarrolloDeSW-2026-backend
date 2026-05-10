import { Practica } from "../domain/practica.js";

export class PracticaMapper {
    static toPersistence(practica) {
        return {
            codigo: practica.codigo,
            nombre: practica.nombre,
            duracionEnMins: practica.duracionEnMins,
            costo: practica.costo
        };
    }

    static toDomain(practicaDoc) {
        return new Practica(practicaDoc._id.toString(), practicaDoc.codigo, practicaDoc.nombre, practicaDoc.duracionEnMins, practicaDoc.costo);
    }
}