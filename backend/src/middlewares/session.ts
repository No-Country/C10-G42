import { type NextFunction, type Request, type Response } from 'express'
import { Patient } from '../interfaces/Patient'
import PatientModel from '../models/Patient'
import { verifyToken } from '../utils/handleJwt'
import { httpErrorHandler } from '../utils/httpErrorHandler'

interface JwtPayload {
  _id: string
}

declare global {
  namespace Express {
    export interface Request {
      user?: Patient // TODO: Agregar modelo de Doctor -> user?: Patient | Doctor
    }
  }
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const auth = req.headers.authorization

    if (!auth) {
      httpErrorHandler(res, { message: 'NOT_TOKEN' }, 401); return
    }

    const token = auth.split(' ').pop() as string
    const dataToken = await verifyToken(token) as JwtPayload

    if (dataToken == null) {
      httpErrorHandler(res, { message: 'ERROR_ID_TOKEN' }, 401); return
    }

    const user = await PatientModel.findById(dataToken._id)
    if (user == null) {
      const userDoctor = await PatientModel.findById(dataToken._id) // TODO: Agregar modelo de Doctor
      if (userDoctor == null) {
        httpErrorHandler(res, { message: 'USER_LOGED_NOT_FOUND' }, 401); return
      }
    } else {
      req.user = user
    }

    next()
  } catch (error) {
    httpErrorHandler(res, { message: 'NOT_SESSION' }, 401)
  }
}

export {
  authMiddleware
}
