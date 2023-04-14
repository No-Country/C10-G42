import { type ObjectId } from 'mongoose'

export interface Doctor {
  user: ObjectId
  name: string
  specialty: string
  phone: string
  photoUrl: string
}
