import { type Request, type Response } from 'express'

import { type Appointment } from '../interfaces/Appointment'
import {
	create,
	deleteOne,
	get,
	getAll,
	update
} from '../services/appointment.service'
import { httpErrorHandler } from '../utils/httpErrorHandler'

const createAppointment = (req: Request, res: Response): void => {
	const appointmentData: Appointment = req.body
	create(appointmentData)
		.then(appointment => {
			res
				.status(201)
				.json({ msg: 'Usuario: Appointment creado correctamente', appointment })
		})
		.catch((error: any) => {
			httpErrorHandler(res, error, 500)
		})
}

const getAppointment = ({ params }: Request, res: Response): void => {
	const { id } = params
	get(id)
		.then((appointment: Appointment) => {
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
		.then(() => {
			res.json({ msg: 'turno actualizado' })
		})
		.catch((error: any) => {
			httpErrorHandler(res, error, 500)
		})
}

const deleteAppointment = ({ params }: Request, res: Response): void => {
	const { id } = params
	deleteOne(id)
		.then(() => {
			res.json({ msg: `Doctor: ${id}, removido` })
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
	deleteAppointment
}
