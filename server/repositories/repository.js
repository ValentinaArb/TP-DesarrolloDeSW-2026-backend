import { NotFoundError } from "../errors/AppError.js";

export class Repository {
    objetos = [];
    
    // CREATE (POST)
    async create(objeto) {
        const indice = this.objetos.length - 1  
        const ultimoId = this.objetos[indice].id;
        objeto.id = ultimoId + 1;
        this.objetos.push(objeto);
        console.info("Creado " , objeto.constructor.name);
        return objeto;
    }

    // DELETE (DELETE)
    async delete(objetoId) {
        const indiceAEliminar = this.encontrarIndiceDeId(objetoId);
        const objeto = this.objetos[indiceAEliminar]
        if(indiceAEliminar !== -1) {
            this.objetos.splice(indiceAEliminar, 1);
            console.info("Eliminado ", objeto.constructor.name);
        } else {
            this.errorNoEncontrado();
        }
    }

    // READ (GET)
    // all
    async findAll() {
        return this.objetos;
    }

    async findPaginated(pagina, limitePorPagina) {
        const todosLosObjetos = Object.values(this.objetos);
        const inicio = (pagina - 1) * limitePorPagina;
        const fin = inicio + limitePorPagina;

        return {
            objetos: todosLosObjetos.slice(inicio, fin),
            totalObjetos: todosLosObjetos.length
        }
    }

    // by ID
    async findById(objetoId) {
        const indiceBuscado = this.encontrarIndiceDeId(objetoId);

        if(indiceBuscado !== -1){
            return this.objetos[indiceBuscado];
        } else {
            this.errorNoEncontrado();
        }
    }

    // UPDATE (PUT/PATCH)
    async update(nuevoObjeto, idObjetoViejo) {
        const indice = this.encontrarIndiceDeId(idObjetoViejo);

        this.objetos[indice] = nuevoObjeto;
        
        console.info("Actualizado ", nuevoObjeto.constructor.name);
    }

    // methods internos
    encontrarIndiceDeId(objetoId) {
        return this.objetos.findIndex((o) => String(o.id) === String(objetoId));
    }

    errorNoEncontrado() {
        throw new NotFoundError("Whoops! El id buscado no existe");
    }
}