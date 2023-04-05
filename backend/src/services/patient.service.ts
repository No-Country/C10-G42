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
    const user = await UserModel.findById(id)
    if (user === null) throw new Error('Usuario no encontrado')
    const patient = await PatientModel.findOne({ user: user._id })
    if (patient === null) throw new Error('Paciente no encontrado')
    return patient
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
  }
}

const update = async (id: string, patientData: any): Promise<Patient> => {
  try {
    const user = await UserModel.findById(id)
    if (user === null) throw new Error('Usuario no encontrado')
    const patient = await PatientModel.findOne({ user: user._id })
    if (patient === null) throw new Error('Paciente no encontrado')
    patient.birthdate = patientData.birthdate
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
    const user = await UserModel.findById(id)
    if (user === null) throw new Error('Usuario no encontrado')
    const patient = await PatientModel.findOne({ user: user._id })
    if (patient === null) throw new Error('Paciente no encontrado')
    await user.deleteOne()
    return await patient.deleteOne()
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
  }
}

export { getAll, get, update, deleteOne }
