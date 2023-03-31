import { type Response, type Request } from 'express'

import { doctorService } from '../services/doctor.service'
import { httpErrorHandler } from '../utils/httpErrorHandler'
import { type Doctor } from './../interfaces/Doctor'

const doctorController = {
  createDoctor: async (req: Request, res: Response) => {
    try {
      const doctorData: Doctor = req.body
      const doctor = await doctorService.create(doctorData)
      res.status(201).json({ msg: 'Usuario: Doctor creado correctamente', doctor })
    } catch (error) {
      httpErrorHandler(res, error, 500)
    }
  },
  getDoctor: async (req: Request, res: Response) => {
    const { id } = req.params
    const doctor = await doctorService.get(id)
    res.json(doctor)
  },
  getDoctors: async (req: Request, res: Response) => {
    const doctors = await doctorService.getAll()
    res.json(doctors)
  },
  updateDoctor: async (req: Request, res: Response) => {
    const { id } = req.params
    const { fullname, especialty }: Doctor = req.body
    try {
      await doctorService.update(id, { fullname, especialty })
      res.json({ msg: 'tarea actualizada' })
    } catch (error) {
      httpErrorHandler(res, error, 500)
    }
  },
  deleteDoctor: async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      await doctorService.delete(id)
      res.json({ msg: `Doctor: ${id}, removido` })
    } catch (error) {
      httpErrorHandler(res, error, 500)
    }
  }

}

export {
  doctorController
}
