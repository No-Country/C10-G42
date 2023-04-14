import { Router } from 'express'

import {
  forgotPassword,
  getProfile,
  loginCtrl,
  registerCtrl,
  registerDoctorCtrl,
  resetPassword,
  verifyRecoveryCode,
  verifyUser
} from '../controllers/auth.controller'
import { authMiddleware } from '../middlewares/session'
import {
  validatorForgotPassword,
  validatorLogin,
  validatorRegister,
  validatorRegisterDoctor,
  validatorResetPassword
} from '../middlewares/validators/auth.valid'

const router = Router()

router.get('/profile', authMiddleware, getProfile)

router.post('/login', validatorLogin, loginCtrl)

router.post('/register', validatorRegister, registerCtrl)

router.post('/register/doctor', validatorRegisterDoctor, registerDoctorCtrl)

router.get('/confirm/:code', verifyUser)

router.post('/forgot-password', validatorForgotPassword, forgotPassword)

router.get('/forgot-password/:code', verifyRecoveryCode)

router.post('/reset-password/:code', validatorResetPassword, resetPassword)

export { router }
