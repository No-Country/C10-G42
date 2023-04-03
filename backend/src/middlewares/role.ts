import type { NextFunction, Request, Response } from 'express'

import { httpErrorHandler } from '../utils/httpErrorHandler'
import PatientModel from '../models/Patient'
import DoctorModel from '../models/Doctors'

const checkRol = (roles: string[]) => (req: Request, res: Response, next: NextFunction): void => {
  const id = req.userId
  let userRole: string
  PatientModel.findById(id)
    .then((patient) => {
      if (patient != null) userRole = patient.role
      else {
        DoctorModel.findById(id)
          .then((doctor) => {
            if (doctor != null) userRole = doctor.role
            else { httpErrorHandler(res, { message: 'ERROR_NOT_FOUND' }, 404) }
          })
          .catch((error) => { httpErrorHandler(res, error, 500) })
      }
    })
    .then(() => {
      if (!roles.includes(userRole)) { httpErrorHandler(res, { message: 'ERROR_NOT_AUTHORIZED' }, 401); return }
      next()
    })
    .catch((error) => { httpErrorHandler(res, error, 500) })
}

export { checkRol }
