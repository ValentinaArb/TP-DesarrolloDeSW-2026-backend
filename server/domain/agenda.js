import { TurnoService } from "../services/turnoService";

class Agenda {
    constructor() {
    }

    generarTurnosPara(servicio, medico, sede){
        const disponibilidadesMedico = medico.getDisponibilidades();
        const sedesMedico = medico.getSedes();
        const medicoId = medico.getId();
        try{
            if(sedesMedico.includes(sede)){
                for(const fechaHora of disponibilidadesMedico){
                    if(!medico.yaTieneTurno(medicoId, fechaHora)){
                       TurnoService.crearTurno({medico,fechaHora,servicio,sede});
                    }
                }
            }else{
                throw new Error("El medico no tiene la sede indicada.");
            }
        }
        catch(error){
            console.error("Error al generar turnos para el servicio:", error);
        }
    }
    
    refrescarTurnosSegunDisponibilidadDe(medico){ 
        turnos = this.turnoRepository.findByMedico(); //implementar metodo de obtener turnos de un medico en turnoRepository 
        for(const turno of turnos){
            if(!medicoService.estaDisponible(medico.id, turno.fechaHora)) {
                turnoRepository.delete(turno); //FIJARSE QUE SI YA TIENE UN PACIENTE, NO SE ELIMINA, SE PASA A CANCELADO.
            }
        }
    }
}