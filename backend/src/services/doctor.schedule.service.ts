import { type DoctorSchedule } from './../interfaces/DoctorSchedule'
import DoctorScheduleModel from '../models/DoctorSchedule'

interface ScheduleTimeType {
  starttime: string
  endtime: string
}

const doctorScheduleService = {
  create: async (doctorScheduleData: DoctorSchedule) => {
    const doctorScheduleCreated = await DoctorScheduleModel.create(doctorScheduleData)
    return doctorScheduleCreated
  },
  get: async (id: string) => {
    const foundSchedule = await DoctorScheduleModel.find({ doctor: id })

    if (foundSchedule) return foundSchedule
  },
  getAll: async () => {
    const allSchedules = await DoctorScheduleModel.find()
    if (allSchedules) return allSchedules
  },
  update: async (id: string, scheduleData: ScheduleTimeType) => {
    const foundSchedule = await DoctorScheduleModel.findById(id)
    if (foundSchedule != null) {
      foundSchedule.starttime = scheduleData.starttime
      foundSchedule.endtime = scheduleData.endtime
      const saveSchedule = await foundSchedule.save()
      return saveSchedule
    }
  },
  delete: async (id: string) => {
    const foundSchedule = await DoctorScheduleModel.findById(id)
    if (foundSchedule != null) {
      await foundSchedule.deleteOne()
    }
  }
}

export {
  doctorScheduleService
}
