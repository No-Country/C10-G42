import { type Request, type Response } from 'express'

import { create, get, getAll, update, deleteOne } from '../services/doctor.service'
import { httpErrorHandler } from '../utils/httpErrorHandler'
import { type Doctor } from './../interfaces/Doctor'

<<<<<<< HEAD
const doctorCtrl = {
  create: (req: Request, res: Response) => {
    const doctorData: Doctor = req.body
    doctorService
      .create(doctorData)
      .then(doctor => {
        res
          .status(201)
          .json({ msg: 'Usuario: Doctor creado correctamente', doctor })
      })
      .catch(error => {
        httpErrorHandler(res, error, 500)
      })
  },
  get: (req: Request, res: Response) => {
    const { id } = req.params
    doctorService
      .get(id)
      .then(doctor => {
        res.json(doctor)
      })
      .catch(error => {
        httpErrorHandler(res, error, 500)
      })
  },
  getAll: (_req: Request, res: Response): void => {
    doctorService
      .getAll()
      .then(doctors => res.json(doctors))
      .catch(error => {
        httpErrorHandler(res, error, 500)
      })
  },
  update: (req: Request, res: Response): void => {
    const { id } = req.params
    const doctorData: Doctor = req.body
    doctorService
      .update(id, doctorData)
      .then(() => {
        res.json({ msg: 'tarea actualizada' })
      })
      .catch(error => {
        httpErrorHandler(res, error, 500)
      })
  },
  delete: (req: Request, res: Response): void => {
    const { id } = req.params
    doctorService
      .delete(id)
      .then(() => {
        res.json({ msg: `Doctor: ${id}, removido` })
      })
      .catch(error => {
        httpErrorHandler(res, error, 500)
      })
  }
}

export { doctorCtrl }
=======
const createDoctor = ({ body }: Request, res: Response): void => {
  const drData: Doctor = body
  const doctorData = { ...drData, role: 'doctor' }
  create(doctorData)
    .then((doctor) => res.status(201).json({ msg: 'Usuario Doctor creado correctamente', doctor }))
    .catch((error) => { httpErrorHandler(res, error, 500) })
}

const getDoctor = (req: Request, res: Response): void => {
  const { id } = req.params
  get(id)
    .then((doctor) => res.json(doctor))
    .catch((error) => { httpErrorHandler(res, error, 500) })
}

const getDoctors = (req: Request, res: Response): void => {
  getAll()
    .then((doctors) => res.json(doctors))
    .catch((error) => { httpErrorHandler(res, error, 500) })
}

const updateDoctor = ({ params, body }: Request, res: Response): void => {
  const { id } = params
  const { firstname, lastname, speciality }: Doctor = body
  const doctorData = { firstname, lastname, speciality }
  update(id, doctorData)
    .then((doctor) => res.json({ msg: 'Doctor actualizado correctamente', doctor }))
    .catch((error) => { httpErrorHandler(res, error, 500) })
}

const deleteDoctor = ({ params }: Request, res: Response): void => {
  const { id } = params
  deleteOne(id)
    .then(() => res.json({ msg: `Doctor: ${id}, removido` }))
    .catch((error) => { httpErrorHandler(res, error, 500) })
}

export {
  createDoctor,
  getDoctor,
  getDoctors,
  updateDoctor,
  deleteDoctor
}
>>>>>>> f4843ea4d6092826ac4aed44ab822d554b120281
