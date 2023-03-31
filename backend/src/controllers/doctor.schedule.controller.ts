import { type DoctorSchedule } from './../interfaces/DoctorSchedule'
import { type Response, type Request } from 'express'

import { httpErrorHandler } from '../utils/httpErrorHandler'
import { create, get, getAll, update, deleteOne } from '../services/doctor.schedule.service'

const createSchedule = async (req: Request, res: Response): Promise<void> => {
  try {
    const doctorScheduleData: DoctorSchedule = req.body
    const scheduleCreated = await create(doctorScheduleData)
    res.status(201).json({ msg: 'Horario medico creado correctamente', scheduleCreated })
  } catch (error) {
    httpErrorHandler(res, error, 500)
  }
}

const getSchedule = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    const doctorSchedule = await get(id)
    res.json(doctorSchedule)
  } catch (error) {
    httpErrorHandler(res, error, 500)
  }
}

const getAllSchedules = async (req: Request, res: Response): Promise<void> => {
  try {
    const allSchedules = await getAll()
    res.json(allSchedules)
  } catch (error) {
    httpErrorHandler(res, error, 500)
  }
}

const updateSchedule = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  // day and doctor aren't duplicate
  const { starttime, endtime }: DoctorSchedule = req.body
  try {
    await update(id, { starttime, endtime })
    res.json({ msg: 'Horario actualizado' })
  } catch (error) {
    httpErrorHandler(res, error, 500)
  }
}

const deleteSchedule = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    await deleteOne(id)
    res.json({ msg: 'horario removido' })
  } catch (error) {
    httpErrorHandler(res, error, 500)
  }
}

export {
  createSchedule,
  getSchedule,
  getAllSchedules,
  updateSchedule,
  deleteSchedule
}
