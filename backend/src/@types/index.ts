import { type Doctor } from '../interfaces/Doctor'
import { type Patient } from '../interfaces/Patient'

declare global {
  namespace Express {
    export interface Request {
      user?: Patient | Doctor
    }
  }
}
