import { z } from 'zod';

// Schema que valida uno de los tres casos
export const actualizarTurnoSchema = z.object({
    horaInicio: z.string().or(z.date()).optional(),
    motivo: z.string().min(1, "El motivo es requerido").optional(),
    estado: z.literal("PENDIENTE").optional(),
    respuesta: z.enum(["true", "false"]).optional()
}).refine(
    data => {
        const tieneHoraInicio = data.horaInicio !== undefined;
        const tieneMotivo = data.motivo !== undefined;
        const tienePendiente = data.estado === "PENDIENTE";

        return tieneHoraInicio || tieneMotivo || tienePendiente;
    },
    "Se debe enviar horaInicio, motivo o estado y respuesta"
).refine(
    data => {
        if (data.horaInicio !== undefined) {
            return data.motivo === undefined && data.estado === undefined && data.respuesta === undefined;
        }
        return true;
    },
    "No se pueden enviar múltiples opciones al mismo tiempo"
).refine(
    data => {
        if (data.motivo !== undefined) {
            return data.horaInicio === undefined && data.estado === undefined && data.respuesta === undefined;
        }
        return true;
    },
    "No se pueden enviar múltiples opciones al mismo tiempo"
).refine(
    data => {
        if (data.estado === "PENDIENTE") {
            return data.respuesta !== undefined && data.horaInicio === undefined && data.motivo === undefined;
        }
        return true;
    },
    "Si el estado es PENDIENTE, debe enviar respuesta"
);


