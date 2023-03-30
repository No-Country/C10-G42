import PatientModel from '../models/Patient'

const getAll = async (): Promise<any> => {
  try {
    const patients = await PatientModel.find()
    return patients
  } catch (error) {
    throw new Error('Error al obtener los pacientes')
  }
}

export {
  getAll
}
