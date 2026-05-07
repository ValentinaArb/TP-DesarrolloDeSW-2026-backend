import { Paciente } from "../domain/paciente.js";

export class PacienteMapper {
    static toDomain(pacienteDoc) {
        return new Paciente(
            pacienteDoc.id,
            pacienteDoc.nombre,
            pacienteDoc.apellido,
            pacienteDoc.dni,
            pacienteDoc.fechaNacimiento,
            pacienteDoc.obraSocial,
            pacienteDoc.plan,
            pacienteDoc.sexo
        );
    }

    static toPersistence(paciente) {
        return {
            id: paciente.id,
            nombre: paciente.nombre,
            apellido: paciente.apellido,
            dni: paciente.dni,
            fechaNacimiento: paciente.fechaNacimiento,
            obraSocial: paciente.obraSocial,
            plan: paciente.plan,
            sexo: paciente.sexo
        };
    }
}