import { TurnoRepository } from "../repositories/turnoRepository.js"
import { FactoryNotificacion } from "../domain/factoryNotificacion.js"

import cron from 'node-cron';

const turnoRepository = new TurnoRepository()
const factoryNotificacion = new FactoryNotificacion()

export const recordatorioTurnoCron = () => {
    cron.schedule('0 8 * * *', async () => {
        console.log("Ejecutando cron de recordatorios...");

        try {
            const inicioManiana = new Date();
            inicioManiana.setDate(inicioManiana.getDate() + 1);
            inicioManiana.setHours(0, 0, 0, 0);

            const finManiana = new Date(inicioManiana);
            finManiana.setHours(23, 59, 59, 999);

            const turnosParaRecordar = await turnoRepository.buscarPorFechaYEstado(
                inicioManiana, 
                finManiana, 
                'RESERVADO'
            );

            for (const turno of turnosParaRecordar) {
                await factoryNotificacion.crearRecordatorio(turno); 
            }

            console.log(`Se procesaron ${turnosParaRecordar.length} recordatorios.`);

        } catch (error) {
            console.error("Error en cron de recordatorios:", error);
        }
    });
};
