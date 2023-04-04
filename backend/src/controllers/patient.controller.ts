import { type Request, type Response } from 'express'

import {
  create,
  deleteOne,
  get,
  getAll,
  update
} from '../services/patient.service'
import { httpErrorHandler } from '../utils/httpErrorHandler'

const createPatient = ({ body }: Request, res: Response): void => {
  const { patient } = body
  create(patient)
    .then(response => res.json(response))
    .catch(error => {
      httpErrorHandler(res, error)
    })
}

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

const updatePatient = ({ params, body }: Request, res: Response): void => {
  const { id } = params
  const { patient } = body

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

export {
  createPatient,
  getPatient,
  getAllPatients,
  updatePatient,
  deletePatient
}
