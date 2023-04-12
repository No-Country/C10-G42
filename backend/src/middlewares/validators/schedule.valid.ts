import { type NextFunction, type Request, type Response } from 'express'
import { body } from 'express-validator'

import { validateResults } from '../../utils/handleValidator'

const validatorCreate = [
  body()
    .custom((value, { req }) => {
      const allowedFields = [
        'day',
        'startTime',
        'endTime',
        'interval',
        'doctor'
      ]
      const receivedFields = Object.keys(req.body)
      return receivedFields.every(field => allowedFields.includes(field))
    })
    .withMessage('El formulario contiene campos invalidos'),

  body('day')
    .trim()
    .notEmpty()
    .withMessage('Dia requerido')
    .bail()
    .isString()
    .withMessage('Dia no válido'),

  body('startTime')
    .trim()
    .notEmpty()
    .withMessage('Entrada requerida')
    .bail()
    .isString()
    .withMessage('Entrada no válida'),

  body('endTime')
    .trim()
    .notEmpty()
    .withMessage('Salida requerida')
    .bail()
    .isString()
    .withMessage('Salida no válida'),

  body('interval')
    .trim()
    .notEmpty()
    .withMessage('Intervalo requerido')
    .bail()
    .isNumeric()
    .withMessage('Intervalo no válido'),

  body('doctor')
    .trim()
    .notEmpty()
    .withMessage('Doctor requerido')
    .bail()
    .isString()
    .withMessage('Id Doctor no válido'),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next)
  }
]

const validatorUpdate = [
  body()
    .custom((value, { req }) => {
      const allowedFields = ['day', 'startTime', 'endTime']
      const receivedFields = Object.keys(req.body)
      return receivedFields.every(field => allowedFields.includes(field))
    })
    .withMessage('El formulario contiene campos invalidos'),

  body('day')
    .trim()
    .notEmpty()
    .withMessage('Dia requerido')
    .bail()
    .isString()
    .withMessage('Dia no válido'),

  body('startTime')
    .trim()
    .notEmpty()
    .withMessage('Hora inicio requerida')
    .bail()
    .isString()
    .withMessage('Hora inicio no válida'),

  body('endTime')
    .trim()
    .notEmpty()
    .withMessage('Hora fin requerida')
    .bail()
    .isString()
    .withMessage('Hora fin no válida'),

  body('interval')
    .trim()
    .notEmpty()
    .withMessage('Intervalo requerido')
    .bail()
    .isNumeric()
    .withMessage('Intervalo no válido'),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next)
  }
]

export { validatorCreate, validatorUpdate }
