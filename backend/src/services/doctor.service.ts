import { type Doctor } from '../interfaces/Doctor'
import DoctorModel from '../models/Doctors'

const create = async (doctorData: Doctor): Promise<Doctor> => {
  try {
    const doctor = await DoctorModel.create(doctorData)
    return doctor
  } catch (error) {
    throw new Error('Error al crear doctor')
  }
}

const get = async (id: string): Promise<Doctor> => {
  try {
    const doctor = await DoctorModel.findById(id)
    if (doctor === null) throw new Error('Doctor no encontrado')
    return doctor
  } catch (error) {
    throw new Error('Error al obtener doctor')
  }
}

const getAll = async (): Promise<Doctor[]> => {
  try {
    const doctors = await DoctorModel.find()
    return doctors
  } catch (error) {
    throw new Error('Error al obtener doctores')
  }
}

const update = async (id: string, doctorData: Doctor): Promise<Doctor> => {
  try {
    const doctor = await DoctorModel.findById(id)
    if (doctor === null) throw new Error('Doctor no encontrado')
    doctor.photoUrl = doctorData.photoUrl
    doctor.phone = doctorData.phone
    doctor.speciality = doctorData.speciality
    return await doctor.save()
  } catch (error) {
    throw new Error('Error al actualizar doctor')
  }
}

const deleteOne = async (id: string): Promise<Doctor> => {
  try {
    const doctor = await DoctorModel.findById(id)
    if (doctor === null) throw new Error('Doctor no encontrado')
    return await doctor?.deleteOne()
  } catch (error) {
    throw new Error('Error al eliminar doctor')
  }
}

export { create, getAll, get, update, deleteOne }
