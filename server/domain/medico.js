import { NotFoundError } from "../errors/AppError.js"

export class Medico {
    id
    usuario
    matricula
    nombre
    apellido
    servicios
    sedes
    disponibilidades
    disponibilidadesAnteriores

    constructor(id = null, usuario, matricula, nombre, apellido, servicios, sedes, disponibilidades) {
        this.id = id;
        this.usuario = usuario;
        this.matricula = matricula;
        this.nombre = nombre;
        this.apellido = apellido;
        this.servicios = servicios;
        this.sedes = sedes;
        this.disponibilidades = disponibilidades;
        this.disponibilidadesAnteriores = [];
    }

    agregarDisponibilidad(disponibilidad) {
        this.disponibilidades.push(disponibilidad);
    }

    eliminarDisponibilidad(disponibilidad) {
        const indice = this.disponibilidades.indexOf(disponibilidad);
        this.disponibilidades.splice(indice, 1);
        this.disponibilidadesAnteriores.push(disponibilidad);
    }

    darDeAltaServicio(servicio) {
        this.servicios.push(servicio);
    }

    darDeBajaServicio(servicioId) {
        const indice = this.servicios.findIndex(s => String(s.id) === String(servicioId));
        if (indice === -1) {
            throw new NotFoundError("no se encontró el servicio en la lista de servicios del médico");
        }
        this.servicios.splice(indice, 1);
    }

    darDeAltaSede(sede) {
        this.sedes.push(sede);
    }

    darDeBajaSede(sedeId) {
        const indice = this.sedes.findIndex(s => String(s.id) === String(sedeId));
        if (indice === -1) {
            throw new NotFoundError("No se encontró la sede en la lista de sedes del médico");
        }
        this.sedes.splice(indice, 1);
    }

    tieneEsaDisponibilidad(disponibilidadId) {
        return this.disponibilidades.find(d => d.id === disponibilidadId);
    }
}