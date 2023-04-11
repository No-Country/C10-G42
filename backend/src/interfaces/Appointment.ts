import { type ObjectId } from 'mongoose'

export interface Appointment {
  date: Date
  start_time: string
  duration: number
  patient: ObjectId
  doctor: ObjectId
}
