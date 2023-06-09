import { type Request, type Response } from 'express'

import {
  deleteOne,
  get,
  getAll,
  getAllPaginated,
  getRandom,
  getSpDocArray,
  getSpecialties,
  update
} from '../services/doctor.service'
import { httpErrorHandler } from '../utils/httpErrorHandler'
import { type Doctor } from './../interfaces/Doctor'

const getDoctor = ({ params }: Request, res: Response): void => {
  const { id } = params
  get(id)
    .then(doctor => {
      res.json(doctor)
    })
    .catch(error => {
      httpErrorHandler(res, error, 500)
    })
}

const getAllDoctors = ({ query }: Request, res: Response): void => {
  const { specialty } = query
  getAll(specialty as string)
    .then(doctors => {
      res.json(doctors)
    })
    .catch(error => {
      httpErrorHandler(res, error, 500)
    })
}

const getAllDoctorsPaginated = (
  {
    query
  }: Request<unknown, unknown, unknown, { page: number; specialty: string }>,
  res: Response
): void => {
  const { page, specialty } = query
  getAllPaginated(page, specialty)
    .then(doctors => res.json(doctors))
    .catch(error => {
      httpErrorHandler(res, error, 500)
    })
}

const getRandomDoctors = ({ params }: Request, res: Response): void => {
  const { limit } = params
  getRandom(limit)
    .then(doctors => {
      res.json(doctors)
    })
    .catch(error => {
      httpErrorHandler(res, error, 500)
    })
}

const getSpecialty = (req: Request, res: Response): void => {
  getSpecialties()
    .then(doctors => {
      res.json(doctors)
    })
    .catch(error => {
      httpErrorHandler(res, error, 500)
    })
}

const getSpecialtyDoctorArray = (req: Request, res: Response): void => {
  const { specialty } = req.params
  getSpDocArray(specialty)
    .then(doctors => {
      res.json(doctors)
    })
    .catch(error => {
      httpErrorHandler(res, error, 500)
    })
}

const updateDoctor = ({ params, body }: Request, res: Response): void => {
  const { id } = params
  const doctorData: Doctor = body
  update(id, doctorData)
    .then(doctor => {
      res.json(doctor)
    })
    .catch(error => {
      httpErrorHandler(res, error, 500)
    })
}

const deleteDoctor = ({ params }: Request, res: Response): void => {
  const { id } = params
  deleteOne(id)
    .then(() => {
      res.json({ msg: `Doctor: ${id}, removido` })
    })
    .catch(error => {
      httpErrorHandler(res, error, 500)
    })
}

export {
  getDoctor,
  getAllDoctors,
  getAllDoctorsPaginated,
  updateDoctor,
  deleteDoctor,
  getRandomDoctors,
  getSpecialty,
  getSpecialtyDoctorArray
}
