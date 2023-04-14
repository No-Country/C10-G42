import { type Auth } from './Auth'

export interface User extends Auth {
  firstname: string
  lastname: string
  role: string
  code: string
  confirmed: boolean
}
