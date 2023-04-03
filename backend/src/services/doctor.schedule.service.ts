import DoctorScheduleModel from '../models/DoctorSchedule'
import { type DoctorSchedule } from './../interfaces/DoctorSchedule'

interface ScheduleTimeType {
  starttime: string
  endtime: string
}

const doctorScheduleService = {
  create: async (doctorScheduleData: DoctorSchedule) => {
    const doctorScheduleCreated = await DoctorScheduleModel.create(
      doctorScheduleData
    )
    return doctorScheduleCreated
  },
  get: async (id: string) => {
    const schedule = await DoctorScheduleModel.find({ doctor: id })

    if (schedule != null) return schedule
  },
  getAll: async () => {
    const allSchedules = await DoctorScheduleModel.find()
    if (allSchedules != null) return allSchedules
  },
  update: async (id: string, scheduleData: ScheduleTimeType) => {
    const schedule = await DoctorScheduleModel.findById(id)
    if (schedule != null) {
      schedule.starttime = scheduleData.starttime
      schedule.endtime = scheduleData.endtime
      return await schedule.save()
    }
  },
  delete: async (id: string) => {
    const schedule = await DoctorScheduleModel.findById(id)
    return await schedule?.deleteOne()
  }
}

export { doctorScheduleService }
