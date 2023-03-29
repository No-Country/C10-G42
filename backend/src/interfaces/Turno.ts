import { ObjectId } from "mongoose";

export interface Appointment {
  fecha: Date,
  horaInicio: number,
  minutoInicio: number,
  duracion: number,
  paciente: ObjectId,
  medico: ObjectId,
}