import { type Auth } from '../interfaces/Auth'
import { type User } from '../interfaces/User'
import DoctorModel from '../models/Doctors'
import PatientModel from '../models/Patient'
import UserModel from '../models/User'
import { tokenSign } from '../utils/handleJwt'
import { encrypt, verifyHash } from '../utils/handlePassword'

const login = async ({ email, password }: Auth): Promise<object> => {
  try {
    const user = await UserModel.findOne({ email }).select('password email') // <- traemos solo la password del user (oculta como undefined)
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
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
  }
}

const register = async (user: User, data: any): Promise<object> => {
  try {
    const checkIs = await UserModel.findOne({ email: user.email })
    if (checkIs != null) throw new Error('El email ya se encuentra registrado')

    const hashPassword = await encrypt(user.password)
    const dataUser = { ...user, password: hashPassword }

    const newUser = await UserModel.create(dataUser)
    if (newUser == null) throw new Error('Error al registrar el usuario')
    const newPatient = await PatientModel.create({ ...data, user: newUser._id })
    if (newPatient == null) throw new Error('Error al registrar el paciente')

    const response = {
      message: 'Registrado correctamente',
      token: tokenSign(newUser.id, user.firstname),
      newPatient
    }

    return response
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
  }
}

const registerDoctor = async (user: User, data: any): Promise<object> => {
  try {
    const checkIs = await UserModel.findOne({ email: user.email })
    if (checkIs != null) throw new Error('El email ya se encuentra registrado')
    console.log(user)
    console.log(data)
    const hashPassword = await encrypt(user.password)
    const dataUser = { ...user, password: hashPassword }

    const newUser = await UserModel.create(dataUser)
    if (newUser == null) throw new Error('Error al registrar usuario')
    const newDoctor = await DoctorModel.create({ ...data, user: newUser._id })
    console.log(newUser)

    const response = {
      message: 'Registrado correctamente',
      token: tokenSign(newUser.id, user.firstname),
      newDoctor
    }

    return response
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
  }
}

export { login, register, registerDoctor }
