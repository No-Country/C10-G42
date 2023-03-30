import { type Request, type Response } from 'express'
import { httpErrorHandler } from '../utils/httpErrorHandler'
import { getAll } from '../services/patient.service'

const getPatients = (req: Request, res: Response): void => {
  try {
    const patients = getAll()
    res.send(patients)
  } catch (error) {
    httpErrorHandler(res, error)
  }
}

export { getPatients }
