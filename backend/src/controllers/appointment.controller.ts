import { type Request, type Response } from 'express'

import { type Appointment } from '../interfaces/Appointment'
import {
  create,
  deleteOne,
  get,
  getAll,
  getAppxPatOrDoc,
  getArray,
  update
} from '../services/appointment.service'
import { httpErrorHandler } from '../utils/httpErrorHandler'

const createAppointment = (req: Request, res: Response): void => {
  const { date, start_time, duration, patient, doctor } = req.body
  const appointmentData: Appointment = {
    date,
    start_time,
    duration,
    patient,
    doctor
  }
  create(appointmentData)
    .then(appointment => {
      res.status(201).json(appointment)
    })
    .catch((error: any) => {
      httpErrorHandler(res, error, 500)
    })
}

const getAppointment = ({ params }: Request, res: Response): void => {
  const { id } = params
  get(id)
    .then(appointment => {
      res.json(appointment)
    })
    .catch((error: any) => {
      httpErrorHandler(res, error, 500)
    })
}

const getAllAppointments = (req: Request, res: Response): void => {
  getAll()
    .then(appointments => res.json(appointments))
    .catch(error => {
      httpErrorHandler(res, error, 500)
    })
}

const getAvailable = ({ query, params }: Request, res: Response): void => {
  const { idDoctor } = params
  const { date } = query
  getArray(idDoctor, date as string)
    .then(appAvailable => res.json(appAvailable))
    .catch(error => {
      httpErrorHandler(res, error, 500)
    })
}

const updateAppointment = ({ params, body }: Request, res: Response): void => {
  const { id } = params
  const appointmentData: Appointment = body
  update(id, appointmentData)
    .then(appointment => {
      res.json({ msg: 'Turno actualizado', appointment })
    })
    .catch((error: any) => {
      httpErrorHandler(res, error, 500)
    })
}

const deleteAppointment = ({ params }: Request, res: Response): void => {
  const { id } = params
  deleteOne(id)
    .then(appointment => {
      res.json({ msg: `Turno: ${id}, removido`, appointment })
    })
    .catch(error => {
      httpErrorHandler(res, error, 500)
    })
}

const getAppointmentsPatient = (
  { params, query }: Request,
  res: Response
): void => {
  const { id } = params
  const { fechaInicio, fechaFin, page } = query

  getAppxPatOrDoc(
    id,
    'paciente',
    fechaInicio as string,
    fechaFin as string,
    Number(page)
  )
    .then(appointments => {
      res.json(appointments)
    })
    .catch(error => {
      httpErrorHandler(res, error, 500)
    })
}

/**
 * @param req Request<{ReqParams},{ResParams}, {ReqBody}, {ReqQuery}>
 * @param res Response
 */
const getAppointmentsDoctor = (req: Request, res: Response): void => {
  const { id } = req.params
  const { fechaInicio, fechaFin, page } = req.query

  getAppxPatOrDoc(
    id,
    'doctor',
    fechaInicio as string,
    fechaFin as string,
    Number(page)
  )
    .then(appointments => {
      res.json(appointments)
    })
    .catch(error => {
      httpErrorHandler(res, error, 500)
    })
}

export {
  createAppointment,
  getAppointment,
  getAllAppointments,
  getAvailable,
  updateAppointment,
  deleteAppointment,
  getAppointmentsPatient,
  getAppointmentsDoctor
}
