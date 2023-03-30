import { type Request, type Response } from 'express'
import { httpErrorHandler } from '../utils/httpErrorHandler'

const createAppointment = (req: Request, res: Response): void => {
  try {
    const turno = { turno: 'turn' }
    res.status(201).json(turno)
  } catch (error) {
    httpErrorHandler(res, error)
  }
}

export {
  createAppointment

}
