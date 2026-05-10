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

    async turnosPara(paciente){
        const documentos = await this.mongooseModel.find({"pacienteInfo.id": paciente.id});
        return documentos.map(doc => this.mapper.toDomain(doc));
    }

    async buscarPorFechaYEstado(fecha,estado){
        const documentos = await this.mongooseModel.find({fechaInicio: fecha, estado: estado});
        return documentos.map(doc => this.mapper.toDomain(doc));
    }
}