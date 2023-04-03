import { type Response } from 'express'

export const httpErrorHandler = (
  res: Response,
  error: any,
  status: number = 404
): void => {
  res.status(status)
  res.send(error.message)
}
