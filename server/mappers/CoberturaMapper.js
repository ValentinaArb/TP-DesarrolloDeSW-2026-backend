import { CoberturaServicio } from "../domain/coberturaServicio.js";

export class CoberturaMapper {
    static toPersistence(cobertura) {
        return {
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