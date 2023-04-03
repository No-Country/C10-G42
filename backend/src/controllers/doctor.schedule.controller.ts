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
  const { day, starttime, endtime, doctor } = body
  create({ day, starttime, endtime, doctor })
    .then(scheduleCreated =>
      res
        .status(201)
        .json({ msg: 'Horario medico creado correctamente', scheduleCreated })
    )
    .catch(error => {
      httpErrorHandler(res, error, 500)
    })
}

const getSchedule = ({ params }: Request, res: Response): void => {
  const { id } = params
  get(id)
    .then(doctorSchedule => res.json(doctorSchedule))
    .catch(error => {
      httpErrorHandler(res, error, 500)
    })
}

const getAllSchedules = (req: Request, res: Response): void => {
  getAll()
    .then(doctorSchedules => res.json(doctorSchedules))
    .catch(error => {
      httpErrorHandler(res, error, 500)
    })
}

const updateSchedule = ({ params, body }: Request, res: Response): void => {
  const { id } = params
  const { starttime, endtime } = body
  update(id, { starttime, endtime })
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
