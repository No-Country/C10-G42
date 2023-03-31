import { type Doctor } from '../interfaces/Doctor'
import DoctorModel from '../models/Doctors'

const create = async (doctorData: Doctor): Promise<Doctor> => {
  try {
    const doctor = await DoctorModel.create(doctorData)
    return doctor
  } catch (error) {
    throw new Error('Error creating doctor')
  }
}

const get = async (id: string): Promise<Doctor> => {
  try {
    const foundDoctor = await DoctorModel.findById(id)
    if (foundDoctor != null) return foundDoctor
    else throw new Error('Doctor not found')
  } catch (error) {
    throw new Error('Cant found doctor')
  }
}

const getAll = async (): Promise<Doctor[]> => {
  try {
    const foundDoctors = await DoctorModel.find()
    if (foundDoctors != null) return foundDoctors
    else throw new Error('Doctors not found')
  } catch (error) {
    throw new Error('Cant found doctors')
  }
}

const update = async (id: string, doctorData: any): Promise<Doctor> => {
  try {
    const foundDoctor = await DoctorModel.findById(id)
    if (foundDoctor != null) {
      foundDoctor.firstname = doctorData.firstname
      foundDoctor.lastname = doctorData.lastname
      foundDoctor.speciality = doctorData.speciality
      const saveDoctor = await foundDoctor.save()
      return saveDoctor
    } else {
      throw new Error('Doctor not found')
    }
  } catch (error) {
    throw new Error('Cant update doctor')
  }
}

const deleteOne = async (id: string): Promise<void> => {
  try {
    const foundDoctor = await DoctorModel.findById(id)
    if (foundDoctor != null) {
      await foundDoctor.deleteOne()
    } else {
      throw new Error('Doctor not found')
    }
  } catch (error) {
    throw new Error('Cant delete doctor')
  }
}

export {
  create,
  get,
  getAll,
  update,
  deleteOne
}
