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
    darDeAltaServicio(medico, servicio){
        medico.servicios.add(servicio);
    }

    darDeBajaServicio(medico, servicio){
        if(medico.servicios.any(s => s === servicio)){
            medico.servicios.pop(servicio);
        }
    }



}