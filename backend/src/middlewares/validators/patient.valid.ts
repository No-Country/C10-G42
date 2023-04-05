import { type NextFunction, type Request, type Response } from 'express'
import { body } from 'express-validator'

import { validateResults } from '../../utils/handleValidator'

const validatorUpdate = [
  body()
    .custom((value, { req }) => {
      const allowedFields = ['birthdate', 'phone', 'gender', 'dni']
      const receivedFields = Object.keys(req.body)
      return receivedFields.every(field => allowedFields.includes(field))
    })
    .withMessage('El formulario contiene campos invalidos'),

  body('birthdate')
    .trim()
    .notEmpty()
    .withMessage('Fecha requerida')
    .bail()
    .isDate()
    .withMessage('Fecha no válida'),

  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Telefono requerido')
    .bail()
    .isString()
    .withMessage('Telefono no válido'),

  body('gender')
    .trim()
    .notEmpty()
    .withMessage('Genero requerido')
    .bail()
    .isString()
    .withMessage('Genero no válido'),

  body('dni')
    .trim()
    .notEmpty()
    .withMessage('DNI requerido')
    .bail()
    .isString()
    .withMessage('DNI no válido'),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next)
  }
]

export { validatorUpdate }
