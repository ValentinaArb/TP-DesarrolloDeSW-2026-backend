import { NotificacionRepository } from "../repositories/notificacionRepository.js";
import { NotFoundError } from "../errors/AppError.js";

export class NotificacionService {
  constructor() {
    this.notificacionRepository = new NotificacionRepository();
  }

  async obtenerTodosFiltrados(usuarioId, estaLeida) {
    const notificaciones = await this.notificacionRepository.findAll();
    
    let notificacionesFiltradas = notificaciones.filter((n) => {
    console.log("EL ID DEL USUARIO DE LA NOTIFICACION ES", n.destinatario?.usuario?._id?.toString())
    console.log("EL ID DEL USUARIO2", usuarioId)
     return n.destinatario?.usuario?._id?.toString() === usuarioId;
    });
    console.log("LAS NOTIFICACIONES SON", notificaciones);
    
    if (estaLeida !== undefined) {
      console.log("ENTRO AL IF JAJAJJA")
      notificacionesFiltradas = notificacionesFiltradas.filter(
        (n) => String(n.estaLeida) === String(estaLeida),
      );
    }
    console.log("LAS NOTIFICAIONES FILTRADAS SON", notificacionesFiltradas);
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
