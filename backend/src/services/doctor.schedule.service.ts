import { type DoctorSchedule } from './../interfaces/DoctorSchedule'
import DoctorScheduleModel from '../models/DoctorSchedule'

interface ScheduleTimeType {
  starttime: string
  endtime: string
}

const create = async (doctorScheduleData: DoctorSchedule): Promise<DoctorSchedule> => {
  const doctorScheduleCreated = await DoctorScheduleModel.create(doctorScheduleData)
  return doctorScheduleCreated
}

const get = async (id: string): Promise<DoctorSchedule> => {
  const foundSchedule = await DoctorScheduleModel.findById(id)

  if (foundSchedule != null) return foundSchedule
  else throw new Error('Schedule not found')
}

const getAll = async (): Promise<DoctorSchedule[]> => {
  const allSchedules = await DoctorScheduleModel.find()
  if (allSchedules != null) return allSchedules
  else throw new Error('Schedules not found')
}

const update = async (id: string, scheduleData: ScheduleTimeType): Promise<DoctorSchedule> => {
  const foundSchedule = await DoctorScheduleModel.findById(id)
  if (foundSchedule != null) {
    foundSchedule.starttime = scheduleData.starttime
    foundSchedule.endtime = scheduleData.endtime
    const saveSchedule = await foundSchedule.save()
    return saveSchedule
  } else {
    throw new Error('Schedule not found')
  }
}

const deleteOne = async (id: string): Promise<void> => {
  const foundSchedule = await DoctorScheduleModel.findById(id)
  if (foundSchedule != null) {
    await foundSchedule.deleteOne()
  } else {
    throw new Error('Schedule not found')
  }
}

export {
  create,
  get,
  getAll,
  update,
  deleteOne
}
