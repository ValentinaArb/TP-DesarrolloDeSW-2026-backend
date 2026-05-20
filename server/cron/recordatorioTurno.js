import { TurnoRepository } from "../repositories/turnoRepository"
import { FactoryNotificacion } from "../domain/factoryNotificacion"

const cron = require('node-cron');

const turnoRepository = new TurnoRepository()
const factoryNotificacion = new FactoryNotificacion()

cron.schedule('0 8 * * *', async () => {
    console.log("Ejecutando cron de recordatorios...");
    
    const maniana = new Date().setDate(maniana.getDate() + 1);

    const turnosParaRecordar = await turnoRepository.buscarPorFechaYEstado(maniana, 'RESERVADO');

    for (const turno of turnosParaRecordar) {
        factoryNotificacion.crearRecordatorio(turno);
    }
});