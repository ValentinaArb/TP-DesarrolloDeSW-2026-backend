import { TurnoService } from "./turnoService.js";
import { TurnoRepository } from "../repositories/turnoRepository.js";
import { MedicoService } from "./medicoService.js";
import { Turno } from "../domain/turno.js";
import { EstadoTurno } from "../domain/estadoTurno.js";
import { UnprocessableEntityError, BadRequestError } from "../errors/AppError.js";

class AgendaService {
    constructor(medicoService = null) {
        this.turnoRepository = new TurnoRepository();
        this.medicoService = medicoService ?? new MedicoService(this);
        this.turnoService = new TurnoService();
    }

    async generarTurnosPara(medico) {
        const disponibilidadesMedico = medico.disponibilidades;
        try {
            for (const d of disponibilidadesMedico) {
                const [horasDesde, minutosDesde] = d.horaDesde.split(':').map(Number);
                const [horasHasta, minutosHasta] = d.horaHasta.split(':').map(Number);
                const duracionMs = d.servicio.duracionTurno * 60000;
                const fechas = this.obtenerFechasPorDia(d.diaSemana);

                for (const fecha of fechas) {
                    let fechaInicio = new Date(
                        fecha.getFullYear(),
                        fecha.getMonth(),
                        fecha.getDate(),
                        horasDesde,
                        minutosDesde,
                        0
                    );
                    const fechaLimite = new Date(
                        fecha.getFullYear(),
                        fecha.getMonth(),
                        fecha.getDate(),
                        horasHasta,
                        minutosHasta,
                        0
                    );

                    while (fechaInicio < fechaLimite) {
                        const fechaFin = new Date(fechaInicio.getTime() + duracionMs);

                        if (fechaFin > fechaLimite) break;

                        const turno = new Turno(
                            null,
                            medico,
                            fechaInicio,
                            fechaFin,
                            null,
                            d.servicio,
                            d.sede,
                            EstadoTurno.DISPONIBLE,
                            [],
                            d.servicio.costo
                        );

                        const yaTiene = await this.medicoService.yaTieneTurno(
                            medico.id ?? medico._id,
                            turno,
                            this.turnoService
                        );
                        if (!yaTiene) {
                            await this.turnoRepository.create(turno);
                        }

                        fechaInicio = new Date(fechaInicio.getTime() + duracionMs);
                    }
                }
            }
        } catch (error) {
            throw new UnprocessableEntityError(error.message);
        }
    }

    obtenerFechasPorDia(diaSemana) {
        const fechas = [];
        const hoy = new Date();
        const fin = new Date();
        fin.setMonth(fin.getMonth() + 6);

        while (hoy.getDay() !== diaSemana) {
            hoy.setDate(hoy.getDate() + 1);
        }
        while (hoy <= fin) {
            fechas.push(new Date(hoy));
            hoy.setDate(hoy.getDate() + 7);
        }
        return fechas;
    }

    async generarTurnosParaNuevaDisponibilidad(medico, disponibilidad) {
        try {
            const d = disponibilidad;
            const [horasDesde, minutosDesde] = d.horaDesde.split(':').map(Number);
            const [horasHasta, minutosHasta] = d.horaHasta.split(':').map(Number);
            const duracionMs = d.servicio.duracionTurno * 60000;
            const fechas = this.obtenerFechasPorDia(d.diaSemana);

            for (const fecha of fechas) {
                let fechaInicio = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), horasDesde, minutosDesde, 0);
                const fechaLimite = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), horasHasta, minutosHasta, 0);

                while (fechaInicio < fechaLimite) {
                    const fechaFin = new Date(fechaInicio.getTime() + duracionMs);
                    if (fechaFin > fechaLimite) break;

                    const turno = new Turno(null, medico, fechaInicio, fechaFin, null, d.servicio, d.sede, EstadoTurno.DISPONIBLE, [], d.servicio.costo);

                    const yaTiene = await this.medicoService.yaTieneTurno(
                        medico.id ?? medico._id,
                        turno,
                        this.turnoService
                    );

                    if (!yaTiene) {
                        await this.turnoRepository.create(turno);
                    }

                    fechaInicio = new Date(fechaInicio.getTime() + duracionMs);
                }
            }
        } catch (error) {
            throw new UnprocessableEntityError(error.message);
        }
    }

    async eliminarTurnosDisponiblesDeDisponibilidad(medicoId, disponibilidad) {
        try {
            const turnosMedico = await this.turnoRepository.turnosDe(medicoId);
            const dispServicioId = (disponibilidad.servicio?._id ?? disponibilidad.servicio?.id)?.toString();
            const dispSedeId = (disponibilidad.sede?._id ?? disponibilidad.sede?.id)?.toString();
            const dispDia = Number(disponibilidad.diaSemana);
            const [hDesde, mDesde] = disponibilidad.horaDesde.split(':').map(Number);
            const [hHasta, mHasta] = disponibilidad.horaHasta.split(':').map(Number);
            const minutosDispInicio = hDesde * 60 + mDesde;
            const minutosDispFin = hHasta * 60 + mHasta;

            console.log(`=== Iniciando borrado para Día: ${dispDia}, Servicio: ${dispServicioId}, Sede: ${dispSedeId} ===`);
            console.log(`Rango horario de la disp: ${minutosDispInicio}min a ${minutosDispFin}min`);

            let contadorEliminados = 0;

            for (const turno of turnosMedico) {
                const fechaTurno = new Date(turno.fechaInicio);

                if (turno.estado !== EstadoTurno.DISPONIBLE) continue;

                const coincideDia = fechaTurno.getDay() === dispDia;

                const minutosTurnoInicio = fechaTurno.getHours() * 60 + fechaTurno.getMinutes();
                const estaEnRangoHorario = minutosTurnoInicio >= minutosDispInicio && minutosTurnoInicio < minutosDispFin;

                const turnoServicioId = (turno.servicio?._id ?? turno.servicio?.id ?? turno.servicio)?.toString();
                const turnoSedeId = (turno.sede?._id ?? turno.sede?.id ?? turno.sede)?.toString();

                const coincideServicio = turnoServicioId === dispServicioId;
                const coincideSede = turnoSedeId === dispSedeId;

                if (coincideDia) {
                    console.log(`[Turno analizado] Hora inicio: ${fechaTurno.getHours()}:${fechaTurno.getMinutes()} (${minutosTurnoInicio}min)`);
                    console.log(` -> Coincide Horario?: ${estaEnRangoHorario}`);
                    console.log(` -> Servicio Turno: ${turnoServicioId} vs Disp: ${dispServicioId} (${coincideServicio})`);
                    console.log(` -> Sede Turno: ${turnoSedeId} vs Disp: ${dispSedeId} (${coincideSede})`);
                }

                if (coincideDia && estaEnRangoHorario && coincideServicio && coincideSede) {
                    const idABorrar = turno.id ?? turno._id;
                    await this.turnoRepository.delete(idABorrar);
                    contadorEliminados++;
                }
            }

            console.log(`=== Proceso terminado. Se eliminaron ${contadorEliminados} turnos ===`);

        } catch (error) {
            console.error("Error en eliminarTurnosDisponiblesDeDisponibilidad:", error);
            throw new UnprocessableEntityError(error.message);
        }
    }
}

export { AgendaService };