import { type ObjectId } from 'mongoose'

export interface Doctor {
  user: ObjectId
  speciality: string
  phone: string
  photoUrl: string
}
