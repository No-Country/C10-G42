import { type Auth } from '../interfaces/Auth'
import { type Doctor } from '../interfaces/Doctor'
import { type Patient } from '../interfaces/Patient'
import DoctorModel from '../models/Doctors'
import PatientModel from '../models/Patient'
import { tokenSign } from '../utils/handleJwt'
import { encrypt, verifyHash } from '../utils/handlePassword'

const login = async ({ email, password }: Auth): Promise<any> => {
  const user = await PatientModel.findOne({ email }).select('password email') // <- traemos solo la password del user (oculta como undefined)
  if (user == null) throw new Error('No se ha encontrado el usuario')

  const hashPass = user.get('password') // <- obtenemos la password encriptada
  const check = await verifyHash(password, hashPass)

  if (!check) throw new Error('Email o password incorrecta')

  user.set('password', undefined, { strict: false }) // <- volvemos a "ocultar" la password

  const response = {
    message: 'Logueado',
    token: tokenSign(user.id, user.firstname),
    user
  }

  return response
}

const register = async (data: Patient): Promise<any> => {
  const checkIs = await PatientModel.findOne({ email: data.email })
  if (checkIs != null) throw new Error('El email ya se encuentra registrado')

  const hashPassword = await encrypt(data.password)
  const dataUser = { ...data, password: hashPassword }

  const user = await PatientModel.create(dataUser)

  const response = {
    message: 'Registrado correctamente',
    token: tokenSign(user.id, user.firstname),
    user
  }

  return response
}

const loginDoctor = async ({ email, password }: Auth): Promise<any> => {
  const user = await DoctorModel.findOne({ email }).select('password email') // <- traemos solo la password del user (oculta como undefined)
  if (user == null) throw new Error('No se ha encontrado el usuario')

  const hashPass = user.get('password') // <- obtenemos la password encriptada
  const check = await verifyHash(password, hashPass)

  if (!check) throw new Error('Email o password incorrecta')

  user.set('password', undefined, { strict: false }) // <- volvemos a "ocultar" la password

  const response = {
    message: 'Logueado',
    token: tokenSign(user.id, user.firstname),
    user
  }

  return response
}

const registerDoctor = async (data: Doctor): Promise<any> => { // TODO: Implementar modelo de Doctor
  const checkIs = await DoctorModel.findOne({ email: data.email })
  if (checkIs != null) throw new Error('El email ya se encuentra registrado')

  const hashPassword = await encrypt(data.password)
  const dataUser = { ...data, password: hashPassword }

  const user = await PatientModel.create(dataUser)

  const response = {
    message: 'Registrado correctamente',
    token: tokenSign(user.id, user.firstname),
    user
  }

  return response
}

export {
  login,
  loginDoctor,
  register,
  registerDoctor
}
