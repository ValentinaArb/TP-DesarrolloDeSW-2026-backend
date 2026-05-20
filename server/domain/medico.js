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
    darDeAltaServicio(servicio){
        this.servicios.push(servicio);
    }

    darDeBajaServicio(servicioId){
        if(this.servicios.some(s => String(s.id) === String(servicioId))){
            this.servicios.pop(this.servicios.find(s => String(s.id) === String(servicioId)));
        }else{
            throw new NotFoundError("no se encontró el servicio en la lista de servicios del médico");
        }
    }
    tieneEsaDisponibilidad(disponibilidadId) {
        return this.disponibilidades.find(d => d.id === disponibilidadId);
    }
}