import { type DoctorSchedule } from './../interfaces/DoctorSchedule'
import DoctorScheduleModel from '../models/DoctorSchedule'

interface ScheduleTimeType {
  starttime: string
  endtime: string
}

const create = async (doctorScheduleData: DoctorSchedule): Promise<DoctorSchedule> => {
  try {
    const doctorScheduleCreated = await DoctorScheduleModel.create(doctorScheduleData)
    return doctorScheduleCreated
  } catch (error) {
    throw new Error('Schedule not created')
  }
}

const get = async (id: string): Promise<DoctorSchedule> => {
  try {
    const foundSchedule = await DoctorScheduleModel.findById(id)

    if (foundSchedule != null) return foundSchedule
    else throw new Error('Schedule not found')
  } catch (error) {
    throw new Error('Schedule not found')
  }
}

const getAll = async (): Promise<DoctorSchedule[]> => {
  try {
    const allSchedules = await DoctorScheduleModel.find()
    if (allSchedules != null) return allSchedules
    else throw new Error('Schedules not found')
  } catch (error) {
    throw new Error('Schedules not found')
  }
}

const update = async (id: string, scheduleData: ScheduleTimeType): Promise<DoctorSchedule> => {
  try {
    const foundSchedule = await DoctorScheduleModel.findById(id)
    if (foundSchedule != null) {
      foundSchedule.starttime = scheduleData.starttime
      foundSchedule.endtime = scheduleData.endtime
      const saveSchedule = await foundSchedule.save()
      return saveSchedule
    } else {
      throw new Error('Schedule not found')
    }
  } catch (error) {
    throw new Error('Schedule not found')
  }
}

const deleteOne = async (id: string): Promise<void> => {
  try {
    const foundSchedule = await DoctorScheduleModel.findById(id)
    if (foundSchedule != null) {
      await foundSchedule.deleteOne()
    } else {
      throw new Error('Schedule not found')
    }
  } catch (error) {
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
