import { type Request, type Response } from 'express'

import { type Appointment } from '../interfaces/Appointment'
import {
  create,
  deleteOne,
  get,
  getAll,
  getAppxPatOrDoc,
  update
} from '../services/appointment.service'
import { httpErrorHandler } from '../utils/httpErrorHandler'

const createAppointment = (req: Request, res: Response): void => {
  const appointmentData: Appointment = req.body
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

/**
 * @param req Request<{ReqParams},{ResParams}, {ReqBody}, {ReqQuery}>
 * @param res Response
 */
const getAppointmentsPatient = (
  {
    params,
    query
  }: Request<
    { id: string },
    {},
    {},
    { fechaInicio: string; fechaFin: string; page: number }
  >,
  res: Response
): void => {
  const { id } = params
  const { fechaInicio, fechaFin, page } = query
  getAppxPatOrDoc(
    id,
    'paciente',
    fechaInicio as string,
    fechaFin as string,
    page
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
const getAppointmentsDoctor = (
  {
    params,
    query
  }: Request<
    { id: string },
    {},
    {},
    { fechaInicio: string; fechaFin: string; page: number }
  >,
  res: Response
): void => {
  const { id } = params
  const { fechaInicio, fechaFin, page } = query
  getAppxPatOrDoc(id, 'medico', fechaInicio, fechaFin, page)
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
  updateAppointment,
  deleteAppointment,
  getAppointmentsPatient,
  getAppointmentsDoctor
}
