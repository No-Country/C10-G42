import { type Request, type Response } from 'express'

import { type Appointment } from '../interfaces/Appointment'
import {
  create,
  deleteOne,
  get,
  getAD,
  getAP,
  getAll,
  update
} from '../services/appointment.service'
import { httpErrorHandler } from '../utils/httpErrorHandler'

const createAppointment = (req: Request, res: Response): void => {
  const { fecha, horaInicio, minutoInicio, duracion, paciente, doctor } = req.body
  const appointmentData: Appointment = {
    fecha,
    horaInicio,
    minutoInicio,
    duracion,
    paciente,
    doctor
  }
  create(appointmentData)
    .then(appointment => {
      res
        .status(201)
        .json(appointment)
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

const getAppointmentsPatient = ({ params }: Request, res: Response): void => {
  const { id } = params
  getAP(id)
    .then(appointments => {
      res.json(appointments)
    })
    .catch(error => {
      httpErrorHandler(res, error, 500)
    })
}

const getAppointmentsDoctor = ({ params }: Request, res: Response): void => {
  const { id } = params
  getAD(id)
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
