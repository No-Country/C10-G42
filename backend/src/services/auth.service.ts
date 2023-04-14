import { v4 } from 'uuid'

import { type Auth } from '../interfaces/Auth'
import DoctorModel from '../models/Doctors'
import PatientModel from '../models/Patient'
import UserModel from '../models/User'
import { sendMailForgotPassword, sendVerifyMail } from '../utils/handleEmail'
import { tokenSign } from '../utils/handleJwt'
import { encrypt, verifyHash } from '../utils/handlePassword'
import { User } from '../interfaces/User'

const login = async ({ email, password }: Auth): Promise<object> => {
  try {
    const user = await UserModel.findOne({ email }).select('password email') // <- traemos solo la password del user (oculta como undefined)
    if (user == null) throw new Error('No se ha encontrado el usuario')

    const hashPass = user.get('password') // <- obtenemos la password encriptada
    const check = await verifyHash(password, hashPass)

    if (!check) throw new Error('Email o password incorrecta')

    user.set('password', undefined, { strict: false }) // <- volvemos a "ocultar" la password

    const response = {
      token: tokenSign(user.id, user.firstname),
      user
    }

    return response
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
  }
}

const register = async (user: any, data: any): Promise<object> => {
  try {
    const checkIs = await UserModel.findOne({ email: user.email })
    if (checkIs != null) throw new Error('El email ya se encuentra registrado')

    const hashPassword = await encrypt(user.password)
    const uuidCode = v4()
    const dataUser = {
      ...user,
      password: hashPassword,
      code: uuidCode
    }

    const newUser = await UserModel.create(dataUser)
    if (newUser == null) throw new Error('Error al registrar el usuario')
    const newPatient = await PatientModel.create({ ...data, user: newUser._id })
    if (newPatient == null) throw new Error('Error al registrar el paciente')

    await sendVerifyMail(newUser.email, newUser.firstname, newUser.code)

    return {
      msg: 'Usuario registrado correctamente. Por favor, verifique su correo electrónico para activar su cuenta.'
    }
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
  }
}

const registerDoctor = async (user: any, data: any): Promise<object> => {
  try {
    const checkIs = await UserModel.findOne({ email: user.email })
    if (checkIs != null) throw new Error('El email ya se encuentra registrado')
    const hashPassword = await encrypt(user.password)
    const uuidCode = v4()
    const dataUser = {
      ...user,
      password: hashPassword,
      code: uuidCode
    }

    const newUser = await UserModel.create(dataUser)
    if (newUser == null) throw new Error('Error al registrar usuario')
    const newDoctor = await DoctorModel.create({ ...data, user: newUser._id })
    if (newDoctor == null) throw new Error('Error al registrar doctor')

    await sendVerifyMail(newUser.email, newUser.firstname, newUser.code)

    return {
      msg: 'Doctor registrado correctamente. Por favor, verifique su correo electrónico para activar su cuenta.'
    }
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
  }
}

const verify = async (code: string): Promise<object> => {
  try {
    const userConfirm = await UserModel.findOne({ code })
    if (userConfirm == null) throw new Error('No se ha encontrado el usuario')

    userConfirm.confirmed = true
    userConfirm.code = ''
    await userConfirm.save()

    return { msg: 'Usuario verificado correctamente' }
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
  }
}

const forgot = async (email: string): Promise<object> => {
  try {
    const usuario = await UserModel.findOne({ email })
    if (usuario == null) throw new Error('No se ha encontrado el usuario')

    usuario.code = v4()
    await usuario.save()

    await sendMailForgotPassword(usuario.email, usuario.firstname, usuario.code)
    return {
      msg: 'Se ha enviado un correo electrónico para restablecer su contraseña.'
    }
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
  }
}

const verifyRecovery = async (code: string): Promise<object> => {
  try {
    const usuario = await UserModel.findOne({ code })
    if (usuario == null) throw new Error('No se ha encontrado el usuario')

    return { msg: 'Código verificado correctamente' }
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
  }
}

const newPassword = async (password: string, code: string): Promise<object> => {
  try {
    const usuario = await UserModel.findOne({ code })
    if (usuario == null) throw new Error('No se ha encontrado el usuario')

    usuario.password = await encrypt(password)
    usuario.code = ''
    await usuario.save()

    return { msg: 'Contraseña actualizada correctamente' }
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
  }
}

const profile = async(user: any, userId: string): Promise<object> => {
  try {
    let userData: any = {
        userId: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        confirmed: user.confirmed,
        code: user.code,
        role: user.role,
    }

    switch(user.role) {
      case 'patient':
        const patient = await PatientModel.findOne({ user: userId })
        if(patient == null) throw new Error('No se ha encontrado el paciente')
        userData = {
          ...userData,
          patientID: patient._id,
          dni: patient.dni,
        }
        break
      case 'doctor':
        const doctor = await DoctorModel.findOne({ user: userId })
        if(doctor == null) throw new Error('No se ha encontrado el paciente')
        userData = {
          ...userData,
          doctorID: doctor._id,
          specialty: doctor.specialty,
          photoUrl: doctor.photoUrl,
          phone: doctor.phone,
        }
        break
      case 'admin':
        const admin = await UserModel.findById(userId)
        if(admin == null) throw new Error('No se ha encontrado el administrador')
        userData = {
          admin: true
        }
        break
      default:
        break
    }

    return userData
  } catch (e) {
    const error: string = e as string
    throw new Error(error)
  }
}

export {
  login,
  register,
  profile,
  registerDoctor,
  verify,
  forgot,
  verifyRecovery,
  newPassword
}
