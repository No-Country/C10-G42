import { type ObjectId } from 'mongoose'

export interface Patient {
  user: ObjectId
  username: string
  dni: string
}
