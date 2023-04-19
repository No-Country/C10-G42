import { type NextFunction, type Request, type Response } from 'express'

import PatientModel from '../models/Patient'
import { httpErrorHandler } from '../utils/httpErrorHandler'

const checkUserOrRol =
  (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role
    const id = req.userId as string
    if (userRole == null || id == null) {
      httpErrorHandler(res, { message: 'ERROR_NOT_AUTHORIZED' }, 401)
      return
    }

    const checkRoles = roles.some(rolSingle => userRole.includes(rolSingle))
    const checkUser = id === req.params.id
    const checkPatient = userRole === 'patient'

    if (checkRoles || checkUser) {
      next()
      return
    } else if (checkPatient) {
      PatientModel.findOne({ user: id })
        .then(user => {
          if (user !== null && user._id.toString() === req.params.id) {
            next()
          } else {
            httpErrorHandler(res, { message: 'ERROR_NOT_AUTHORIZED' }, 401)
          }
        })
        .catch(error => {
          httpErrorHandler(res, error)
        })
      return
    }

    httpErrorHandler(res, { message: 'ERROR_NOT_AUTHORIZED' }, 401)
  }

export { checkUserOrRol }
