import { type Request, type Response } from 'express'

import {
  create,
  deleteOne,
  get,
  getAll,
  update
} from '../services/doctor.service'
import { httpErrorHandler } from '../utils/httpErrorHandler'
import { type Doctor } from './../interfaces/Doctor'

const createDoctor = (req: Request, res: Response): void => {
  const doctorData: Doctor = req.body
  create(doctorData)
    .then(doctor => {
      res
        .status(201)
        .json({ msg: 'Usuario: Doctor creado correctamente', doctor })
    })
    .catch(error => {
      httpErrorHandler(res, error, 500)
    })
}

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

const getAllDoctors = (req: Request, res: Response): void => {
  getAll()
    .then(doctors => res.json(doctors))
    .catch(error => {
      httpErrorHandler(res, error, 500)
    })
}

const updateDoctor = ({ params, body }: Request, res: Response): void => {
  const { id } = params
  const doctorData: Doctor = body
  update(id, doctorData)
    .then(() => {
      res.json({ msg: 'tarea actualizada' })
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

export { createDoctor, getDoctor, getAllDoctors, updateDoctor, deleteDoctor }
