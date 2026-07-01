import { NotificacionRepository } from "../repositories/notificacionRepository.js";
import { NotFoundError } from "../errors/AppError.js";

export class NotificacionService {
  constructor() {
    this.notificacionRepository = new NotificacionRepository();
  }

  async obtenerTodosFiltrados(usuarioId, estaLeida) {
    const notificaciones = await this.notificacionRepository.findAll();
    
    let notificacionesFiltradas = notificaciones.filter((n) => {
  
     return n.destinatario?.usuario?._id?.toString() === usuarioId;
    });

    
    if (estaLeida !== undefined) {
      notificacionesFiltradas = notificacionesFiltradas.filter(
        (n) => String(n.estaLeida) === String(estaLeida),
      );
    }
  
    return notificacionesFiltradas;
  }

  async obtenerTodos() {
    const notificaciones = await this.notificacionRepository.findAll();
    return notificaciones;
  }

  async marcarComoLeida(id) {
    let notificacion = await this.notificacionRepository.findById(id);
    if (!notificacion) {
      throw new NotFoundError(`No se encontró la notificación con ID: ${id}`);
    }
    notificacion.marcarComoLeida();
    await this.notificacionRepository.update(notificacion, id);
  }
}
