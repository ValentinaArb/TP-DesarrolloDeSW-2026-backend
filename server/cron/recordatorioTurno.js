import { TurnoRepository } from "../repositories/turnoRepository.js";
import { FactoryNotificacion } from "../domain/factoryNotificacion.js";
import cron from 'node-cron'; 

const turnoRepository = new TurnoRepository();
const factoryNotificacion = new FactoryNotificacion();

cron.schedule('0 8 * * *', async () => {
    console.log("Ejecutando cron de recordatorios...");
    
    const hoy = new Date();
    const maniana = new Date(hoy);
    maniana.setDate(hoy.getDate() + 1);

    try {
        const turnosParaRecordar = await turnoRepository.buscarPorFechaYEstado(maniana, 'RESERVADO');

        for (const turno of turnosParaRecordar) {
            factoryNotificacion.crearRecordatorio(turno);
        }
        console.log(`Cron finalizado con éxito. Se procesaron ${turnosParaRecordar.length} turnos.`);
    } catch (error) {
        console.error("Error al ejecutar el cron de recordatorios:", error);
    }
});