import DoctorScheduleModel from '../models/DoctorSchedule'
import { type DoctorSchedule } from './../interfaces/DoctorSchedule'

const create = async (
  doctorScheduleData: DoctorSchedule
): Promise<DoctorSchedule> => {
  try {
    const doctorSchedule = await DoctorScheduleModel.find({
      doctor: doctorScheduleData.doctor,
      day: new Date(doctorScheduleData.day)
    })
    if (doctorSchedule.length > 0)
      throw new Error('Ya existe un horario para este dia')
    const newSchedule = {
      ...doctorScheduleData,
      day: new Date(doctorScheduleData.day)
    }
    const doctorScheduleCreated = await DoctorScheduleModel.create(newSchedule)
    return doctorScheduleCreated
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
  }
}

const get = async (id: string, date: string): Promise<DoctorSchedule> => {
  try {
    const schedule = await DoctorScheduleModel.findOne({
      doctor: id,
      day: new Date(date)
    })
    if (schedule === null) throw new Error('Horario del doctor no encontrado')
    return schedule
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
  }
}

const getAll = async (id: string): Promise<DoctorSchedule[]> => {
  try {
    const allSchedules = await DoctorScheduleModel.find({ doctor: id })
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
    schedule.start_time = scheduleData.start_time
    schedule.end_time = scheduleData.end_time
    schedule.interval = scheduleData.interval
    schedule.day = scheduleData.day
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
