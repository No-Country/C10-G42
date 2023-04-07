import { type NextFunction, type Request, type Response } from 'express'
import { body } from 'express-validator'

import { validateResults } from '../../utils/handleValidator'

const validatorCreate = [
  body()
    .custom((value, { req }) => {
      const allowedFields = [
        'fecha',
        'horaInicio',
        'minutoInicio',
        'duracion',
        'paciente',
        'doctor'
      ]
      const receivedFields = Object.keys(req.body)
      return receivedFields.every(field => allowedFields.includes(field))
    })
    .withMessage('El formulario contiene campos invalidos'),

  body('fecha')
    .trim()
    .notEmpty()
    .withMessage('Fecha requerida')
    .bail()
    .isDate()
    .withMessage('Fecha no válida'),

  body('horaInicio')
    .trim()
    .notEmpty()
    .withMessage('Hora inicio requerida')
    .bail()
    .isString()
    .withMessage('Hora inicio no válida'),

  body('duracion')
    .trim()
    .notEmpty()
    .withMessage('Duracion requerida')
    .bail()
    .isNumeric()
    .withMessage('Duracion no válida'),

  body('paciente')
    .trim()
    .notEmpty()
    .withMessage('Fecha requerida')
    .bail()
    .isString()
    .withMessage('Id Paciente no válido'),

  body('doctor')
    .trim()
    .notEmpty()
    .withMessage('Fecha requerida')
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
      const allowedFields = ['fecha', 'horaInicio', 'minutoInicio', 'duracion']
      const receivedFields = Object.keys(req.body)
      return receivedFields.every(field => allowedFields.includes(field))
    })
    .withMessage('El formulario contiene campos invalidos'),

  body('fecha')
    .trim()
    .notEmpty()
    .withMessage('Fecha requerida')
    .bail()
    .isDate()
    .withMessage('Fecha no válida'),

  body('horaInicio')
    .trim()
    .notEmpty()
    .withMessage('Hora inicio requerida')
    .bail()
    .isNumeric()
    .withMessage('Hora inicio no válida'),

  body('minutoInicio')
    .trim()
    .notEmpty()
    .withMessage('Minuto Inicio requerido')
    .bail()
    .isNumeric()
    .withMessage('Minuto Inicio no válido'),

  body('duracion')
    .trim()
    .notEmpty()
    .withMessage('Duracion requerida')
    .bail()
    .isNumeric()
    .withMessage('Duracion no válida'),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next)
  }
]

export { validatorCreate, validatorUpdate }
