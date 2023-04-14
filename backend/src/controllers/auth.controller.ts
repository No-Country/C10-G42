import { type Request, type Response } from 'express'

import {
  forgot,
  login,
  newPassword,
  register,
  registerDoctor,
  verify,
  verifyRecovery
} from '../services/auth.service'
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
    birthdate: new Date(birthdate),
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
  const { email, password, firstname, lastname, specialty, phone, photoUrl } =
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
    specialty,
    photoUrl
  }

  registerDoctor(user, dataDoctor)
    .then(response => res.status(201).json(response))
    .catch(error => {
      httpErrorHandler(res, error, 500)
    })
}

const getProfile = (req: Request, res: Response): void => {
  const { user } = req
  res.json({ user })
}

const verifyUser = ({ params }: Request, res: Response): void => {
  const { code } = params
  verify(code)
    .then(response => res.status(200).json(response))
    .catch(error => {
      httpErrorHandler(res, error, 500)
    })
}

const forgotPassword = ({ body }: Request, res: Response): void => {
  const email = body.email
  forgot(email)
    .then(response => res.status(200).json(response))
    .catch(error => {
      httpErrorHandler(res, error, 500)
    })
}

const verifyRecoveryCode = ({ params }: Request, res: Response): void => {
  const { code } = params
  verifyRecovery(code)
    .then(response => res.status(200).json(response))
    .catch(error => {
      httpErrorHandler(res, error, 500)
    })
}

const resetPassword = ({ params, body }: Request, res: Response): void => {
  const { code } = params
  const { password } = body
  newPassword(password, code)
    .then(response => res.status(200).json(response))
    .catch(error => {
      httpErrorHandler(res, error, 500)
    })
}

export {
  loginCtrl,
  registerCtrl,
  registerDoctorCtrl,
  getProfile,
  verifyUser,
  forgotPassword,
  verifyRecoveryCode,
  resetPassword
}
