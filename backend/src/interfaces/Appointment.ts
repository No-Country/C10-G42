import { type ObjectId } from 'mongoose'

export interface Appointment {
  fecha: Date
  horaInicio: string
  duracion: number
  paciente: ObjectId
  doctor: ObjectId
}
