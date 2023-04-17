import { type NextFunction, type Request, type Response } from 'express'
import { body } from 'express-validator'

import { validateResults } from '../../utils/handleValidator'

const validatorRegister = [
  body()
    .custom((value, { req }) => {
      const allowedFields = [
        'email',
        'password',
        'firstname',
        'lastname',
        'dni'
      ]
      const receivedFields = Object.keys(req.body)
      return receivedFields.every(field => allowedFields.includes(field))
    })
    .withMessage('El formulario contiene campos invalidos'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email requerido')
    .bail()
    .isEmail()
    .withMessage('Email no válido'),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password requerida')
    .bail()
    .isStrongPassword()
    .withMessage(
      'Password debe tener entre minimo 8 caracteres, una mayuscula, una minuscula y un simbolo'
    ),

  body('firstname')
    .trim()
    .notEmpty()
    .withMessage('Nombre requerido')
    .bail()
    .isString()
    .withMessage('Tipo de dato no valido')
    .isLength({ min: 3, max: 100 })
    .withMessage('Nombre debe tener entre 5 y 100 caracteres'),

  body('lastname')
    .notEmpty()
    .withMessage('Apellido requerido')
    .bail()
    .isString()
    .withMessage('Tipo de dato no valido')
    .isLength({ min: 3, max: 100 })
    .withMessage('Apellido debe tener entre 5 y 100 caracteres'),

  body('dni')
    .notEmpty()
    .withMessage('Dni requerido')
    .bail()
    .isString()
    .withMessage('Tipo de dato no valido')
    .isLength({ min: 5, max: 100 })
    .withMessage('Dni debe tener entre 5 y 100 caracteres'),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next)
  }
]

const validatorLogin = [
  body()
    .custom((value, { req }) => {
      const allowedFields = ['email', 'password']
      const receivedFields = Object.keys(req.body)
      return receivedFields.every(field => allowedFields.includes(field))
    })
    .withMessage('El formulario contiene campos invalidos'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email requerido')
    .bail()
    .isEmail()
    .withMessage('Email no válido'),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password requerida')
    .bail()
    .isString()
    .withMessage('Tipo de dato no valido')
    .isLength({ min: 5, max: 100 })
    .withMessage('Password debe tener entre 5 y 100 caracteres'),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next)
  }
]

const validatorRegisterDoctor = [
  body()
    .custom((value, { req }) => {
      const allowedFields = [
        'email',
        'password',
        'firstname',
        'lastname',
        'specialty',
        'phone',
        'photoUrl'
      ]
      const receivedFields = Object.keys(req.body)
      return receivedFields.every(field => allowedFields.includes(field))
    })
    .withMessage('El formulario contiene campos invalidos'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email requerido')
    .bail()
    .isEmail()
    .withMessage('Email no válido'),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password requerida')
    .bail()
    .isStrongPassword()
    .withMessage(
      'Password debe tener entre minimo 8 caracteres, una mayuscula, una minuscula y un simbolo'
    ),

  body('firstname')
    .trim()
    .notEmpty()
    .withMessage('Nombre requerido')
    .bail()
    .isString()
    .withMessage('Tipo de dato no valido')
    .isLength({ min: 3, max: 100 })
    .withMessage('Nombre debe tener entre 5 y 100 caracteres'),

  body('lastname')
    .notEmpty()
    .withMessage('Apellido requerido')
    .bail()
    .isString()
    .withMessage('Tipo de dato no valido')
    .isLength({ min: 3, max: 100 })
    .withMessage('Apellido debe tener entre 5 y 100 caracteres'),

  body('specialty')
    .notEmpty()
    .withMessage('Especialidad requerida')
    .bail()
    .isString()
    .withMessage('Tipo de dato no valido'),

  body('photoUrl')
    .notEmpty()
    .withMessage('PhotoUrl requerida')
    .bail()
    .isURL()
    .withMessage('Tipo de dato no valido'),

  body('phone')
    .notEmpty()
    .withMessage('Telefono requerida')
    .bail()
    .isString()
    .withMessage('Tipo de dato no valido'),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next)
  }
]

const validatorResetPassword = [
  body()
    .custom((value, { req }) => {
      const allowedFields = ['password']
      const receivedFields = Object.keys(req.body)
      return receivedFields.every(field => allowedFields.includes(field))
    })
    .withMessage('El formulario contiene campos invalidos'),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password requerida')
    .bail()
    .isStrongPassword()
    .withMessage(
      'Password debe tener entre minimo 8 caracteres, una mayuscula, una minuscula y un simbolo'
    )
]

const validatorForgotPassword = [
  body()
    .custom((value, { req }) => {
      const allowedFields = ['email']
      const receivedFields = Object.keys(req.body)
      return receivedFields.every(field => allowedFields.includes(field))
    })
    .withMessage('El formulario contiene campos invalidos'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email requerido')
    .bail()
    .isEmail()
    .withMessage('Email no válido')
]

export {
  validatorRegister,
  validatorRegisterDoctor,
  validatorLogin,
  validatorResetPassword,
  validatorForgotPassword
}
