import { type NextFunction, type Request, type Response } from 'express'
import { body } from 'express-validator'

import { validateResults } from '../../utils/handleValidator'

const validatorUpdate = [
  body()
    .custom((value, { req }) => {
      const allowedFields = ['specialty', 'phone', 'photoUrl']
      const receivedFields = Object.keys(req.body)
      return receivedFields.every(field => allowedFields.includes(field))
    })
    .withMessage('El formulario contiene campos invalidos'),

  body('specialty')
    .trim()
    .notEmpty()
    .withMessage('Especialidad requerida')
    .bail()
    .isString()
    .withMessage('Especialidad no válida'),

  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Telefono requerido')
    .bail()
    .isString()
    .withMessage('Telefono no válido'),

  body('photoUrl')
    .trim()
    .notEmpty()
    .withMessage('URL imagen requerida')
    .bail()
    .isString()
    .withMessage('URL imagen no válida'),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next)
  }
]

export { validatorUpdate }
