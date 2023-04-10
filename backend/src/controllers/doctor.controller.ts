import { type Request, type Response } from 'express'

import { deleteOne, get, getAll, getRandom, update } from '../services/doctor.service'
import { httpErrorHandler } from '../utils/httpErrorHandler'
import { type Doctor } from './../interfaces/Doctor'
import { param } from 'express-validator'

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

const getAllDoctors = (
  {
    query
  }: Request<
    unknown,
    unknown,
    unknown,
    { page: number, speciality: string }
  >,
  res: Response
): void => {
  const { page, speciality } = query
  getAll(page, speciality)
    .then(doctors => res.json(doctors))
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

const getRandomDoctors = ({ params }: Request, res: Response): void => {
  const { limit } = params
  getRandom(limit)
    .then((doctors) => {
      res.json(doctors)
    })
    .catch(error => {
      httpErrorHandler(res, error, 500)
    })
}

export { getDoctor, getAllDoctors, updateDoctor, deleteDoctor, getRandomDoctors }
