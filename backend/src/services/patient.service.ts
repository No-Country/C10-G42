import { type Patient } from '../interfaces/Patient'
import PatientModel from '../models/Patient'

const create = async (patientData: Patient): Promise<Patient> => {
  try {
    const patient = await PatientModel.create(patientData)
    return patient
  } catch (error) {
    throw new Error('Error al crear paciente')
  }
}

const getAll = async (): Promise<Patient[]> => {
  try {
    const patients = await PatientModel.find()
    return patients
  } catch (error) {
    throw new Error('Error al obtener pacientes')
  }
}

const get = async (id: string): Promise<Patient> => {
  try {
    const patient = await PatientModel.findById(id)
    if (patient === null) throw new Error('Paciente no encontrado')
    return patient
  } catch (error) {
    throw new Error('Error al obtener paciente')
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
  } catch (error) {
    throw new Error('Error al actualizar paciente')
  }
}

const deleteOne = async (id: string): Promise<Patient> => {
  try {
    const patient = await PatientModel.findById(id)
    if (patient === null) throw new Error('Paciente no encontrado')
    return await patient.deleteOne()
  } catch (error) {
    throw new Error('Error al eliminar paciente')
  }
}

export { create, getAll, get, update, deleteOne }
