import type { NextFunction, Request, Response } from 'express'

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
      req.userId = dataToken._id
      next()
    })
    .catch(error => {
      httpErrorHandler(res, error, 401)
    })
}

export { authMiddleware }
