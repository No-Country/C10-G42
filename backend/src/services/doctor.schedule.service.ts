import DoctorScheduleModel from '../models/DoctorSchedule'
import { type DoctorSchedule } from './../interfaces/DoctorSchedule'

const create = async (
  doctorScheduleData: DoctorSchedule
): Promise<DoctorSchedule> => {
  try {
    const doctorScheduleCreated = await DoctorScheduleModel.create(
      doctorScheduleData
    )
    return doctorScheduleCreated
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
  }
}

const get = async (id: string): Promise<DoctorSchedule> => {
  try {
    const schedule = await DoctorScheduleModel.findById(id)
    if (schedule === null) throw new Error('Horario del doctor no encontrado')
    return schedule
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
  }
}

const getAll = async (): Promise<DoctorSchedule[]> => {
  try {
    const allSchedules = await DoctorScheduleModel.find()
    return allSchedules
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
  }
}

const update = async (
  id: string,
  scheduleData: any
): Promise<DoctorSchedule> => {
  try {
    const schedule = await DoctorScheduleModel.findById(id)
    if (schedule === null) throw new Error('Horario del doctor no encontrado')
    schedule.entrada = scheduleData.entrada
    schedule.salida = scheduleData.salida
    schedule.intervalo = scheduleData.intervalo
    return await schedule.save()
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
  }
}

const deleteOne = async (id: string): Promise<DoctorSchedule> => {
  try {
    const schedule = await DoctorScheduleModel.findById(id)
    if (schedule === null) throw new Error('Horario del doctor no encontrado')
    return await schedule?.deleteOne()
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
  }
}

export { create, getAll, get, update, deleteOne }
