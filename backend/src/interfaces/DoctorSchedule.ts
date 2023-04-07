import { type ObjectId } from 'mongoose'

export interface DoctorSchedule {
  doctor: ObjectId
  dia: Date
  entrada: string
  salida: string
  intervalo: number
  turnos?: string[]
}
