import { Repository } from "./repository.js";
import { NotificacionModel } from "../schemas/notificacion.schema.js";

export class NotificacionRepository extends Repository {
    constructor() {
        super(NotificacionModel);
    }

    
}