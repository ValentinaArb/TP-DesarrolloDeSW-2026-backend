import { Sede } from "../domain/sede.js";

export class SedeMapper {
    static toPersistence(sede) {
        return {
            nombre: sede.nombre,
            direccion: sede.direccion
        };
    }

    static toDomain(sedeDoc) {
        return new Sede(sedeDoc._id.toString(), sedeDoc.nombre, sedeDoc.direccion);
    }
}