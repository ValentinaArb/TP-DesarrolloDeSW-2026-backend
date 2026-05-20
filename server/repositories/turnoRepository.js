import { Repository } from "./repository.js";
import { TurnoMapper } from "../mappers/TurnoMapper.js";
import { TurnoModel } from "../schemas/turno.schema.js";

export class TurnoRepository extends Repository {
    constructor() {
        super(TurnoModel, TurnoMapper);
    }

    async turnosDe(medicoId){
        const documentos = await this.mongooseModel.find({"medicoInfo.id": medicoId});
        return documentos.map(doc => this.mapper.toDomain(doc));
    }

    async turnosPara(pacienteId){
        const documentos = await this.mongooseModel.find({"pacienteInfo.id": pacienteId});
        return documentos.map(doc => this.mapper.toDomain(doc));
    }

    async buscarPorFechaYEstado(fecha,estado){
        const documentos = await this.mongooseModel.find({fechaInicio: fecha, estado: estado});
        return documentos.map(doc => this.mapper.toDomain(doc));
    }

    async findDisponiblesByFilters(filtros) {
        const query = { estado: "DISPONIBLE" };

        if (filtros.medicoId) query["medicoInfo.id"] = filtros.medicoId;
        if (filtros.servicioId) query["servicioInfo.id"] = filtros.servicioId;
        if (filtros.sede) query["sedeInfo.nombre"] = filtros.sede;

        if (filtros.fechaDesde || filtros.fechaHasta) {
            query.fechaInicio = {};
            if (filtros.fechaDesde) query.fechaInicio.$gte = new Date(filtros.fechaDesde);
            if (filtros.fechaHasta) query.fechaInicio.$lte = new Date(filtros.fechaHasta);
        }

        const documentos = await TurnoModel.find(query);
        return documentos.map(doc => this.mapper.toDomain(doc));
    }
}