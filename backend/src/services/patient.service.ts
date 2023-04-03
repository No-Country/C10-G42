import { type Patient } from '../interfaces/Patient'
import PatientModel from '../models/Patient'

const patientService = {
  create: async (patientData: Patient) => {
    const patient = await PatientModel.create(patientData)
    return patient
  },
  getAll: async () => {
    return await PatientModel.find()
  },
  get: async (id: string) => {
    return await PatientModel.findById(id)
  },
  update: async (patientData: Patient, id: string) => {
    const patient = await PatientModel.findById(id)
    if (patient != null) {
      patient.email = patientData.email
      patient.password = patientData.password
      patient.dni = patientData.dni
      patient.firstname = patientData.firstname
      patient.lastname = patientData.lastname
      patient.birthdate = patientData.birthdate
      patient.phone = patientData.phone
      patient.gender = patientData.gender
      return await patient.save()
    }
  },
  delete: async (id: string) => {
    const patient = await PatientModel.findById(id)
    return await patient?.deleteOne()
  }
}

export { patientService }
