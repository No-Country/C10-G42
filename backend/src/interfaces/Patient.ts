import { type ObjectId } from 'mongoose'

export interface Patient {
  user: ObjectId
  birthdate: Date
  phone: string
  gender: string
  dni: string
}
