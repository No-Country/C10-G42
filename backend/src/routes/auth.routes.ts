import { Router } from 'express'

import {
  getProfile,
  loginCtrl,
  registerCtrl,
  registerDoctorCtrl
} from '../controllers/auth.controller'
import { authMiddleware } from '../middlewares/session'
import {
  validatorLogin,
  validatorRegister,
  validatorRegisterDoctor
} from '../middlewares/validators/auth.valid'

const router = Router()

router.post('/login', validatorLogin, loginCtrl)

router.post('/register', validatorRegister, registerCtrl)

router.post('/register/doctor', validatorRegisterDoctor, registerDoctorCtrl)

router.get('/profile', authMiddleware, getProfile)

export { router }
