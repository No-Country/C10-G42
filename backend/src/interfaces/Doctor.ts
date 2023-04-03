import { type User } from './User'

export interface Doctor extends User {
  especialty: string
  phone: string
}
