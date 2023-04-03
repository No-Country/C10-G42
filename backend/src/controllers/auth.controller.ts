import { type Request, type Response } from 'express'

import { login, register, registerDoctor } from '../services/auth.service'
import { httpErrorHandler } from '../utils/httpErrorHandler'

const loginCtrl = ({ body }: Request, res: Response): void => {
  const { email, password } = body
  login({ email, password })
    .then(response => res.json(response))
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
    birthdate,
    phone,
    gender,
    dni
  }

  register(user, dataPatient)
    .then(response => res.json(response))
    .catch(error => {
      httpErrorHandler(res, error, 500)
    })
}

// const loginDoctorCtrl = ({ body }: Request, res: Response): void => {
//   const { email, password } = body
//   loginDoctor({ email, password })
//     .then(response => res.json(response))
//     .catch(error => {
//       httpErrorHandler(res, error, 500)
//     })
// }

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
    phone,
    speciality,
    photoUrl
  }

  registerDoctor(user, dataDoctor)
    .then(response => res.json(response))
    .catch(error => {
      httpErrorHandler(res, error, 500)
    })
}

export { loginCtrl, registerCtrl, registerDoctorCtrl }
