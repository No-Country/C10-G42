import { type Request, type Response } from 'express'

import { type Patient } from '../interfaces/Patient'
import { patientService } from '../services/patient.service'
import { httpErrorHandler } from '../utils/httpErrorHandler'

const patientCtrl = {
  create: (req: Request, res: Response): void => {
    const patientData: Patient = req.body
    patientService
      .create(patientData)
      .then(patient => {
        res
          .status(201)
          .json({ msg: 'Usuario: Paciente creado correctamente', patient })
      })
      .catch(error => {
        httpErrorHandler(res, error)
      })
  },
  getAll: (_req: Request, res: Response): void => {
    patientService
      .getAll()
      .then(patients => {
        res.json(patients)
      })
      .catch(error => {
        httpErrorHandler(res, error)
      })
  },
  get: (req: Request, res: Response): void => {
    const { id } = req.params
    patientService
      .get(id)
      .then(patient => {
        res.json(patient)
      })
      .catch(error => {
        httpErrorHandler(res, error)
      })
  },
  update: (req: Request, res: Response): void => {
    const { id } = req.params
    const patientData: Patient = req.body
    patientService
      .update(patientData, id)
      .then(patient => {
        res.json({ msg: 'tarea actualizada' })
      })
      .catch(error => {
        httpErrorHandler(res, error)
      })
  },
  delete: (req: Request, res: Response): void => {
    const { id } = req.params
    patientService
      .delete(id)
      .then(() => {
        res.json({ msg: 'Paciente removido' })
      })
      .catch(error => {
        httpErrorHandler(res, error)
      })
  }
}

export { patientCtrl }
