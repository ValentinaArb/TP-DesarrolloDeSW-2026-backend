import { TurnoService } from "./turnoService";
import { TurnoRepository } from "../repositories/turnoRepository";
import { UnprocessableEntityError } from "../errors/AppError"

class AgendaService {
    constructor() {
        this.turnoRepository = new TurnoRepository(); // Asegúrate de tener una implementación de TurnoRepository
    }

    generarTurnosPara(servicio, medico, sede){  //!! VER CON GRUPO
        const turnosMedico = this.turnoRepository.turnosDe(medico.id);
        const sedesMedico = medico.sedes;
        const medicoId = medico.id;
        try{
            if(!sedesMedico.includes(sede)){
                throw new UnprocessableEntityError("El medico no tiene la sede indicada.");
            }
            turnosMedico.forEach(turno => {
                if(medico.yaTieneTurno(medicoId, turno)){
                    turnoService.crearTurno({medico,fechaInicio,servicio,sede});
            }});
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
                if(!medicoService.estaDisponible(medico.id, turno)) {
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