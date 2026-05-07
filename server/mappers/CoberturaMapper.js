import { CoberturaServicio } from "../domain/coberturaServicio";

export class CoberturaMapper {
    static toPersistence(cobertura) {
        return {
            id: cobertura.id,
            servicio: {
                nombre: cobertura.servicio.nombre,
                costo: cobertura.servicio.costo
            },
            nivel: cobertura.nivel
        };
    }

    static toDomain(coberturaDoc) {
        return new CoberturaServicio({ nombre: coberturaDoc.servicio.nombre, costo: coberturaDoc.servicio.costo }, coberturaDoc.nivel);
    }
}