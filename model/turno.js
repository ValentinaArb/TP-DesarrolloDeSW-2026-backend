class Turno{
    id;
    medico;
    fechaHora;
    paciente;
    practica;
    sede;
    estado;
    historialDeEstados;
    costo;

    Turno(medico, fechaHora, practica, sede){
        this.medico = medico; 
        this.fechaHora = fechaHora;
        this.paciente = null;
        this.practica = practica;
        this.sede = sede;
        this.estado = EstadoTurno.DISPONIBLE;
        this.historialDeEstados = [this.estado];
        this.costo = null;
    }

    modificarEstado(nuevoEstado){
        historialDeEstados.push(this.estado);
        this.estado = nuevoEstado;
    }

    darAlta(paciente){
        if(this.EstadoTurno.DISPONIBLE){            
            this.paciente = paciente;
            modificarEstado(Reservado);
        }
        else{
            throw new Error("Whoops! El turno no está disponible.");
        }
}

    //TODO --> JUSTIFICACION DE DISEÑO. Dar de baja -> el estado vuelve a estar disponible.
    darBaja(){
        if((this.fechaHora - Date.now)/(1000 * 60 * 60) < 1){
            this.paciente = null;
            modificarEstado(EstadoTurno.DISPONIBLE);
        }
        else {
            throw new Error("Whoops! Tenés que dar de baja el turno con una hora de antelanción como mínimo.");
        }
    }

    
    
}