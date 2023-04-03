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
  scheduleData: ScheduleTimeType
): Promise<DoctorSchedule> => {
  try {
    const schedule = await DoctorScheduleModel.findById(id)
    if (schedule === null) throw new Error('Horario del doctor no encontrado')
    schedule.starttime = scheduleData.starttime
    schedule.endtime = scheduleData.endtime
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
