import { TurnoService } from "./turnoService";
import { TurnoRepository } from "../repositories/turnoRepository";
import { UnprocessableEntityError } from "../errors/AppError"
import { BadRequestError } from "../errors/AppError.js";

class AgendaService {
    constructor() {
        this.turnoRepository = new TurnoRepository();
        this.medicoService = new MedicoService();
        this.turnoService = new TurnoService();
    }
    
    async generarTurnosPara(medico){
        const disponibilidadesMedico = medico.disponibilidades;
        try{
            disponibilidadesMedico.forEach(d  => {
                const fechas = this.obtenerFechasPorDia(d.diaSemana);
                fechas.forEach(fecha => {
                    const fechaInicio = new Date(fecha.getFullYear(),fecha.getMonth(),fecha.getDate(),d.inicio.getHours(),d.inicio.getMinutes(),d.inicio.getSeconds());
                    const fechaFin = new Date(fechaInicio.getTime() + d.duracion * 60000);
                    const turno = new Turno(null, medico, fechaInicio, fechaFin, null, d.servicio, d.sede, EstadoTurno.DISPONIBLE, [], d.obtenerCosto()); 
                    if(!this.medicoService.yaTieneTurno(medico.id, turno, this.turnoService)){
                        this.turnoRepository.create(turno);
                    }
                });
            });
        }
        catch(error){
            return next(error);
        }
    }

    obtenerFechasPorDia(diaSemana) {
        const fechas = [];
        const hoy = new Date();
        const fin = new Date();
        fin.setFullYear(fin.getFullYear() + 1);

        while (hoy.getDay() !== diaSemana) {
            hoy.setDate(hoy.getDate() + 1);
        }
        while (hoy <= fin) {
            fechas.push(new Date(hoy));
            hoy.setDate(hoy.getDate() + 7);
        }
        return fechas;
    }
    
    refrescarTurnosSegunDisponibilidadDe(medico){
        const turnosMedico = await this.turnoRepository.turnosDe(medico.id);       
        try {
            turnosMedico.forEach(turno => {
                if(turno.estado !== EstadoTurno.RESERVADO){
                    this.turnoRepository.delete(turno.id);
                }   
            });
            this.generarTurnosPara(medico);
        }
        catch(error){
            return next(error);
        }
    }
}