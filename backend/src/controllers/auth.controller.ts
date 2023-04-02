import { type Request, type Response } from 'express'
import { type Patient } from '../interfaces/Patient'
import { login, loginDoctor, register, registerDoctor } from '../services/auth.service'
import { httpErrorHandler } from '../utils/httpErrorHandler'
import { type Doctor } from '../interfaces/Doctor'

const loginCtrl = ({ body }: Request, res: Response): void => {
  const { email, password } = body
  login({ email, password })
    .then((response) => res.json(response))
    .catch((error) => { httpErrorHandler(res, error, 500) })
}

const registerCtrl = ({ body }: Request, res: Response): void => {
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

  register(user)
    .then((response) => res.json(response))
    .catch((error) => { httpErrorHandler(res, error, 500) })
}

const loginDoctorCtrl = ({ body }: Request, res: Response): void => {
  const { email, password } = body
  loginDoctor({ email, password })
    .then((response) => res.json(response))
    .catch((error) => { httpErrorHandler(res, error, 500) })
}

const registerDoctorCtrl = ({ body }: Request, res: Response): void => {
  const { email, password, firstname, lastname, speciality } = body
  const user: Doctor = {
    email,
    password,
    firstname,
    lastname,
    role: 'doctor',
    speciality
  }

  registerDoctor(user)
    .then((response) => res.json(response))
    .catch((error) => { httpErrorHandler(res, error, 500) })
}

export {
  loginCtrl,
  registerCtrl,
  loginDoctorCtrl,
  registerDoctorCtrl
}
