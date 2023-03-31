import { type Response, type Request } from 'express'

import { create, get, getAll, update, deleteOne } from '../services/doctor.service'
import { httpErrorHandler } from '../utils/httpErrorHandler'
import { type Doctor } from './../interfaces/Doctor'

const createDoctor = async (req: Request, res: Response): Promise<void> => {
  try {
    const drData: Doctor = req.body
    const doctorData = { ...drData, role: 'doctor' }
    const doctor = await create(doctorData)
    res.status(201).json({ msg: 'Usuario: Doctor creado correctamente', doctor })
  } catch (error) {
    httpErrorHandler(res, error, 500)
  }
}

const getDoctor = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    const doctor = await get(id)
    res.json(doctor)
  } catch (error) {
    httpErrorHandler(res, error, 500)
  }
}

const getDoctors = async (req: Request, res: Response): Promise<void> => {
  try {
    const doctors = await getAll()
    res.json(doctors)
  } catch (error) {
    httpErrorHandler(res, error, 500)
  }
}

const updateDoctor = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const { firstname, lastname, speciality }: Doctor = req.body
  const doctorData = { firstname, lastname, speciality }
  try {
    await update(id, doctorData)
    res.json({ msg: 'tarea actualizada' })
  } catch (error) {
    httpErrorHandler(res, error, 500)
  }
}

const deleteDoctor = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    await deleteOne(id)
    res.json({ msg: `Doctor: ${id}, removido` })
  } catch (error) {
    httpErrorHandler(res, error, 500)
  }
}

export {
  createDoctor,
  getDoctor,
  getDoctors,
  updateDoctor,
  deleteDoctor
}
