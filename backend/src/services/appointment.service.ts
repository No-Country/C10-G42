import ISODate from 'mongoose'

import { type Appointment } from '../interfaces/Appointment'
import AppointmentModel from '../models/Appointment'
import DoctorModel from '../models/Doctors'
import PatientModel from '../models/Patient'

const create = async (appointmentData: Appointment): Promise<Appointment> => {
  try {
    const appointment = await AppointmentModel.create(appointmentData)
    return appointment
  } catch (error) {
    throw new Error(`Error al crear appointment ${error}`)
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

/**
 * lista de turnos id del paciente, filtros por fecha
 * @param id 
 * @param fechaInicio 
 * @param fechaFin 
 * @returns []Appointment || {msg: string}
 */
const getAP = async (id: string, fechaInicio: string, fechaFin: string) => {
  try {
    const patient = await PatientModel.findById(id)
    if (patient === null) return { msg: 'paciente no encontrado' }
    let appointments
    if (fechaInicio && fechaFin) {
      appointments = await AppointmentModel.find({
        paciente: id,
        fecha: {
          $gte: new Date(fechaInicio),
          $lte: new Date(fechaFin)
        }
      })
      return appointments
    }
    appointments = await AppointmentModel.find({
      paciente: id
    })
    if (!appointments.length)
      return { msg: 'turnos del paciente no encontrado' }
    return appointments
  } catch (error) {
    throw new Error('Error al buscar turnos del paciente')
  }
}

/**
 * lista de turnos por id del doctor, filtros por fecha
 * @param id 
 * @param fechaInicio 
 * @param fechaFin 
 * @returns []Appointment || {msg: string}
 */
const getAD = async (id: string, fechaInicio?: string, fechaFin?: string) => {
  try {
    const doctor = await DoctorModel.findById(id)
    if (doctor === null) return { msg: 'doctor no encontrado' }
    let appointments
    if (fechaInicio && fechaFin) {
      appointments = await AppointmentModel.find({
        medico: id,
        fecha: {
          $gte: new Date(fechaInicio),
          $lte: new Date(fechaFin)
        }
      })
      return appointments
    }
    appointments = await AppointmentModel.find({
      medico: id
    })
    if (!appointments.length) return { msg: 'turnos del doctor no encontrado' }
    return appointments
  } catch (error) {
    throw new Error('Error al buscar turnos del doctor')
  }
}


export { create, getAll, get, update, deleteOne, getAP, getAD }
