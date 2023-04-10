import { type Appointment } from '../interfaces/Appointment'
import AppointmentModel from '../models/Appointment'
import DoctorScheduleModel from '../models/DoctorSchedule'
import DoctorModel from '../models/Doctors'
import PatientModel from '../models/Patient'
import { getAvailableAppointments } from '../utils/handleSchedule'

const create = async (appointmentData: Appointment): Promise<Appointment> => {
  try {
    const horarios = await DoctorScheduleModel.find({
      doctor: appointmentData.doctor,
      dia: new Date(appointmentData.fecha)
    })
    if (horarios.length === 0) throw new Error('No hay horarios para el medico')

    const turnoOcupado = await AppointmentModel.findOne({
      medico: appointmentData.doctor,
      fecha: new Date(appointmentData.fecha),
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

const getArray = async (id: string, fecha: string): Promise<any[]> => {
  try {
    const schedule = await DoctorScheduleModel.findOne({
      doctor: id,
      dia: new Date(fecha)
    })
    if (schedule === null) throw new Error('No hay turnos disponibles')
    const appointments = await AppointmentModel.find({
      doctor: id,
      dia: new Date(fecha)
    })
    const available = getAvailableAppointments(schedule, appointments)
    return available
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
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

const getAppxPatOrDoc = async (
  id: string,
  typeId: 'doctor' | 'paciente',
  fechaInicio: string,
  fechaFin: string,
  page: number = 1
): Promise<any> => {
  const query = {
    ...(typeId === 'doctor' ? { doctor: id } : { paciente: id }),
    ...(fechaInicio != null &&
      fechaFin != null && {
        fecha: {
          $gte: new Date(fechaInicio),
          $lte: new Date(fechaFin)
        }
      })
  }

  const ITEMS_PER_PAGE = 2
  const skip = (page - 1) * ITEMS_PER_PAGE // 1 * 20 = 20
  try {
    // check user :  doctor | patient
    const userFound =
      typeId === 'doctor'
        ? await DoctorModel.findById(id)
        : await PatientModel.findById(id)
    if (userFound === null)
      return {
        msg: `${typeId === 'doctor' ? 'Doctor' : 'Paciente'} no encontrado`
      }

    const countAP = AppointmentModel.countDocuments(query)
    const appointments = AppointmentModel.find(query)
      .limit(ITEMS_PER_PAGE)
      .skip(skip)
    const [itemsCount, items] = await Promise.all([countAP, appointments])
    const pagesCount = Math.ceil(itemsCount / ITEMS_PER_PAGE)

    if (items.length === 0)
      return {
        msg: `Turnos del del usuario ${
          typeId === 'doctor' ? 'Doctor' : 'Paciente'
        } no encontrado`
      }

    return {
      pagination: {
        itemsCount,
        pagesCount
      },
      items
    }
  } catch (e) {
    const error: string = `Error al buscar turnos del usuario ${
      typeId === 'doctor' ? 'Doctor' : 'Paciente'
    } - ${e as string}`
    throw new Error(error)
  }
}

export { create, getAll, get, update, deleteOne, getAppxPatOrDoc, getArray }
