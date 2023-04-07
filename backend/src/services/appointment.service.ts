import { type Appointment } from '../interfaces/Appointment'
import AppointmentModel from '../models/Appointment'
import DoctorScheduleModel from '../models/DoctorSchedule'
import DoctorModel from '../models/Doctors'
import PatientModel from '../models/Patient'
import { AppointmentPaginated } from '../utils/types/appointment.types'

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


/**
 * lista de turnos paginados con id del paciente o medico, filtros por fechas
 * @param id string
 * @param typeId 'medico' | 'paciente'
 * @param fechaInicio string
 * @param fechaFin string
 * @returns Promise <AppointmentPaginated | {msg: string}>
 */
const getAppxPatOrDoc = async (
  id: string,
  typeId: 'medico' | 'paciente',
  fechaInicio: string,
  fechaFin: string,
  page: number = 1
): Promise<AppointmentPaginated | { msg: string }> => {
  const query = {
    ...(typeId === 'medico' ? { medico: id } : { paciente: id }),
    ...(fechaInicio &&
      fechaFin && {
      fecha: {
        $gte: new Date(fechaInicio),
        $lte: new Date(fechaFin)
      }
    })

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

  const ITEMS_PER_PAGE = 2
  const skip = (page - 1) * ITEMS_PER_PAGE // 1 * 20 = 20
  try {
    //check user :  doctor | patient
    const userFound =
      typeId === 'medico'
        ? await DoctorModel.findById(id)
        : await PatientModel.findById(id)
    if (userFound === null)
      return {
        msg: `${typeId === 'medico' ? 'Medico' : 'Paciente'} no encontrado`
      }

    const countAP = AppointmentModel.countDocuments(query)
    const appointments = AppointmentModel.find(query)
      .limit(ITEMS_PER_PAGE)
      .skip(skip)
    const [itemsCount, items] = await Promise.all([countAP, appointments])
    const pageCount = Math.ceil(itemsCount / ITEMS_PER_PAGE)

    if (!items.length)
      return {
        msg: `Turnos del del usuario ${typeId === 'medico' ? 'Medico' : 'Paciente'
          } no encontrado`
      }
    return {
      pagination: {
        itemsCount,
        pageCount
      },
      items
    }
  } catch (error) {
    throw new Error(
      `Error al buscar turnos del usuario ${typeId === 'medico' ? 'Medico' : 'Paciente'
      } - ${error}`
    )
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

export { create, getAll, get, update, deleteOne, getAppxPatOrDoc }
