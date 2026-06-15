import { Repository } from "./repository.js";
import { TurnoModel } from "../schemas/turno.schema.js";
import mongoose from "mongoose";

export class TurnoRepository extends Repository {
  constructor() {
    super(TurnoModel);
  }

  async turnosDe(medicoId) {
    return await this.mongooseModel.find({ medico: medicoId });
  }

  async turnosPara(pacienteId) {
    return await this.mongooseModel.find({ "paciente._id": pacienteId });
  }

  async buscarPorFechaYEstado(fecha, estado) {
    return await this.mongooseModel.find({
      fechaInicio: fecha,
      estado: estado,
    });
  }

  async findDisponiblesByFilters(filtros) {
    const andConditions = [];

    // NUEVO: Exigimos estrictamente que el estado sea DISPONIBLE
    // Asegurate de importar EstadoTurno si usás el enum, o pasá el string directamente.
    andConditions.push({ estado: "DISPONIBLE" });

    // 1. Filtro Médico: Transformamos el texto a ObjectId de Mongoose
    if (filtros.medicoId) {
      const idMedicoMongo = new mongoose.Types.ObjectId(filtros.medicoId);
      andConditions.push({
        $or: [
          { "medico._id": idMedicoMongo },
          { "medico.id": filtros.medicoId },
          { medico: idMedicoMongo },
        ],
      });
    }

    // 2. Filtro Servicio: Transformamos el texto a ObjectId de Mongoose
    if (filtros.servicioId) {
      const idServicioMongo = new mongoose.Types.ObjectId(filtros.servicioId);
      andConditions.push({
        $or: [
          { "servicio._id": idServicioMongo },
          { "servicio.id": filtros.servicioId },
          { servicio: idServicioMongo },
        ],
      });
    }

    // 3. Filtro Sede: Transformamos el texto a ObjectId de Mongoose
    if (filtros.sede) {
      const idSedeMongo = new mongoose.Types.ObjectId(filtros.sede);
      andConditions.push({
        $or: [
          { "sede._id": idSedeMongo },
          { "sede.id": filtros.sede },
          { sede: idSedeMongo },
        ],
      });
    }

    // 4. Filtro Fechas
    if (filtros.fechaDesde || filtros.fechaHasta) {
      const fechaQuery = {};
      if (filtros.fechaDesde) fechaQuery.$gte = new Date(filtros.fechaDesde);
      if (filtros.fechaHasta) {
        const fechaFin = new Date(filtros.fechaHasta);
        fechaFin.setDate(fechaFin.getDate() + 1);
        fechaQuery.$lt = fechaFin;
      }
      andConditions.push({ fechaInicio: fechaQuery });
    }

    // 5. Unimos todo.
    const queryFinal = andConditions.length > 0 ? { $and: andConditions } : {};

    return await this.mongooseModel
      .find(queryFinal)
      .populate("medico")
      .populate("servicio")
      .populate("sede");
  }
}
