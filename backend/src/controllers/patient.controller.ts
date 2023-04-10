import { type Request, type Response } from 'express'

import { deleteOne, get, getAll, update } from '../services/patient.service'
import { httpErrorHandler } from '../utils/httpErrorHandler'

const getPatient = ({ params }: Request, res: Response): void => {
  const { id } = params
  get(id)
    .then(response => res.json(response))
    .catch(error => {
      httpErrorHandler(res, error)
    })
}

const getAllPatients = (_req: Request, res: Response): void => {
  getAll()
    .then(response => res.json(response))
    .catch(error => {
      httpErrorHandler(res, error)
    })
}

const updatePatient = (req: Request, res: Response): void => {
  const { id } = req.params
  const { birthdate, phone, gender, dni } = req.body
  const patient = {
    birthdate,
    phone,
    gender,
    dni
  }

  update(id, patient)
    .then(response => res.json(response))
    .catch(error => {
      httpErrorHandler(res, error)
    })
}

const deletePatient = ({ params }: Request, res: Response): void => {
  const { id } = params
  deleteOne(id)
    .then(response => res.json(response))
    .catch(error => {
      httpErrorHandler(res, error)
    })
}

export { getPatient, getAllPatients, updatePatient, deletePatient }
