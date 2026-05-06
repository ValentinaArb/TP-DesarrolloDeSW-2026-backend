export class PracticaMapper {
    static toPersistence(practica) {
        return {
            id: practica.id,
            codigo: practica.codigo,
            nombre: practica.nombre,
            duracionEnMins: practica.duracionEnMins,
            costo: practica.costo
        };
    }

    static toDomain(practicaDoc) {
        return new Practica(practicaDoc.id, practicaDoc.codigo, practicaDoc.nombre, practicaDoc.duracionEnMins, practicaDoc.costo);
    }
}