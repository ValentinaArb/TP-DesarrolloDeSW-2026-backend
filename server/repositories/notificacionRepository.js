import {Notificacion} from "../domain/notificacion.js"
import { Repository } from "./repository.js";
import { NotificacionMapper } from "../mappers/NotificacionMapper.js";
import { NotificacionModel } from "../schemas/notificacion.schema.js";

export class NotificacionRepository extends Repository {
    constructor() {
        super(NotificacionModel, new NotificacionMapper());
    }

    
}