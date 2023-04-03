import { type Doctor } from '../interfaces/Doctor'
import DoctorModel from '../models/Doctors'

const doctorService = {
  create: async (doctorData: Doctor) => {
    const doctor = await DoctorModel.create(doctorData)
    return doctor
  },
  get: async (id: string) => {
    const doctor = await DoctorModel.findById(id)
    if (doctor != null) return doctor
  },
  getAll: async (): Promise<any> => {
    const doctors = await DoctorModel.find()
    if (doctors != null) return doctors
  },
  update: async (id: string, doctorData: Doctor) => {
    const doctor = await DoctorModel.findById(id)
    if (doctor != null) {
      doctor.firstname = doctorData.firstname
      doctor.lastname = doctorData.lastname
      doctor.phone = doctorData.phone
      doctor.email = doctorData.email
      doctor.password = doctorData.password
      doctor.especialty = doctorData.especialty
      return await doctor.save()
    }
  },
  delete: async (id: string) => {
    const doctor = await DoctorModel.findById(id)
    return await doctor?.deleteOne()
  }
}

export { doctorService }
