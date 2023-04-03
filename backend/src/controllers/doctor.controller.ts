import { type Request, type Response } from 'express'
import { httpErrorHandler } from '../utils/httpErrorHandler'
import { type Doctor } from './../interfaces/Doctor'
import { doctorService } from '../services/doctor.service'

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
