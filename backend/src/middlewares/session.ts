import type { NextFunction, Request, Response } from 'express'
import PatientModel from '../models/Patient'
import { verifyToken } from '../utils/handleJwt'
import { httpErrorHandler } from '../utils/httpErrorHandler'
import DoctorModel from '../models/Doctors'

interface JwtPayload {
  _id: string
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const auth = req.headers.authorization
    if (auth == null) {
      httpErrorHandler(res, { message: 'NOT_TOKEN' }, 401)
      return
    }

    const token = auth.split(' ').pop() as string
    const dataToken = await verifyToken(token) as JwtPayload

    if (dataToken === null) {
      httpErrorHandler(res, { message: 'ERROR_ID_TOKEN' }, 401)
      return
    }

    const user = await PatientModel.findById(dataToken._id)
    if (user != null) {
      req.user = user
    } else {
      const doctor = await DoctorModel.findById(dataToken._id)
      if (doctor != null) {
        req.user = doctor
      } else {
        httpErrorHandler(res, { message: 'ERROR_ID_TOKEN' }, 401)
      }
    }

    next()
  } catch (error) {
    httpErrorHandler(res, { message: 'NOT_SESSION' }, 401)
  }
}

export {
  authMiddleware
}
