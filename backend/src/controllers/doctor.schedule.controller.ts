import { type DoctorSchedule } from './../interfaces/DoctorSchedule'
import { type Response, type Request } from 'express'

import { httpErrorHandler } from '../utils/httpErrorHandler'
import { create, get, getAll, update, deleteOne } from '../services/doctor.schedule.service'

const createSchedule = (req: Request, res: Response): void => {
  const doctorScheduleData: DoctorSchedule = req.body
  create(doctorScheduleData)
    .then((scheduleCreated) => res.status(201).json({ msg: 'Horario medico creado correctamente', scheduleCreated }))
    .catch((error) => { httpErrorHandler(res, error, 500) })
}

const getSchedule = (req: Request, res: Response): void => {
  const { id } = req.params
  get(id)
    .then((doctorSchedule) => res.json(doctorSchedule))
    .catch((error) => { httpErrorHandler(res, error, 500) })
}

const getAllSchedules = (req: Request, res: Response): void => {
  getAll()
    .then((doctorSchedules) => res.json(doctorSchedules))
    .catch((error) => { httpErrorHandler(res, error, 500) })
}

const updateSchedule = (req: Request, res: Response): void => {
  const { id } = req.params
  // day and doctor aren't duplicate
  const { starttime, endtime }: DoctorSchedule = req.body
  update(id, { starttime, endtime })
    .then((doctorSchedule) => res.json({ msg: 'Horario medico actualizado correctamente', doctorSchedule }))
    .catch((error) => { httpErrorHandler(res, error, 500) })
}

const deleteSchedule = (req: Request, res: Response): void => {
  const { id } = req.params
  deleteOne(id)
    .then(() => res.json({ msg: `Horario medico: ${id}, removido` }))
    .catch((error) => { httpErrorHandler(res, error, 500) })
}

export {
  createSchedule,
  getSchedule,
  getAllSchedules,
  updateSchedule,
  deleteSchedule
}
