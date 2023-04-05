import { type Request, type Response } from 'express'

import { login, register, registerDoctor } from '../services/auth.service'
import { httpErrorHandler } from '../utils/httpErrorHandler'

const loginCtrl = ({ body }: Request, res: Response): void => {
  const { email, password } = body
  login({ email, password })
    .then(response => res.status(202).json(response))
    .catch(error => {
      httpErrorHandler(res, error, 500)
    })
}

const registerCtrl = ({ body }: Request, res: Response): void => {
  const {
    email,
    password,
    firstname,
    lastname,
    birthdate,
    phone,
    gender,
    dni
  } = body

  const user = {
    email,
    password,
    firstname,
    lastname,
    role: 'patient'
  }
  const dataPatient = {
    username: `${firstname as string} ${lastname as string}`,
    birthdate,
    phone,
    gender,
    dni
  }

  register(user, dataPatient)
    .then(response => res.status(201).json(response))
    .catch(error => {
      httpErrorHandler(res, error, 500)
    })
}

const registerDoctorCtrl = ({ body }: Request, res: Response): void => {
  const { email, password, firstname, lastname, speciality, phone, photoUrl } =
    body
  const user = {
    email,
    password,
    firstname,
    lastname,
    role: 'doctor'
  }

  const dataDoctor = {
    name: `${firstname as string} ${lastname as string}`,
    phone,
    speciality,
    photoUrl
  }

  registerDoctor(user, dataDoctor)
    .then(response => res.status(201).json(response))
    .catch(error => {
      httpErrorHandler(res, error, 500)
    })
}

export { loginCtrl, registerCtrl, registerDoctorCtrl }
