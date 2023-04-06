import { type Request, type Response } from 'express'

import {
  create,
  deleteOne,
  get,
  getAll,
  getArray,
  update
} from '../services/doctor.schedule.service'
import { httpErrorHandler } from '../utils/httpErrorHandler'

const createSchedule = ({ body }: Request, res: Response): void => {
  const { dia, entrada, salida, intervalo, doctor } = body
  create({ dia, entrada, salida, intervalo, doctor })
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

const getAvailable = ({ params, body }: Request, res: Response): void => {
  const { doctor, fecha } = body
  getArray(doctor, fecha)
    .then(appAvailable => res.json(appAvailable))
    .catch(error => { httpErrorHandler(res, error, 500) })
}

const updateSchedule = ({ params, body }: Request, res: Response): void => {
  const { id } = params
  const { entrada, salida, intervalo, dia } = body
  const scheduleData = {
    entrada,
    salida,
    intervalo,
    dia
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
  getAvailable,
  updateSchedule,
  deleteSchedule
}
