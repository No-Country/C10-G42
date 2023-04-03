import { type Doctor } from '../interfaces/Doctor'
import DoctorModel from '../models/Doctors'

const create = async (doctorData: Doctor): Promise<Doctor> => {
  try {
    const doctor = await DoctorModel.create(doctorData)
    if (doctor === null) throw new Error('Error al crear el doctor')
    return doctor
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
  }
}

const get = async (id: string): Promise<Doctor> => {
  try {
    const doctor = await DoctorModel.findById(id)
    if (doctor === null) throw new Error('Doctor no encontrado')
    return doctor
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
  }
}

const getAll = async (): Promise<Doctor[]> => {
  try {
    const doctors = await DoctorModel.find()
    return doctors
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
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
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
  }
}

const deleteOne = async (id: string): Promise<Doctor> => {
  try {
    const doctor = await DoctorModel.findById(id)
    if (doctor === null) throw new Error('Doctor no encontrado')
    return await doctor?.deleteOne()
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
  }
}

export { create, getAll, get, update, deleteOne }
