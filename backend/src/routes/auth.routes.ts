import { Router } from 'express'

import {
  loginCtrl,
  registerCtrl,
  registerDoctorCtrl
} from '../controllers/auth.controller'
import {
  validatorLogin,
  validatorRegister,
  validatorRegisterDoctor
} from '../middlewares/validators/auth.valid'

const router = Router()

router.post('/login', validatorLogin, loginCtrl)
router.post('/register', validatorRegister, registerCtrl)

router.post('/register/doctor', validatorRegisterDoctor, registerDoctorCtrl)

export { router }
