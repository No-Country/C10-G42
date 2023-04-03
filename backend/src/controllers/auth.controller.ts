import { type Request, type Response } from 'express'

import { type Patient } from '../interfaces/Patient'
import { login, register } from '../services/auth.service'
import { httpErrorHandler } from '../utils/httpErrorHandler'

const loginCtrl = ({ body }: Request, res: Response): void => {
  try {
    const { email, password } = body
    const user = login({ email, password })
    res.send(user)
  } catch (error) {
    httpErrorHandler(res, error, 500)
  }
}

const registerCtrl = ({ body }: Request, res: Response): void => {
  try {
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

    const response = register(user)
    res.send(response)
  } catch (error) {
    console.log(error)
    httpErrorHandler(res, error, 500)
  }
}

// const registerCtrlDoctor = async ({ body }: Request, res: Response) => {
//   try {
//     const { email, password, firstname, lastname, speciality } = body;
//     const user = {
//       email,
//       password,
//       firstname,
//       lastname,
//       role: "doctor",
//       speciality
//     }

//     const response = await registerDoctor(user);
//     res.send(response);
//   } catch (error) {
//     console.log(error);
//     httpErrorHandler(res, error, 500);
//   }
// }

export { loginCtrl, registerCtrl }
