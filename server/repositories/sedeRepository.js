import {Repository} from "./repository.js";
import {Sede} from '../domain/sede.js';

let sede1  = new Sede(1, "Sede 1", "Villa Urquiza");
let sede2 = new Sede(2, "Sede 2", "Caballito");

export class SedeRepository extends Repository {
    constructor() {
        super();
        this.objetos = [sede1,sede2];
    }
}