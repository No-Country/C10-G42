import { type Appointment } from '../interfaces/Appointment'
import AppointmentModel from '../models/Appointment'

const create = async (appointmentData: Appointment): Promise<Appointment> => {
	try {
		const appointment = await AppointmentModel.create(appointmentData)
		return appointment
	} catch (error) {
		throw new Error('Error al crear appointment')
	}
}

const get = async (id: string): Promise<Appointment> => {
	try {
		const appointment = await AppointmentModel.findById(id)
		if (appointment === null) throw new Error('turno no encontrado')
		return appointment
	} catch (error) {
		throw new Error('Error al obtener Appointment')
	}
}

const getAll = async (): Promise<Appointment[]> => {
	try {
		const appointments = await AppointmentModel.find()
		return appointments
	} catch (error) {
		throw new Error('Error al obtener turnos')
	}
}

const update = async (id: string, appointmentData: Appointment): Promise<Appointment> => {
	try {
		const appointment = await AppointmentModel.findById(id)
		if (appointment === null) throw new Error('Appointment no encontrado')
		appointment.fecha = appointmentData.fecha
		appointment.horaInicio = appointmentData.horaInicio
		appointment.minutoInicio = appointmentData.minutoInicio
		appointment.duracion = appointmentData.duracion
		return await appointment.save()
	} catch (error) {
		throw new Error(`Error al actualizar turno ${error}`)
	}
}

const deleteOne = async (id: string): Promise<Appointment> => {
	try {
		const appointment = await AppointmentModel.findById(id)
		if (appointment === null) throw new Error('turno no encontrado')
		return await appointment?.deleteOne()
	} catch (error) {
		throw new Error('Error al eliminar turno')
	}
}

export { create, getAll, get, update, deleteOne }
