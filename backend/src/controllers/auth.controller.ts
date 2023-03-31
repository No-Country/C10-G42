import { type Request, type Response } from 'express'
import { type Patient } from '../interfaces/Patient'
import { login, loginDoctor, register, registerDoctor } from '../services/auth.service'
import { httpErrorHandler } from '../utils/httpErrorHandler'
import { type Doctor } from '../interfaces/Doctor'

const loginCtrl = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = body
    const user = await login({ email, password })
    res.send(user)
  } catch (error) {
    httpErrorHandler(res, error, 500)
  }
}

const registerCtrl = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const { email, password, firstname, lastname, birthdate, phone, gender, dni } = body
    const user: Patient = {
      email,
      password,
      firstname,
      lastname,
      role: 'patient',
      birthdate,
      phone,
      gender,
      dni
    }

    const response = await register(user)
    res.send(response)
  } catch (error) {
    httpErrorHandler(res, error, 500)
  }
}

const loginDoctorCtrl = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = body
    const user = await loginDoctor({ email, password })
    res.send(user)
  } catch (error) {
    httpErrorHandler(res, error, 500)
  }
}

const registerDoctorCtrl = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const { email, password, firstname, lastname, speciality } = body
    const user: Doctor = {
      email,
      password,
      firstname,
      lastname,
      role: 'doctor',
      speciality
    }

    const response = await registerDoctor(user)
    res.send(response)
  } catch (error) {
    httpErrorHandler(res, error, 500)
  }
}

export {
  loginCtrl,
  registerCtrl,
  loginDoctorCtrl,
  registerDoctorCtrl
}
