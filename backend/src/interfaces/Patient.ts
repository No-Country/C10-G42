import { type ObjectId } from 'mongoose'

export interface Patient {
  user: ObjectId
  username: string
  birthdate: Date
  phone: string
  gender: string
  dni: string
}
