import { type Request, type Response } from 'express'

import { doctorScheduleService } from '../services/doctor.schedule.service'
import { httpErrorHandler } from '../utils/httpErrorHandler'
import { type DoctorSchedule } from './../interfaces/DoctorSchedule'

const doctorScheduleCtrl = {
  create: (req: Request, res: Response): void => {
    const doctorScheduleData: DoctorSchedule = req.body
    doctorScheduleService
      .create(doctorScheduleData)
      .then(scheduleCreated => {
        res
          .status(201)
          .json({ msg: 'Horario medico creado correctamente', scheduleCreated })
      })
      .catch(error => {
        httpErrorHandler(res, error, 500)
      })
  },
  get: (req: Request, res: Response): void => {
    const { id } = req.params
    doctorScheduleService
      .get(id)
      .then(doctorSchedule => {
        res.json(doctorSchedule)
      })
      .catch(error => {
        httpErrorHandler(res, error, 500)
      })
  },
  getAll: (req: Request, res: Response): void => {
    doctorScheduleService
      .getAll()
      .then(allSchedules => {
        res.json(allSchedules)
      })
      .catch(error => {
        httpErrorHandler(res, error, 500)
      })
  },
  update: (req: Request, res: Response): void => {
    const { id } = req.params
    const { starttime, endtime }: DoctorSchedule = req.body
    doctorScheduleService
      .update(id, { starttime, endtime })
      .then(() => {
        res.json({ msg: 'Horario actualizado' })
      })
      .catch(error => {
        httpErrorHandler(res, error, 500)
      })
  },
  delete: (req: Request, res: Response): void => {
    const { id } = req.params
    doctorScheduleService
      .delete(id)
      .then(() => {
        res.json({ msg: 'horario removido' })
      })
      .catch(error => {
        httpErrorHandler(res, error, 500)
      })
  }
}

export { doctorScheduleCtrl }
