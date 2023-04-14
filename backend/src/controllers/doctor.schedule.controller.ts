import { type Request, type Response } from 'express'

import {
  create,
  deleteOne,
  get,
  getAll,
  update
} from '../services/doctor.schedule.service'
import { httpErrorHandler } from '../utils/httpErrorHandler'

const createSchedule = ({ body }: Request, res: Response): void => {
  const { day, startTime, endTime, interval, doctor } = body
  const scheduleData = {
    day,
    startTime,
    endTime,
    interval,
    doctor
  }
  create(scheduleData)
    .then(scheduleCreated =>
      res
        .status(201)
        .json({ msg: 'Horario medico creado correctamente', scheduleCreated })
    )
    .catch(error => {
      httpErrorHandler(res, error, 500)
    })
}

const getSchedule = ({ params, query }: Request, res: Response): void => {
  const { id } = params
  const { date } = query
  get(id, date as string)
    .then(doctorSchedule => res.json(doctorSchedule))
    .catch(error => {
      httpErrorHandler(res, error, 500)
    })
}

const getAllSchedules = ({ params }: Request, res: Response): void => {
  const { id } = params
  getAll(id)
    .then(doctorSchedules => res.json(doctorSchedules))
    .catch(error => {
      httpErrorHandler(res, error, 500)
    })
}

const updateSchedule = ({ params, body }: Request, res: Response): void => {
  const { id } = params
  const { startTime, endTime, interval, day } = body
  const scheduleData = {
    startTime,
    endTime,
    interval,
    day
  }
  update(id, scheduleData)
    .then(doctorSchedule =>
      res.json({
        msg: 'Horario medico actualizado correctamente',
        doctorSchedule
      })
    )
    .catch(error => {
      httpErrorHandler(res, error, 500)
    })
}

const deleteSchedule = ({ params }: Request, res: Response): void => {
  const { id } = params
  deleteOne(id)
    .then(() => res.json({ msg: `Horario medico: ${id}, removido` }))
    .catch(error => {
      httpErrorHandler(res, error, 500)
    })
}

export {
  createSchedule,
  getSchedule,
  getAllSchedules,
  updateSchedule,
  deleteSchedule
}
