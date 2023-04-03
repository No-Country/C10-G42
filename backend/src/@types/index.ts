import { type User } from '../interfaces/User'

declare global {
  namespace Express {
    export interface Request {
      user?: User
    }
  }
}
