export class Usuario{
    id;
    nombre;
    mail;
    password;

    constructor(id = null, nombre, mail, password) {
        this.id = id;
        this.nombre = nombre;
        this.mail = mail;
        this.password = password;
    }
}