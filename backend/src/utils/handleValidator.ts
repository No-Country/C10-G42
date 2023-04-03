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

  const extractedErrors = errors.array().map(error => {
    return { [error.param]: error.msg }
  })

  httpErrorHandler(res, extractedErrors, 422)
}

export { validateResults }
