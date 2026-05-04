import { TurnoRepository } from "../repositories/turnoRepository"

const cron = require('node-cron');

const turnoRepository = new TurnoRepository()

cron.schedule('0 8 * * *', async () => {
    console.log("Ejecutando cron de recordatorios...");
    
    const maniana = new Date().setDate(maniana.getDate() + 1);

    const turnosParaRecordar = await turnoRepository.buscarPorFechaYEstado(maniana, 'CONFIRMADO');

    for (const turno of turnosParaRecordar) {
        const notificacion = FactoryNotificacion.crearRecordatorio(turno);
    }
});