import { Router } from 'express'

import {
  loginCtrl,
  registerCtrl,
  registerDoctorCtrl
} from '../controllers/auth.controller'
import {
  getProfile,
  validatorLogin,
  validatorRegister,
  validatorRegisterDoctor
} from '../middlewares/validators/auth.valid'
import { authMiddleware } from '../middlewares/session'

const router = Router()

router.post('/login', validatorLogin, loginCtrl)

router.post('/register', validatorRegister, registerCtrl)

router.post('/register/doctor', validatorRegisterDoctor, registerDoctorCtrl)
router.get('/profile', authMiddleware, getProfile)

export { router }
