export class PacienteMapper {
    toDomain(pacienteDoc) {
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

    toPersistence(paciente) {
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