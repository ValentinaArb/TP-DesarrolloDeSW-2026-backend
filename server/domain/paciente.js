export class Paciente {
  id;
  usuario;
  nombre;
  apellido;
  dni;
  fechaNacimiento;
  obraSocial;
  plan;
  sexo;

  constructor(
    id,
    usuario,
    nombre,
    apellido,
    dni,
    fechaNacimiento,
    obraSocial,
    plan,
    sexo,
  ) {
    this.id = id;
    this.usuario = usuario;
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.fechaNacimiento = fechaNacimiento;
    this.obraSocial = obraSocial;
    this.plan = plan;
    this.sexo = sexo;
  }

  cambiarObraSocial(obraSocial) {
    this.obraSocial = obraSocial;
  }

  cambiarPlan(plan) {
    this.plan = plan;
  }

  cambiarMail(mail) {
    this.mail = mail;
  }
}
