import { type Request, type Response } from 'express'
<<<<<<< HEAD

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
=======
import { httpErrorHandler } from '../utils/httpErrorHandler'
import { create, getAll, get, update, deleteOne } from '../services/patient.service'

const createPatient = ({ body }: Request, res: Response): void => {
  const { patient } = body
  create(patient)
    .then((response) => res.json(response))
    .catch((error) => { httpErrorHandler(res, error) })
}

const getPatient = ({ params }: Request, res: Response): void => {
  const { id } = params
  get(id)
    .then((response) => res.json(response))
    .catch((error) => { httpErrorHandler(res, error) })
}

const getAllPatients = (req: Request, res: Response): void => {
  getAll()
    .then((response) => res.json(response))
    .catch((error) => { httpErrorHandler(res, error) })
}

const updatePatient = ({ params, body }: Request, res: Response): void => {
  const { id } = params
  const { patient } = body

  update(id, patient)
    .then((response) => res.json(response))
    .catch((error) => { httpErrorHandler(res, error) })
}

const deletePatient = ({ params }: Request, res: Response): void => {
  const { id } = params
  deleteOne(id)
    .then((response) => res.json(response))
    .catch((error) => { httpErrorHandler(res, error) })
}

export {
  createPatient,
  getPatient,
  getAllPatients,
  updatePatient,
  deletePatient
}
>>>>>>> f4843ea4d6092826ac4aed44ab822d554b120281
