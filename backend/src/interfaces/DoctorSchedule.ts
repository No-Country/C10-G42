import { type ObjectId } from 'mongoose'

export interface DoctorSchedule {
  doctor: ObjectId
  dia: string
  entrada: string
  salida: string
  intervalo: number
  turnos?: string[]
}
