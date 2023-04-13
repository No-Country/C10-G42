import type { NextFunction, Request, Response } from 'express'

import UserModel from '../models/User'
import { verifyToken } from '../utils/handleJwt'
import { httpErrorHandler } from '../utils/httpErrorHandler'

interface JwtPayload {
  _id: string
}

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const auth = req.headers.authorization
  if (auth == null) {
    httpErrorHandler(res, { message: 'NOT_TOKEN' }, 401)
    return
  }

  const token = auth.split(' ').pop() as string
  verifyToken(token)
    .then((dataToken: JwtPayload) => {
      if (dataToken == null) {
        httpErrorHandler(res, { message: 'ERROR_NOT_TOKEN_FOUND' }, 404)
        return
      }

      UserModel.findById(dataToken._id)
        .select('-password -createdAt -updatedAt')
        .then(user => {
          if (user != null) {
            req.user = user
            req.userId = user._id.toString()
            next()
          }
        })
        .catch(error => {
          httpErrorHandler(res, error, 500)
        })
    })
    .catch(error => {
      httpErrorHandler(res, error, 401)
    })
}

export { authMiddleware }
