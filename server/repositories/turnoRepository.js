import { Repository } from "./repository.js";
import { TurnoModel } from "../schemas/turno.schema.js";

export class TurnoRepository extends Repository {
    constructor() {
        super(TurnoModel);
    }

    async turnosDe(medicoId){
        return await this.mongooseModel.find({"medico.id": medicoId});
    }

    async turnosPara(pacienteId){
        return await this.mongooseModel.find({"paciente.id": pacienteId});
    }

    async buscarPorFechaYEstado(fecha,estado){
        return await this.mongooseModel.find({fechaInicio: fecha, estado: estado});
    }

    async findDisponiblesByFilters(filtros) {
        const query = { estado: "DISPONIBLE" };

        if (filtros.medicoId) query["medico.id"] = filtros.medicoId;
        if (filtros.servicioId) query["servicio.id"] = filtros.servicioId;
        if (filtros.sede) query["sede.nombre"] = filtros.sede;

        if (filtros.fechaDesde || filtros.fechaHasta) {
            query.fechaInicio = {};
            if (filtros.fechaDesde) query.fechaInicio.$gte = new Date(filtros.fechaDesde);
            if (filtros.fechaHasta) query.fechaInicio.$lte = new Date(filtros.fechaHasta);
        }

        return await this.mongooseModel.find(query);
    }
}