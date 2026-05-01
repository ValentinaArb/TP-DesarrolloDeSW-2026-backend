import { TurnoService } from "./turnoService";
import { TurnoRepository } from "../repositories/turnoRepository";

class AgendaService {
    constructor() {
        this.turnoRepository = new TurnoRepository(); // Asegúrate de tener una implementación de TurnoRepository
    }

    generarTurnosPara(servicio, medico, sede){
        const disponibilidadesMedico = medico.getDisponibilidades();
        const sedesMedico = medico.getSedes();
        const medicoId = medico.getId();
        try{
            if(sedesMedico.includes(sede)){
                for(const fechaInicio of disponibilidadesMedico){
                    if(!medico.yaTieneTurno(medicoId, fechaInicio)){
                       TurnoService.crearTurno({medico,fechaInicio,servicio,sede});
                    }
                }
            }else{
                throw new Error("El medico no tiene la sede indicada."); //ESTA MAL
            }
        }
        catch(error){
            console.error("Error al generar turnos para el servicio:", error);
            throw error;
        }
    }
    
    refrescarTurnosSegunDisponibilidadDe(medico){ 
        try {
            turnos = this.turnoRepository.findByMedico(medico); //implementar metodo de obtener turnos de un medico en turnoRepository 
            for(const turno of turnos){
                if(!medicoService.estaDisponible(medico.id, turno.fechaInicio)) {
                    if(turno.paciente === null)  {
                        this.turnoRepository.delete(turno)
                    }
                }
                else {
                    turno.estado =EstadoTurno.CANCELADO;
                    this.turnoRepository.update(turno); 
                }
            }
        }
        catch(error){
            console.error("Error al refrescar turnos según disponibilidad del médico:", error);
        }
    }
}