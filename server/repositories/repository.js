class Repository {
    objetos = [];
    
    // CREATE (POST)
    async create(objeto) {
        const indice = this.objetos.length - 1  
        const ultimoId = this.objetos[indice].id;
        objeto.id = ultimoId + 1;
        this.objetos.push(objeto);
        console.log("Creado " , objeto.constructor.name);
        return objeto;
    }

    // DELETE (DELETE)
    async delete(objetoId) {
        const indiceAEliminar = this._encontrarIndiceDeId(objetoId);
        if(indiceAEliminar !== -1) {
            const nombreEliminado = this.objetos[indiceAEliminar].constructor.name
            this.objetos.splice(indiceAEliminar, 1);
            console.log("Eliminado ", nombreEliminado);
        } else {
            this._errorNoEncontrado();
        }
    }

    // READ (GET)
    // all
    async findAll() {
        return this.objetos;
    }

    // by ID
    async findById(objetoId) {
        const indiceBuscado = this._encontrarIndiceDeId(objetoId);

        if(indiceBuscado !== -1){
            return this.objetos[indiceBuscado];
        } else {
            this._errorNoEncontrado();
        }
    }

    // UPDATE (PUT/PATCH)
    async update(nuevoObjeto, idObjetoViejo) {
        const indice = this._encontrarIndiceDeId(idObjetoViejo);

        this.objetos[indice] = nuevoObjeto;
        
        console.log("Correctament actualizado ", nuevoObjeto.constructor.name);
    }

    // metodos internos
    _encontrarIndiceDeId(objetoId) {
        return this.objetos.findIndex((o) => String(o.id) === String(objetoId));
    }

    _errorNoEncontrado() {
        throw new Error("Whoops! El id buscado no existe");
    }
}

export { Repository };