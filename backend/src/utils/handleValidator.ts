import { type NextFunction, type Request, type Response } from 'express'
import { validationResult } from 'express-validator'

import { httpErrorHandler } from './httpErrorHandler'

const validateResults = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    next()
    return
  }

  httpErrorHandler(res, { message: errors.array() }, 422)
}

export { validateResults }
