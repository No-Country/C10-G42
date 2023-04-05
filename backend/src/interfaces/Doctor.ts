import { type ObjectId } from 'mongoose'

export interface Doctor {
  user: ObjectId
  name: string
  speciality: string
  phone: string
  photoUrl: string
}
