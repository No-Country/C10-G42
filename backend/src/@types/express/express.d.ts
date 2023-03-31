import { type Patient } from '../../models/Patient'

declare global {
  namespace Express {
    export interface Request {
      user?: Patient // TODO: Agregar modelo de Doctor -> user?: Patient | Doctor
    }
  }
}
