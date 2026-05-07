import { Sede } from "../domain/sede.js";

export class SedeMapper {
    static toPersistence(sede) {
        return {
            id: sede.id,
            nombre: sede.nombre,
            direccion: sede.direccion
        };
    }

    static toDomain(sedeDoc) {
        return new Sede(sedeDoc.id, sedeDoc.nombre, sedeDoc.direccion);
    }
}