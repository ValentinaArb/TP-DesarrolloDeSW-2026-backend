class Medico {
    id
    usuario
    matricula
    nombre
    apellido
    especialidades
    practicas
    sedes
    disponibilidades


    constructor(id = null, usuario, matricula, nombre, apellido, especialidades, practicas, sedes, disponibilidades) {
        this.id = id;
        this.usuario = usuario;
        this.matricula = matricula;
        this.nombre = nombre;
        this.apellido = apellido;
        this.especialidades = especialidades;
        this.practicas = practicas;
        this.sedes = sedes;
        this.disponibilidades = disponibilidades;
    }

    agregarDisponibilidad(disponibilidad) {
        this.disponibilidades.push(disponibilidad);
        console.log("agregarDisponibilidadDominio");
    }

    eliminarDisponibilidad(disponibilidad) {
        const indice = this.disponibilidades.indexOf(disponibilidad);

        this.disponibilidades.splice(indice, 1);
    }
}

export {Medico}