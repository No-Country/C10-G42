import { type Patient } from '../interfaces/Patient'
import PatientModel from '../models/Patient'
import UserModel from '../models/User'

const getAll = async (): Promise<Patient[]> => {
  try {
    const patients = await PatientModel.find()
    return patients
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
  }
}

const get = async (id: string): Promise<Patient> => {
  try {
    const patient = await PatientModel.findById(id)
    if (patient === null) throw new Error('Paciente no encontrado')
    return patient
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
  }
}

const update = async (id: string, patientData: any): Promise<Patient> => {
  try {
    const patient = await PatientModel.findById(id)
    if (patient === null) throw new Error('Paciente no encontrado')
    if(patient._id )
    patient.birthdate = new Date(patientData.birthdate)
    patient.phone = patientData.phone
    patient.gender = patientData.gender
    patient.dni = patientData.dni
    return await patient.save()
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
  }
}

const deleteOne = async (id: string): Promise<Patient> => {
  try {
    const patient = await PatientModel.findById(id)
    if (patient === null) throw new Error('Paciente no encontrado')
    const user = await UserModel.findOne({ _id: patient.user })
    if (user === null) throw new Error('Usuario no encontrado')
    await user.deleteOne()
    return await patient.deleteOne()
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
  }
}

export { getAll, get, update, deleteOne }
