import { type Patient } from '../interfaces/Patient'
import PatientModel from '../models/Patient'

const create = async (patient: Patient): Promise<Patient> => {
  try {
    const newPatient = PatientModel.create(patient)
    if (newPatient == null) throw new Error('Error al crear el paciente')
    return await newPatient
  } catch (error) {
    throw new Error('Error al crear el paciente')
  }
}

const get = async (id: string): Promise<Patient> => {
  try {
    const patient = await PatientModel.findById(id)
    if (patient == null) throw new Error('Paciente no encontrado')
    return patient
  } catch (error) {
    throw new Error('Error al obtener el paciente')
  }
}

const getAll = async (): Promise<Patient[]> => {
  try {
    const patients = await PatientModel.find()
    return patients
  } catch (error) {
    throw new Error('Error al obtener los pacientes')
  }
}

const update = async (id: string, patient: Patient): Promise<Patient> => {
  try {
    const foundPatient = await PatientModel.findOneAndUpdate({ _id: id }, patient)
    if (foundPatient == null) throw new Error('Paciente no encontrado')
    return foundPatient
  } catch (error) {
    throw new Error('Error al actualizar el paciente')
  }
}

const deleteOne = async (id: string): Promise<Patient> => {
  try {
    const patient = await PatientModel.findByIdAndDelete(id)
    if (patient == null) throw new Error('Paciente no encontrado')
    return patient
  } catch (error) {
    throw new Error('Error al eliminar el paciente')
  }
}

export {
  create,
  getAll,
  get,
  update,
  deleteOne
}
