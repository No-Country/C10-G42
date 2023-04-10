import { type Doctor } from '../interfaces/Doctor'
import DoctorModel from '../models/Doctors'
import UserModel from '../models/User'

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

/**
 * lista de doctores paginado
 * @param page
 * @param speciality
 * @returns Promise<{pagination: {itemsCount: number, pageCount: number}, items: Doctor} | {msg: string}>
 */
const getAll = async (
  page: number = 1,
  speciality: string
): Promise<
  | { pagination: { itemsCount: number; pageCount: number }; items: Doctor[] }
  | { msg: string }
> => {
  const ITEMS_PER_PAGE = 2
  const skip = (page - 1) * ITEMS_PER_PAGE // 1 * 20 = 20
  const query = {
    ...(speciality != null && { speciality })
  }
  try {
    const countDoc = DoctorModel.countDocuments(query)
    const doctors = DoctorModel.find(query).limit(ITEMS_PER_PAGE).skip(skip)
    const [itemsCount, items] = await Promise.all([countDoc, doctors])
    const pageCount = Math.ceil(itemsCount / ITEMS_PER_PAGE)
    if (items.length === 0) {
      return {
        msg: 'No se encuentran registros de doctores'
      }
    }
    return {
      pagination: {
        itemsCount,
        pageCount
      },
      items
    }
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
    const user = await UserModel.findOne({ _id: doctor.user })
    if (user === null) throw new Error('Usuario no encontrado')
    await user.deleteOne()
    return await doctor.deleteOne()
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
  }
}

/**
 * obtener lista aleatoria limitada de doctores
 * @param limit
 * @returns
 */
const getRandom = async (limit: string): Promise<Doctor[]> => {
  try {
    const doctors = await DoctorModel.aggregate([
      { $sample: { size: Number(limit) } }
    ])
    return doctors
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
  }
}

export { getAll, get, update, deleteOne, getRandom }
