import { type Patient } from '../interfaces/Patient'
import PatientModel from '../models/Patient'

const create = async (patientData: Patient): Promise<Patient> => {
  try {
    const patient = await PatientModel.create(patientData)
    if (patient === null) throw new Error('Error al crear el paciente')
    return patient
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
  }
}

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

const update = async (id: string, patientData: Patient): Promise<Patient> => {
  try {
    const patient = await PatientModel.findById(id)
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
    const patient = await PatientModel.findById(id)
    if (patient === null) throw new Error('Paciente no encontrado')
    return await patient.deleteOne()
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
  }
}

export { create, getAll, get, update, deleteOne }
