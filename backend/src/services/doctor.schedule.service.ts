import DoctorScheduleModel from '../models/DoctorSchedule'
import { type DoctorSchedule } from './../interfaces/DoctorSchedule'

interface ScheduleTimeType {
  starttime: string
  endtime: string
}

const create = async (
  doctorScheduleData: DoctorSchedule
): Promise<DoctorSchedule> => {
  try {
    const doctorScheduleCreated = await DoctorScheduleModel.create(
      doctorScheduleData
    )
    return doctorScheduleCreated
  } catch (error) {
    throw new Error('Error al crear horario del doctor')
  }
}

const get = async (id: string): Promise<DoctorSchedule> => {
  try {
    const schedule = await DoctorScheduleModel.findById(id)
    if (schedule === null) throw new Error('Horario del doctor no encontrado')
    return schedule
  } catch (error) {
    throw new Error('Error al obtener horario del doctor')
  }
}

const getAll = async (): Promise<DoctorSchedule[]> => {
  try {
    const allSchedules = await DoctorScheduleModel.find()
    return allSchedules
  } catch (error) {
    throw new Error('Error al obtener horarios de los doctores')
  }
}

const update = async (
  id: string,
  scheduleData: ScheduleTimeType
): Promise<DoctorSchedule> => {
  try {
    const schedule = await DoctorScheduleModel.findById(id)
    if (schedule === null) throw new Error('Horario del doctor no encontrado')
    schedule.starttime = scheduleData.starttime
    schedule.endtime = scheduleData.endtime
    return await schedule.save()
  } catch (error) {
    throw new Error('Error al actualizar horario del doctor')
  }
}

const deleteOne = async (id: string): Promise<DoctorSchedule> => {
  try {
    const schedule = await DoctorScheduleModel.findById(id)
    if (schedule === null) throw new Error('Horario del doctor no encontrado')
    return await schedule?.deleteOne()
  } catch (error) {
    throw new Error('Error al eliminar horario del doctor')
  }
}

export { create, getAll, get, update, deleteOne }
