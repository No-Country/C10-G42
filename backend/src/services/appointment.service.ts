import { type Appointment } from '../interfaces/Appointment'
import AppointmentModel from '../models/Appointment'
import DoctorScheduleModel from '../models/DoctorSchedule'
import DoctorModel from '../models/Doctors'
import PatientModel from '../models/Patient'

const create = async (appointmentData: Appointment): Promise<Appointment> => {
  try {
    const horarios = await DoctorScheduleModel.find({
      doctor: appointmentData.doctor,
      dia: appointmentData.fecha
    })
    if (horarios.length === 0) throw new Error('No hay horarios para el medico')


    const turnoOcupado = await AppointmentModel.findOne({
      medico: appointmentData.doctor,
      fecha: appointmentData.fecha,
      horaInicio: appointmentData.horaInicio
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

const getAP = async (id: string): Promise<Appointment[]> => {
  try {
    const patient = await PatientModel.findById(id)
    if (patient === null) throw new Error('paciente no encontrado')
    const appointments = await AppointmentModel.find({ paciente: id })
    if (appointments.length === 0) throw new Error('turnos del paciente no encontrado')
    return appointments
  } catch (error) {
    throw new Error('Error al buscar turnos del paciente')
  }
}

const getAD = async (id: string): Promise<Appointment[]> => {
  try {
    const doctor = await DoctorModel.findById(id)
    if (doctor === null) throw new Error('doctor no encontrado')
    const appointments = await AppointmentModel.find({ doctor: id })
    if (appointments.length === 0) throw new Error('turnos del doctor no encontrado')
    return appointments
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
  }
}

export { create, getAll, get, update, deleteOne, getAP, getAD }
