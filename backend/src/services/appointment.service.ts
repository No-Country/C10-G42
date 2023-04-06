import { type Appointment } from '../interfaces/Appointment'
import AppointmentModel from '../models/Appointment'
import DoctorScheduleModel from '../models/DoctorSchedule'

const create = async (appointmentData: Appointment): Promise<Appointment> => {
  try {
    const horarios = await DoctorScheduleModel.find({
      doctor: appointmentData.medico,
      dia: appointmentData.fecha
    })
    if (horarios.length === 0) throw new Error('No hay horarios para el medico')

    const fechaInicio = new Date(appointmentData.fecha)
    fechaInicio.setHours(
      appointmentData.horaInicio,
      appointmentData.minutoInicio
    )
    const fechaFin = new Date(
      fechaInicio.getTime() + appointmentData.duracion * 60000
    )

    const turnoOcupado = await AppointmentModel.findOne({
      medico: appointmentData.medico,
      fecha: {
        $gte: fechaInicio,
        $lt: fechaFin
      }
    })

    if (turnoOcupado !== null) throw new Error('El turno ya esta ocupado')

    const appointment = await AppointmentModel.create(appointmentData)
    return appointment
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
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

const update = async (
  id: string,
  appointmentData: Appointment
): Promise<Appointment> => {
  try {
    const appointment = await AppointmentModel.findById(id)
    if (appointment === null) throw new Error('Appointment no encontrado')
    appointment.fecha = appointmentData.fecha
    appointment.horaInicio = appointmentData.horaInicio
    appointment.minutoInicio = appointmentData.minutoInicio
    appointment.duracion = appointmentData.duracion
    return await appointment.save()
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
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
