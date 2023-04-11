import { type ObjectId } from 'mongoose'

export interface DoctorSchedule {
  doctor: ObjectId
  day: Date
  start_time: string
  end_time: string
  interval: number
}
