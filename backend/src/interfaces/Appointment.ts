import { type ObjectId } from 'mongoose'

export interface Appointment {
  date: Date
  startTime: string
  duration: number
  patient: ObjectId
  doctor: ObjectId
}
