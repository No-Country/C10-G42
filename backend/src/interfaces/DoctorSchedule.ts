import { type ObjectId } from 'mongoose'

export interface DoctorSchedule {
  doctor: ObjectId
  day: Date
  startTime: string
  endTime: string
  interval: number
}
